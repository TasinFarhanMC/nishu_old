<script lang="ts">
  let {
    from = $bindable(10),
    to = $bindable(30),
    min = 0,
    max = 100,
  } = $props();

  function fromInput() {
    if (from < min) from = min;
    if (from > to) from = to;
  }

  function toInput() {
    if (to > max) to = max;
    if (to < from) to = from;
  }

  let fillLeft = $derived(((from - min) / (max - min)) * 100);
  let fillRight = $derived(100 - ((to - min) / (max - min)) * 100);
</script>

<div class="range">
  <div class="range-slider">
    <span class="range-selected" style="left:{fillLeft}%; right:{fillRight}%"
    ></span>
  </div>
  <div class="range-input">
    <input
      type="range"
      class="min"
      {min}
      {max}
      oninput={fromInput}
      bind:value={from}
    />
    <input
      type="range"
      class="max"
      {min}
      {max}
      oninput={toInput}
      bind:value={to}
    />
  </div>
  <div class="range-price">
    <label for="min">Min</label>
    <input
      type="number"
      id="min"
      {min}
      {max}
      oninput={fromInput}
      bind:value={from}
    />
    <label for="max">Max</label>
    <input
      type="number"
      id="max"
      {min}
      {max}
      oninput={toInput}
      bind:value={to}
    />
  </div>
</div>

<style>
  .range-slider {
    height: 5px;
    position: relative;
    background-color: #e1e9f6;
    border-radius: 2px;
  }
  .range-selected {
    height: 100%;
    left: 30%;
    right: 30%;
    position: absolute;
    border-radius: 5px;
    background-color: #1b53c0;
  }
  .range-input {
    position: relative;
  }
  .range-input input {
    position: absolute;
    width: 100%;
    height: 5px;
    top: -7px;
    background: none;
    pointer-events: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  .range-input input::-webkit-slider-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 3px solid #1b53c0;
    background-color: #fff;
    pointer-events: auto;
    -webkit-appearance: none;
  }
  .range-input input::-moz-range-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: 3px solid #1b53c0;
    background-color: #fff;
    pointer-events: auto;
    -moz-appearance: none;
  }
  .range-price {
    margin: 30px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .range-price label {
    margin-right: 5px;
  }
  .range-price input {
    width: 40px;
    padding: 5px;
  }
  .range-price input:first-of-type {
    margin-right: 15px;
  }
</style>
