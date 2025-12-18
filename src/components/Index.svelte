<script lang="ts">
  import { onMount } from "svelte";
  import {
    fetchPanels,
    type PanelEntries,
    type PanelRecord,
  } from "../assets/panels";
  import { filterPanels, type Query } from "../assets/search";
  import Slider from "./Slider.svelte";

  let panels: PanelEntries = $state([]);
  let constPanels: PanelEntries = $state([]);
  let error: string = $state("");
  let loading = $state(true);
  let min = $state(10);
  let max = $state(20);

  // filter state
  let filters: Query = {};

  // pagination state
  let currentPage = $state(1);
  const pageSize = 5;

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = Number(params.get("page"));
    if (pageParam && pageParam > 0) currentPage = pageParam;

    try {
      const data: PanelRecord = (await fetchPanels()).panels;
      constPanels = Object.entries(data);
      panels = constPanels;
    } catch (err: any) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

  const totalPages = $derived(Math.ceil(panels.length / pageSize));
  let pagedPanels = $derived(
    panels.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  );

  function nextPage() {
    if (currentPage < totalPages) changePage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 1) changePage(currentPage - 1);
  }

  function changePage(page: number) {
    currentPage = page;
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.replaceState({}, "", url.toString());
  }

  function search() {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== null && v !== ""),
    );

    if (Object.keys(activeFilters).length === 0) {
      panels = constPanels;
      return;
    }

    panels = filterPanels(constPanels, filters);
  }
</script>

<h1>HEllo</h1>

<Slider bind:from={min} bind:to={max} />

{#if loading}
  <p>Loading panels</p>
{:else if error}
  <p style="color:red">Error: {error}</p>
{:else}
  <ul>
    {#each pagedPanels as [key, panel]}
      <li>
        <a href={`/product?id=${key}`}>
          {panel.structure} - ${panel.price} - {panel.watt}W - Battery: {panel.battery}Ah
        </a>
      </li>
    {/each}
  </ul>

  <div style="margin-top:1rem">
    <button onclick={prevPage} disabled={currentPage === 1}>Prev</button>
    <span>Page {currentPage} of {totalPages}</span>
    <button onclick={nextPage} disabled={currentPage === totalPages}
      >Next</button
    >
  </div>
{/if}
