<script>
  // Mounted at {{widget:life-days}}.
  // Three-panel carousel building up the "life-days per kg" concept:
  //   1. Average lifespan by animal
  //   2. Edible food per animal
  //   3. Life-days per kg of product (1 / 2)
  // Each panel's bars fill sequentially when it enters view or is navigated to.
  // Copy keys (`lifespan`, `edible`, `lifedays`) carry per-panel editorial text.
  import { farmedAnimals } from '../data/farming.js';
  import { fade } from 'svelte/transition';

  let { copy = {} } = $props();

  let active = $state(0);
  let revealed = $state(0);
  let started = $state(false);
  let container;
  let revealTimer;

  const byValue = (a, b) => b.value - a.value;
  const lifespanData = farmedAnimals.map(a => ({ name: a.name, value: a.lifespanDays, color: a.color })).sort(byValue);
  const edibleData = farmedAnimals.map(a => ({ name: a.name, value: a.edibleKg, color: a.color })).sort(byValue);
  const lifeDaysData = farmedAnimals.map(a => ({
    name: a.name,
    value: a.lifespanDays / a.edibleKg,
    color: a.color,
  })).sort(byValue);

  const charts = [
    { title: 'Average lifespan', unit: 'days', data: lifespanData, copyKey: 'lifespan' },
    { title: 'Edible food per animal', unit: 'kg', data: edibleData, clipMax: true, copyKey: 'edible' },
    { title: 'Life-days per kg', unit: 'days/kg', data: lifeDaysData, clipMax: true, copyKey: 'lifedays' },
  ];

  function chartMax(chart) {
    const values = chart.data.map(d => d.value).sort((a, b) => b - a);
    if (chart.clipMax && values.length > 1 && values[0] > values[1] * 3) {
      return values[1];
    }
    return values[0];
  }

  function formatVal(v) {
    if (v >= 1000) return Math.round(v).toLocaleString();
    if (v >= 10) return Math.round(v).toString();
    if (v >= 1) return v.toFixed(1);
    return v.toFixed(2);
  }

  function startReveal() {
    clearInterval(revealTimer);
    revealed = 0;
    const total = charts[active].data.length;
    revealTimer = setInterval(() => {
      revealed += 1;
      if (revealed >= total) clearInterval(revealTimer);
    }, 180);
  }

  function go(i) {
    const next = (i + charts.length) % charts.length;
    if (next === active && started) return;
    active = next;
    started = true;
    startReveal();
  }

  function observe(node) {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          startReveal();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return { destroy: () => { obs.disconnect(); clearInterval(revealTimer); } };
  }
</script>

<div class="life-days-widget" bind:this={container} use:observe>
  <h3 class="widget-title">{copy.title ?? 'Life-days per kg of product'}</h3>
  <div class="header">
    <h4 class="chart-title">{charts[active].title}</h4>
  </div>

  {#key active}
    <div class="chart-panel" in:fade={{ duration: 250 }}>
      {#if copy[charts[active].copyKey]}
        <p class="chart-copy">{copy[charts[active].copyKey]}</p>
      {/if}
      {#each charts[active].data as row, i}
        {@const max = chartMax(charts[active])}
        {@const pct = (row.value / max) * 100}
        {@const clipped = pct > 100}
        {@const shown = started && i < revealed}
        <div class="bar-row" class:shown>
          <span class="bar-label">{row.name}</span>
          <div class="bar-track">
            <div
              class="bar-fill"
              class:clipped
              style="width: {shown ? Math.min(pct, 100) : 0}%; background: {row.color}"
            ></div>
          </div>
          <span class="bar-value">{formatVal(row.value)} <span class="bar-unit">{charts[active].unit}</span></span>
        </div>
      {/each}
    </div>
  {/key}

  <div class="nav">
    <button class="nav-btn" aria-label="Previous" onclick={() => go(active - 1)}>‹</button>
    <div class="dots">
      {#each charts as _, i}
        <button
          class="dot"
          class:active={i === active}
          aria-label={`Chart ${i + 1}`}
          onclick={() => go(i)}
        ></button>
      {/each}
    </div>
    <button class="nav-btn" aria-label="Next" onclick={() => go(active + 1)}>›</button>
  </div>
</div>

<style>
  .life-days-widget {
    display: flex;
    flex-direction: column;
  }

  .widget-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--text-strong);
    margin: 0 0 0.75rem 0;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  .chart-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text-strong);
    margin: 0;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.85rem;
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

  .chart-panel {
    min-height: 200px;
  }

  .chart-copy {
    font-size: 0.85rem;
    color: var(--text-faint);
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }

  .bar-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.4rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .bar-row.shown {
    opacity: 1;
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

  .bar-fill.clipped {
    border-radius: 3px 0 0 3px;
    mask-image: linear-gradient(to right, black 80%, transparent);
    -webkit-mask-image: linear-gradient(to right, black 80%, transparent);
  }

  .bar-value {
    flex: 0 0 110px;
    font-size: 0.75rem;
    color: var(--text-faint);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .bar-unit {
    color: var(--text-ghost);
  }

  @media (max-width: 1024px) {
    .bar-label {
      flex: 0 0 85px;
    }

    .bar-value {
      flex: 0 0 90px;
    }
  }

  @media (max-width: 768px) {
    .bar-label {
      flex: 0 0 85px;
    }
  }
</style>
