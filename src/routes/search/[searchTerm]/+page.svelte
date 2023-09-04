<script lang="ts">
	import type { PageData } from './$types'

	import { SearchProductsStore } from '$houdini'
	import Filters from '$lib/components/filters.svelte'
	import SadFace from '$lib/components/icons/sad-face.svelte'
	import ProductCard from '$lib/components/product-card.svelte'
	import { filtersStore } from '$stores/filters'
	import Search from '$components/search.svelte'

	export let data: PageData
	const { searchTerm } = data

	const SearchProducts = new SearchProductsStore()
	$: SearchProducts.fetch({
		variables: {
			input: {
				collectionSlug: '',
				term: searchTerm,
				groupByProduct: true,
				// TODO JYC
				// facetValueIds: $filtersStore,
				take: 24,
				skip: 0,
			},
		},
	})

	$: products = $SearchProducts?.data?.search?.items || []
</script>

<div class="flex">
	{#if Object.entries(products).length >= 1}
		<Filters search={$SearchProducts.data.search} />
		<div
			class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
		>
			{#each products as item}
				<ProductCard {item} />
			{/each}
		</div>
	{:else}
		<h3 class="text-5xl text-neutral mb-8">No results</h3>
		<SadFace height={200} width={200} />
	{/if}
</div>
