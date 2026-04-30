<script>
  // Mounted at {{widget:diet-calculator}}.
  // Preset-driven diet comparison with a pinned baseline: the active preset
  // renders full-size, and a smaller baseline bar sits beneath each metric so
  // the reader can read the diff without flipping between tabs. Both share the
  // same fixed scale so totals stay comparable across switches.
  // Weighting maps (`lifeDaysPerKg` / `sufferingDaysPerKg`) live in farming.js.
  import { fade } from 'svelte/transition';
  import {
    farmedAnimals, lifeDaysPerKg, sufferingDaysPerKg,
    products, presets,
  } from '../data/farming.js';

  let { copy = {} } = $props();

  let activePreset = $state('european');
  let baselinePreset = $state('none');

  // Click-to-swap: picking a preset that's already in the other slot trades
  // them rather than collapsing to a single bar.
  function setActive(key) {
    if (key === activePreset) return;
    if (key === baselinePreset) baselinePreset = activePreset;
    activePreset = key;
  }
  function setBaseline(key) {
    if (key === baselinePreset) return;
    if (key === activePreset) activePreset = baselinePreset;
    baselinePreset = key;
  }

  let activeDiet = $derived(presets[activePreset].values);
  let baselineDiet = $derived(
    baselinePreset !== 'none' ? presets[baselinePreset].values : null
  );

  function buildBreakdownFor(diet, weight) {
    return products.map(p => {
      const kg = p.toKg(diet[p.id]);
      const perKg = weight[p.animalId] ?? 0;
      const animal = farmedAnimals.find(a => a.id === p.animalId);
      return {
        id: p.id,
        label: p.label,
        days: kg * perKg,
        color: animal.color,
      };
    });
  }

  let activeLifeBreakdown = $derived(buildBreakdownFor(activeDiet, lifeDaysPerKg));
  let activeSufferingBreakdown = $derived(buildBreakdownFor(activeDiet, sufferingDaysPerKg));
  let baselineLifeBreakdown = $derived(
    baselineDiet ? buildBreakdownFor(baselineDiet, lifeDaysPerKg) : null
  );
  let baselineSufferingBreakdown = $derived(
    baselineDiet ? buildBreakdownFor(baselineDiet, sufferingDaysPerKg) : null
  );

  let activeLifeTotal = $derived(activeLifeBreakdown.reduce((s, b) => s + b.days, 0));
  let activeSufferingTotal = $derived(activeSufferingBreakdown.reduce((s, b) => s + b.days, 0));
  let baselineLifeTotal = $derived(baselineLifeBreakdown?.reduce((s, b) => s + b.days, 0) ?? 0);
  let baselineSufferingTotal = $derived(baselineSufferingBreakdown?.reduce((s, b) => s + b.days, 0) ?? 0);

  let showBaseline = $derived(baselinePreset !== 'none' && baselinePreset !== activePreset);

  // Fixed scale across both framings AND all presets so the bars share an
  // axis and switching presets doesn't rescale.
  const maxDays = Math.max(
    ...[lifeDaysPerKg, sufferingDaysPerKg].flatMap(weight =>
      Object.values(presets).map(p =>
        products.reduce((sum, prod) =>
          sum + prod.toKg(p.values[prod.id]) * (weight[prod.animalId] ?? 0)
        , 0)
      )
    )
  );

  // Legend: products appearing in either bar.
  let activeProducts = $derived(
    products
      .filter(p => activeDiet[p.id] > 0 || (baselineDiet && baselineDiet[p.id] > 0))
      .map(p => ({
        label: p.label,
        color: farmedAnimals.find(a => a.id === p.animalId).color,
      }))
  );

  function formatVal(v) {
    if (v >= 1000) return Math.round(v).toLocaleString();
    if (v >= 10) return Math.round(v).toString();
    if (v >= 1) return v.toFixed(1);
    if (v >= 0.01) return v.toFixed(2);
    if (v === 0) return '0';
    return v.toFixed(3);
  }

  let barsEl;
  let tooltip = $state(null);

  function showTip(e, segment, unit, presetLabel) {
    if (!segment.days || !barsEl) return;
    const r = barsEl.getBoundingClientRect();
    tooltip = {
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      label: segment.label,
      value: segment.days,
      unit,
      presetLabel,
    };
  }

  function hideTip() {
    tooltip = null;
  }

  $effect(() => {
    activePreset; baselinePreset;
    tooltip = null;
  });
</script>

<div class="diet-calculator">
  <h3 class="widget-title">{copy.title ?? 'Diets compared'}</h3>

  {#if copy.intro}<p class="chart-copy">{copy.intro}</p>{/if}

  <div class="preset-buttons">
    {#each Object.entries(presets) as [key, preset]}
      <button
        class="preset-btn"
        class:active={activePreset === key}
        class:baseline={baselinePreset === key}
        onclick={() => setActive(key)}
      >{preset.label}</button>
    {/each}
  </div>

  <div class="compare-row">
    <span class="compare-label">Compare to</span>
    <div class="compare-buttons">
      {#each Object.entries(presets) as [key, preset]}
        <button
          class="compare-btn"
          class:active={baselinePreset === key}
          onclick={() => setBaseline(key)}
        >{preset.label}</button>
      {/each}
      <button
        class="compare-btn"
        class:active={baselinePreset === 'none'}
        onclick={() => setBaseline('none')}
      >None</button>
    </div>
  </div>

  {#if copy[activePreset]}
    {#key activePreset}
      <div class="editorial" in:fade={{ duration: 200 }}>{copy[activePreset]}</div>
    {/key}
  {/if}

  <div class="bars" bind:this={barsEl}>
    <div class="metric-block">
      <div class="metric-label">Life-days</div>
      <div class="bar-pair">
        <div class="bar-row">
          <div class="bar-header">
            <span class="bar-preset">{presets[activePreset].label}</span>
            <span class="bar-total">{formatVal(activeLifeTotal)}</span>
          </div>
          <div class="stacked-bar active-bar">
            {#each activeLifeBreakdown as segment}
              <div
                class="stacked-segment"
                style="width: {maxDays > 0 ? (segment.days / maxDays) * 100 : 0}%; background-color: {segment.color}"
                role="img"
                aria-label="{segment.label}: {formatVal(segment.days)} life-days, {presets[activePreset].label}"
                onmouseenter={(e) => showTip(e, segment, 'life-days', presets[activePreset].label)}
                onmousemove={(e) => showTip(e, segment, 'life-days', presets[activePreset].label)}
                onmouseleave={hideTip}
              ></div>
            {/each}
          </div>
        </div>
        {#if showBaseline}
          <div class="bar-row baseline-row" transition:fade={{ duration: 150 }}>
            <div class="bar-header">
              <span class="bar-preset">vs {presets[baselinePreset].label}</span>
              <span class="bar-total">{formatVal(baselineLifeTotal)}</span>
            </div>
            <div class="stacked-bar baseline-bar">
              {#each baselineLifeBreakdown as segment}
                <div
                  class="stacked-segment"
                  style="width: {maxDays > 0 ? (segment.days / maxDays) * 100 : 0}%; background-color: {segment.color}"
                  role="img"
                  aria-label="{segment.label}: {formatVal(segment.days)} life-days, {presets[baselinePreset].label}"
                  onmouseenter={(e) => showTip(e, segment, 'life-days', presets[baselinePreset].label)}
                  onmousemove={(e) => showTip(e, segment, 'life-days', presets[baselinePreset].label)}
                  onmouseleave={hideTip}
                ></div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>

    <div class="metric-block">
      <div class="metric-label">Suffering-days</div>
      <div class="bar-pair">
        <div class="bar-row">
          <div class="bar-header">
            <span class="bar-preset">{presets[activePreset].label}</span>
            <span class="bar-total">{formatVal(activeSufferingTotal)}</span>
          </div>
          <div class="stacked-bar active-bar">
            {#each activeSufferingBreakdown as segment}
              <div
                class="stacked-segment"
                style="width: {maxDays > 0 ? (segment.days / maxDays) * 100 : 0}%; background-color: {segment.color}"
                role="img"
                aria-label="{segment.label}: {formatVal(segment.days)} suffering-days, {presets[activePreset].label}"
                onmouseenter={(e) => showTip(e, segment, 'suffering-days', presets[activePreset].label)}
                onmousemove={(e) => showTip(e, segment, 'suffering-days', presets[activePreset].label)}
                onmouseleave={hideTip}
              ></div>
            {/each}
            <div
              class="stripe-overlay"
              style="width: {maxDays > 0 ? (activeSufferingTotal / maxDays) * 100 : 0}%"
              aria-hidden="true"
            ></div>
          </div>
        </div>
        {#if showBaseline}
          <div class="bar-row baseline-row" transition:fade={{ duration: 150 }}>
            <div class="bar-header">
              <span class="bar-preset">vs {presets[baselinePreset].label}</span>
              <span class="bar-total">{formatVal(baselineSufferingTotal)}</span>
            </div>
            <div class="stacked-bar baseline-bar">
              {#each baselineSufferingBreakdown as segment}
                <div
                  class="stacked-segment"
                  style="width: {maxDays > 0 ? (segment.days / maxDays) * 100 : 0}%; background-color: {segment.color}"
                  role="img"
                  aria-label="{segment.label}: {formatVal(segment.days)} suffering-days, {presets[baselinePreset].label}"
                  onmouseenter={(e) => showTip(e, segment, 'suffering-days', presets[baselinePreset].label)}
                  onmousemove={(e) => showTip(e, segment, 'suffering-days', presets[baselinePreset].label)}
                  onmouseleave={hideTip}
                ></div>
              {/each}
              <div
                class="stripe-overlay"
                style="width: {maxDays > 0 ? (baselineSufferingTotal / maxDays) * 100 : 0}%"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        {/if}
      </div>
    </div>

    {#if tooltip}
      <div
        class="bar-tooltip"
        style="left: {tooltip.x}px; top: {tooltip.y}px"
        role="tooltip"
      >
        <span class="tip-label">{tooltip.label}</span>
        <span class="tip-value">{formatVal(tooltip.value)} {tooltip.unit}</span>
        <span class="tip-preset">{tooltip.presetLabel}</span>
      </div>
    {/if}
  </div>

  <div class="diet-legend">
    {#each activeProducts as item}
      <div class="legend-item">
        <span class="legend-swatch" style="background: {item.color}"></span>
        <span class="legend-label">{item.label}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .diet-calculator {
    display: flex;
    flex-direction: column;
  }

  .widget-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--text-strong);
    margin: 0 0 0.5rem 0;
  }

  .chart-copy {
    font-size: 0.85rem;
    color: var(--text-faint);
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .preset-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }

  .preset-btn {
    flex: 1 1 auto;
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: none;
    color: var(--text-dim);
    font-size: 0.8rem;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }

  .preset-btn:hover {
    border-color: var(--text-ghost);
    color: var(--text-strong);
  }

  .preset-btn.active {
    border-color: var(--accent);
    color: var(--text-strong);
    background: var(--accent-bg);
  }

  /* Subtle marker so the reader can see which preset is currently the
     comparison baseline without scanning to the second row. */
  .preset-btn.baseline:not(.active) {
    border-style: dashed;
    color: var(--text-muted);
  }

  .compare-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem 0.75rem;
    margin-bottom: 1rem;
  }

  .compare-label {
    font-size: 0.7rem;
    color: var(--text-ghost);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    flex: 0 0 auto;
  }

  .compare-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    flex: 1 1 auto;
  }

  .compare-btn {
    padding: 0.2rem 0.55rem;
    border: 1px dashed var(--border);
    border-radius: 4px;
    background: none;
    color: var(--text-faint);
    font-size: 0.72rem;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }

  .compare-btn:hover {
    border-color: var(--text-ghost);
    color: var(--text-dim);
  }

  .compare-btn.active {
    border-style: solid;
    border-color: var(--text-ghost);
    color: var(--text-strong);
  }

  .editorial {
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--text-dim);
    padding: 0.6rem 0.85rem;
    margin-bottom: 1.25rem;
    border-left: 2px solid var(--accent);
    background: var(--accent-bg-subtle);
    border-radius: 0 4px 4px 0;
  }

  .bars {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 1rem;
  }

  .metric-block {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .metric-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-ghost);
  }

  .bar-pair {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .bar-row {
    display: flex;
    flex-direction: column;
  }

  .bar-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.3rem;
    gap: 1rem;
  }

  .bar-preset {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .bar-total {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--text-strong);
    font-variant-numeric: tabular-nums;
  }

  .baseline-row .bar-preset {
    font-size: 0.72rem;
    color: var(--text-faint);
  }

  .baseline-row .bar-total {
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .stacked-bar {
    position: relative;
    display: flex;
    border-radius: 4px;
    overflow: hidden;
    background: var(--bg-subtle);
  }

  .active-bar { height: 44px; }
  .baseline-bar { height: 22px; }

  .stacked-segment {
    transition: width 0.4s ease;
    flex-shrink: 0;
    cursor: default;
  }

  /* One continuous stripe layer over all segments, so thickness stays even
     instead of restarting inside each segment. */
  .stripe-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    transition: width 0.4s ease;
    background-image: repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.22) 0 3px,
      rgba(255, 255, 255, 0.06) 3px 7px
    );
  }

  .bar-tooltip {
    position: absolute;
    pointer-events: none;
    transform: translate(-50%, calc(-100% - 12px));
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding: 0.4rem 0.6rem;
    background: var(--bg-elevated);
    border: 1px solid var(--border-strong);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    white-space: nowrap;
    z-index: 2;
  }

  .bar-tooltip::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -5px;
    width: 8px;
    height: 8px;
    background: var(--bg-elevated);
    border-right: 1px solid var(--border-strong);
    border-bottom: 1px solid var(--border-strong);
    transform: translateX(-50%) rotate(45deg);
  }

  .tip-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-strong);
  }

  .tip-value {
    font-size: 0.7rem;
    color: var(--text-dim);
    font-variant-numeric: tabular-nums;
  }

  .tip-preset {
    font-size: 0.65rem;
    color: var(--text-ghost);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .diet-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
  }

  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
  }

  .legend-swatch {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .legend-label {
    color: var(--text-dim);
  }
</style>
