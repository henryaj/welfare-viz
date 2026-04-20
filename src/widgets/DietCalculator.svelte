<script>
  // Mounted at {{widget:diet-calculator}} (Part 2, currently parked).
  // Interactive diet builder: reader picks a preset (European, American, British,
  // Pescatarian, Vegetarian, Vegan) or drags sliders per product, and sees the
  // total life-days per year broken out as a stacked bar. Preset numbers live
  // in src/data/farming.js and are provisional pending Part 2 sourcing work.
  import { farmedAnimals, lifeDaysPerKg, products, presets, sliderMax } from '../data/farming.js';

  let { copy = {} } = $props();
  let diet = $state({ ...presets.european.values });
  let activePreset = $state('european');

  function applyPreset(key) {
    diet = { ...presets[key].values };
    activePreset = key;
  }

  // Compute a fixed max scale from the largest preset (American)
  const maxLifeDays = Math.max(
    ...Object.values(presets).map(p =>
      products.reduce((sum, prod) => {
        const kg = prod.toKg(p.values[prod.id]);
        return sum + kg * lifeDaysPerKg[prod.animalId];
      }, 0)
    )
  );

  let lifeDaysBreakdown = $derived(
    products.map(p => {
      const kg = p.toKg(diet[p.id]);
      const days = kg * lifeDaysPerKg[p.animalId];
      const animal = farmedAnimals.find(a => a.id === p.animalId);
      return { id: p.id, label: p.label, days, color: animal.color };
    })
  );

  let totalLifeDays = $derived(lifeDaysBreakdown.reduce((sum, b) => sum + b.days, 0));

  function onSliderInput() {
    activePreset = null;
  }
</script>

<div class="diet-calculator">
  <h3 class="chart-title">Life-days in different diets</h3>
  {#if copy.intro}<p class="chart-copy">{copy.intro}</p>{/if}

  <div class="diet-layout">
    <div class="diet-inputs">
      <div class="preset-buttons">
        {#each Object.entries(presets) as [key, preset]}
          <button
            class="preset-btn"
            class:active={activePreset === key}
            onclick={() => applyPreset(key)}
          >{preset.label}</button>
        {/each}
      </div>

      <div class="sliders">
        {#each products as product}
          <div class="slider-row">
            <label class="slider-label" for="diet-slider-{product.id}">{product.label}</label>
            <input
              id="diet-slider-{product.id}"
              type="range"
              min="0"
              max={sliderMax[product.id]}
              bind:value={diet[product.id]}
              oninput={onSliderInput}
              class="slider"
            />
            <span class="slider-value">{diet[product.id]} <span class="slider-unit">{product.unit}</span></span>
          </div>
        {/each}
      </div>
    </div>

    <div class="diet-output">
      <div class="stacked-bar">
        {#each lifeDaysBreakdown as segment}
          <div
            class="stacked-segment"
            style="width: {(segment.days / maxLifeDays) * 100}%; background: {segment.color}"
            title="{segment.label}: {Math.round(segment.days).toLocaleString()} life-days"
          ></div>
        {/each}
      </div>

      <div class="diet-legend">
        {#each lifeDaysBreakdown as segment}
          {#if segment.days > 0}
            <div class="legend-item">
              <span class="legend-swatch" style="background: {segment.color}"></span>
              <span class="legend-label">{segment.label}</span>
              <span class="legend-value">{Math.round(segment.days).toLocaleString()}</span>
            </div>
          {/if}
        {/each}
      </div>

      <div class="total-life-days">
        <span class="total-label">Total life-days per year</span>
        <span class="total-value">{Math.round(totalLifeDays).toLocaleString()}</span>
      </div>
    </div>
  </div>
</div>

<style>
  .chart-copy {
    font-size: 0.85rem;
    color: var(--text-faint);
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }

  .chart-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text-strong);
    margin-bottom: 0.75rem;
  }

  .diet-layout {
    display: flex;
    gap: 2rem;
  }

  .diet-inputs {
    flex: 0 0 320px;
  }

  .preset-buttons {
    display: flex;
    gap: 0.4rem;
    margin-bottom: 1.25rem;
  }

  .preset-btn {
    flex: 1;
    padding: 0.35rem 0.5rem;
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

  .slider-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .slider-label {
    flex: 0 0 65px;
    font-size: 0.8rem;
    color: var(--text-muted);
    text-align: right;
  }

  .slider {
    flex: 1;
    height: 4px;
    accent-color: var(--accent);
    cursor: pointer;
  }

  .slider-value {
    flex: 0 0 70px;
    font-size: 0.8rem;
    color: var(--text-faint);
    font-variant-numeric: tabular-nums;
  }

  .slider-unit {
    color: var(--text-ghost);
  }

  .diet-output {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .stacked-bar {
    display: flex;
    height: 36px;
    border-radius: 4px;
    overflow: hidden;
    background: var(--bg-subtle);
    margin-bottom: 1rem;
  }

  .stacked-segment {
    transition: width 0.4s ease;
    flex-shrink: 0;
  }

  .diet-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1rem;
    margin-bottom: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
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

  .legend-value {
    color: var(--text-faint);
    font-variant-numeric: tabular-nums;
  }

  .total-life-days {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-top: 1px solid var(--border);
    padding-top: 0.75rem;
  }

  .total-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .total-value {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: var(--text-strong);
  }

  @media (max-width: 1024px) {
    .diet-inputs {
      flex: 0 0 260px;
    }
  }

  @media (max-width: 768px) {
    .diet-layout {
      flex-direction: column;
    }

    .diet-inputs {
      flex: none;
    }
  }
</style>
