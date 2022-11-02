<script lang="ts">
  import type { PageData } from './$types'

  import { browser } from '$app/environment'
  import { GQL_GetCurrencyCode, GQL_SearchProducts } from '$houdini'
  import Filters from '$lib/components/filters.svelte'
  import SadFace from '$lib/components/icons/sad-face.svelte'
  import ProductCard from '$lib/components/product-card.svelte'
  import { filtersStore } from '$stores/filters'

  export let data: PageData
  const { searchTerm } = data

  $: browser && GQL_GetCurrencyCode.fetch()
  let currencyCode =
    $GQL_GetCurrencyCode?.data?.activeChannel?.currencyCode

  $: GQL_SearchProducts.fetch({
    variables: {
      input: {
        collectionSlug: '',
        term: searchTerm,
        groupByProduct: true,
        facetValueIds: $filtersStore,
        take: 24,
        skip: 0,
      },
    },
  })

  $: products = $GQL_SearchProducts?.data?.search?.items || []
  $: facetValues =
    $GQL_SearchProducts?.data?.search?.facetValues || []
</script>

<div class="flex">
  {#if Object.entries(products).length >= 1}
    <Filters {facetValues} />
    <div
      class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {#each products as item}
        <ProductCard {currencyCode} {item} />
      {/each}
    </div>
  {:else}
    <h3 class="text-5xl text-neutral mb-8">No results</h3>
    <SadFace height={200} width={200} />
  {/if}
</div>
