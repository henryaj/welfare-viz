<script>
  // Mounted at {{widget:animal-lives}}.
  // Two-panel carousel:
  //   1. Click an animal to see how it lives and dies, with the two per-animal
  //      numbers shown as callouts.
  //   2. Suffering-days per kg plotted across all animals, so you can eyeball
  //      the comparison.
  import { farmedAnimals } from '../data/farming.js';
  import { fade } from 'svelte/transition';

  let { copy = {} } = $props();

  const order = ['chicken', 'eggs', 'pig', 'beef', 'dairy', 'salmon', 'shrimp'];
  const displayNames = { chicken: 'Chicken' };
  const animals = order
    .map(id => farmedAnimals.find(a => a.id === id))
    .filter(Boolean)
    .map(a => ({ ...a, name: displayNames[a.id] ?? a.name }));

  const panels = [
    { id: 'detail' },
    { id: 'compare' },
  ];

  let activePanel = $state(0);
  let activeId = $state(animals[0].id);
  let active = $derived(animals.find(a => a.id === activeId));
  let lifeContent = $derived(copy[`${activeId}-life`]);
  let deathContent = $derived(copy[`${activeId}-death`]);

  const maxSufferingDaysPerKg = Math.max(...animals.map(a => a.sufferingDaysPerKg ?? 0));
  // For the compare panel we want highest-first so bars form a clean staircase.
  const animalsBySuffering = [...animals].sort(
    (a, b) => (b.sufferingDaysPerKg ?? -1) - (a.sufferingDaysPerKg ?? -1)
  );

  function fmt(n) {
    if (n == null) return '—';
    if (n >= 100) return Math.round(n).toString();
    if (n >= 10) return n.toFixed(0);
    if (n >= 1) return n.toFixed(1);
    return n.toFixed(2);
  }

  function go(i) {
    activePanel = (i + panels.length) % panels.length;
  }
</script>

<div class="animal-lives">
  <div class="header">
    <h3 class="widget-title">{copy.title ?? 'Comparing animal lives'}</h3>
    <div class="nav">
      <button class="nav-btn" aria-label="Previous" onclick={() => go(activePanel - 1)}>‹</button>
      <div class="dots">
        {#each panels as _, i}
          <button
            class="dot"
            class:active={i === activePanel}
            aria-label={`Panel ${i + 1}`}
            onclick={() => go(i)}
          ></button>
        {/each}
      </div>
      <button class="nav-btn" aria-label="Next" onclick={() => go(activePanel + 1)}>›</button>
    </div>
  </div>

  {#if copy.intro}
    <p class="intro">{copy.intro}</p>
  {/if}

  {#key activePanel}
    <div class="panel" in:fade={{ duration: 200 }}>
      {#if panels[activePanel].id === 'detail'}
        <div class="picker" role="tablist">
          {#each animals as a}
            <button
              class="pick"
              class:active={a.id === activeId}
              role="tab"
              aria-selected={a.id === activeId}
              style="--pick-color: {a.color}"
              onclick={() => (activeId = a.id)}
            >
              {a.name}
            </button>
          {/each}
        </div>

        {#key activeId}
          <div class="detail" in:fade={{ duration: 180 }}>
            <div class="section">
              <div class="section-body">
                <h4 class="section-title">How they live</h4>
                {#if Array.isArray(lifeContent) && lifeContent.length}
                  <ul class="desc">
                    {#each lifeContent as pt}<li>{pt}</li>{/each}
                  </ul>
                {:else if typeof lifeContent === 'string' && lifeContent}
                  <p class="desc">{lifeContent}</p>
                {:else}
                  <p class="desc placeholder">Add <code>{active.id}-life</code> to the widget copy in <code>copy.md</code>.</p>
                {/if}
              </div>
              <span class="stat" title="Suffering intensity per day of life, on a scale where beef cattle = 1">
                <span class="stat-value">{fmt(active.sufferingPerDay)}×</span>
                <span class="stat-label">suffering/day<br/>(beef = 1)</span>
              </span>
            </div>

            <div class="section">
              <div class="section-body">
                <h4 class="section-title">How they die</h4>
                {#if Array.isArray(deathContent) && deathContent.length}
                  <ul class="desc">
                    {#each deathContent as pt}<li>{pt}</li>{/each}
                  </ul>
                {:else if typeof deathContent === 'string' && deathContent}
                  <p class="desc">{deathContent}</p>
                {:else}
                  <p class="desc placeholder">Add <code>{active.id}-death</code> to the widget copy in <code>copy.md</code>.</p>
                {/if}
              </div>
              <span class="stat" title="Pain of the slaughter event, expressed as equivalent days of normal farm life">
                <span class="stat-value">{fmt(active.deathDays)}</span>
                <span class="stat-label">days of life<br/>≡ pain of death</span>
              </span>
            </div>

            <div class="summary">
              <span class="summary-label">Suffering per kg of product</span>
              <span class="summary-value">
                <strong>{fmt(active.sufferingDaysPerKg)}</strong>
                <span class="summary-unit">suffering-days / kg</span>
              </span>
            </div>
          </div>
        {/key}
      {:else}
        <div class="chart">
          <h4 class="chart-title">Suffering-days per kg <span class="chart-unit">of product</span></h4>
          <div class="bars">
            {#each animalsBySuffering as a}
              <div class="bar-row">
                <span class="bar-label">{a.name}</span>
                <div class="bar-track">
                  {#if a.sufferingDaysPerKg != null}
                    <div
                      class="bar-fill"
                      style="width: {(a.sufferingDaysPerKg / maxSufferingDaysPerKg) * 100}%; background: {a.color}"
                    ></div>
                  {:else}
                    <div class="bar-fill na"></div>
                  {/if}
                </div>
                <span class="bar-value">{a.sufferingDaysPerKg == null ? '—' : fmt(a.sufferingDaysPerKg)}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/key}
</div>

<style>
  .animal-lives {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .widget-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--text-strong);
    margin: 0;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-btn {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-dim);
    width: 28px;
    height: 28px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
    transition: border-color 0.2s, color 0.2s;
  }

  .nav-btn:hover {
    border-color: var(--accent);
    color: var(--text-strong);
  }

  .dots {
    display: flex;
    gap: 0.4rem;
    padding: 0 0.25rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: background 0.2s;
  }

  .dot:hover {
    background: var(--text-ghost);
  }

  .dot.active {
    background: var(--accent);
  }

  .intro {
    font-size: 0.85rem;
    color: var(--text-dim);
    line-height: 1.5;
    margin: 0;
  }

  .panel {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  /* --- Detail panel (picker + sections) --- */

  .picker {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .pick {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font: inherit;
    font-size: 0.8rem;
    color: var(--text-dim);
    padding: 0.35rem 0.75rem;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 999px;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }

  .pick::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--pick-color);
    flex-shrink: 0;
  }

  .pick:hover {
    color: var(--text-strong);
    border-color: var(--text-ghost);
  }

  .pick.active {
    color: var(--text-strong);
    border-color: var(--pick-color);
    background: color-mix(in srgb, var(--pick-color) 12%, transparent);
  }

  .detail {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .section {
    display: flex;
    align-items: stretch;
    gap: 1rem;
  }

  .section-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .section-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-strong);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .stat {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.5rem 0.85rem;
    background: var(--bg-subtle);
    border-radius: 6px;
    min-width: 110px;
    white-space: nowrap;
    cursor: help;
  }

  .stat-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-strong);
    font-variant-numeric: tabular-nums;
    line-height: 1.1;
  }

  .stat-label {
    font-size: 0.65rem;
    line-height: 1.2;
    color: var(--text-faint);
    text-align: center;
  }

  .desc {
    font-size: 0.9rem;
    line-height: 1.55;
    color: var(--text);
    margin: 0;
  }

  ul.desc {
    padding-left: 1.1rem;
    line-height: 1.5;
  }

  ul.desc li {
    margin-bottom: 0.15rem;
  }

  ul.desc li::marker {
    color: var(--text-ghost);
  }

  .desc.placeholder {
    padding-left: 0;
    color: var(--text-faint);
    font-style: italic;
  }

  .desc.placeholder code {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.8em;
    color: var(--text-dim);
    background: var(--bg-subtle);
    padding: 0 0.3em;
    border-radius: 3px;
  }

  .summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1rem;
    margin-top: 0.15rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg-subtle);
  }

  .summary-label {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    color: var(--text-strong);
  }

  .summary-value {
    display: inline-flex;
    align-items: baseline;
    gap: 0.4rem;
    font-family: 'Space Grotesk', sans-serif;
    font-variant-numeric: tabular-nums;
  }

  .summary-value strong {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .summary-unit {
    font-size: 0.75rem;
    color: var(--text-faint);
    margin-left: 0.4rem;
  }

  /* --- Compare panel (vertical bar chart) --- */

  .chart {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
  }

  .chart-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-strong);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .chart-unit {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    font-size: 0.7rem;
    color: var(--text-faint);
    text-transform: none;
    letter-spacing: 0;
    margin-left: 0.25rem;
  }

  .bars {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .bar-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.4rem;
  }

  .bar-label {
    flex: 0 0 100px;
    font-size: 0.75rem;
    color: var(--text-dim);
    text-align: right;
  }

  .bar-track {
    flex: 1;
    height: 20px;
    background: var(--bg-subtle);
    border-radius: 3px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    min-width: 2px;
  }

  .bar-fill.na {
    width: 16px;
    background: repeating-linear-gradient(
      -45deg,
      var(--border),
      var(--border) 3px,
      transparent 3px,
      transparent 6px
    );
    border-radius: 2px;
  }

  .bar-value {
    flex: 0 0 70px;
    font-size: 0.75rem;
    color: var(--text-faint);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    .section {
      flex-direction: column;
    }

    .stat {
      align-self: flex-start;
      flex-direction: row;
      min-width: 0;
      padding: 0.4rem 0.7rem;
    }

    .stat-value {
      font-size: 1rem;
    }

    .stat-label {
      text-align: left;
    }

    .summary {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .bar-label {
      flex: 0 0 85px;
    }
  }
</style>
