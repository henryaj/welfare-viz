<script>
  // Mounted at {{widget:diet-calculator}}.
  // Preset-driven diet comparison with two stacked bars (life-days vs.
  // suffering-days) on a shared scale so the two framings can be read at once.
  // Weighting maps (`lifeDaysPerKg` / `sufferingDaysPerKg`) live in farming.js.
  import { fade } from 'svelte/transition';
  import {
    farmedAnimals, lifeDaysPerKg, sufferingDaysPerKg,
    products, presets,
  } from '../data/farming.js';

  let { copy = {} } = $props();

  let activePreset = $state('european');
  let diet = $derived(presets[activePreset].values);

  function buildBreakdown(weight) {
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

  let lifeBreakdown = $derived(buildBreakdown(lifeDaysPerKg));
  let sufferingBreakdown = $derived(buildBreakdown(sufferingDaysPerKg));
  let lifeTotal = $derived(lifeBreakdown.reduce((s, b) => s + b.days, 0));
  let sufferingTotal = $derived(sufferingBreakdown.reduce((s, b) => s + b.days, 0));

  // Fixed scale across both framings AND all presets so the two bars share an
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

  // Legend: one entry per product eaten in the active preset (non-zero kg).
  let activeProducts = $derived(
    products
      .filter(p => diet[p.id] > 0)
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
</script>

<div class="diet-calculator">
  <h3 class="widget-title">{copy.title ?? 'Your diet, in animal days'}</h3>

  {#if copy.intro}<p class="chart-copy">{copy.intro}</p>{/if}

  <div class="preset-buttons">
    {#each Object.entries(presets) as [key, preset]}
      <button
        class="preset-btn"
        class:active={activePreset === key}
        onclick={() => (activePreset = key)}
      >{preset.label}</button>
    {/each}
  </div>

  {#if copy[activePreset]}
    {#key activePreset}
      <div class="editorial" in:fade={{ duration: 200 }}>{copy[activePreset]}</div>
    {/key}
  {/if}

  <div class="bars">
    <div class="bar-row">
      <div class="bar-header">
        <span class="bar-label">Life-days</span>
        <span class="bar-total">{formatVal(lifeTotal)}</span>
      </div>
      <div class="stacked-bar">
        {#each lifeBreakdown as segment}
          <div
            class="stacked-segment"
            style="width: {maxDays > 0 ? (segment.days / maxDays) * 100 : 0}%; background-color: {segment.color}"
            title="{segment.label}: {formatVal(segment.days)} life-days"
          ></div>
        {/each}
      </div>
    </div>

    <div class="bar-row">
      <div class="bar-header">
        <span class="bar-label">Suffering-days</span>
        <span class="bar-total">{formatVal(sufferingTotal)}</span>
      </div>
      <div class="stacked-bar">
        {#each sufferingBreakdown as segment}
          <div
            class="stacked-segment"
            style="width: {maxDays > 0 ? (segment.days / maxDays) * 100 : 0}%; background-color: {segment.color}"
            title="{segment.label}: {formatVal(segment.days)} suffering-days"
          ></div>
        {/each}
        <div
          class="stripe-overlay"
          style="width: {maxDays > 0 ? (sufferingTotal / maxDays) * 100 : 0}%"
          aria-hidden="true"
        ></div>
      </div>
    </div>
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
    margin-bottom: 1rem;
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
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    margin-bottom: 1rem;
  }

  .bar-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.35rem;
  }

  .bar-label {
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

  .stacked-bar {
    position: relative;
    display: flex;
    height: 44px;
    border-radius: 4px;
    overflow: hidden;
    background: var(--bg-subtle);
  }

  .stacked-segment {
    transition: width 0.4s ease;
    flex-shrink: 0;
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
