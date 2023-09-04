<script lang="ts">
	import type { PageData } from './$types'

	import { browser } from '$app/environment'
	import { GetCollectionsStore, SearchProductsStore } from '$houdini'
	import CategoryBanner from '$lib/components/category-banner.svelte'
	import Filters from '$lib/components/filters.svelte'
	import ProductCard from '$lib/components/product-card.svelte'
	import { filtersStore } from '$stores/filters'

	export let data: PageData
	const { slug } = data
	const GetCollections = new GetCollectionsStore()
	const SearchProducts = new SearchProductsStore()
	$: browser && GetCollections.fetch()
	$: collections =
		$GetCollections.data?.collections?.items?.filter(
			item => item?.parent?.slug === slug
		) ?? []

	$: browser &&
		SearchProducts.fetch({
			variables: {
				input: {
					collectionSlug: slug,
					groupByProduct: true,
					// TODO JYC
					// facetValueIds: $filtersStore,
					take: 24,
					skip: 0,
				},
			},
		})
	$: products = $SearchProducts?.data?.search?.items
	$: facetValues = $SearchProducts?.data?.search?.facetValues
</script>

<CategoryBanner {collections} />

<div class="flex">
	<!-- {#if Object.entries(facetValues ?? {}).length >= 1}
		<Filters {facetValues} />
	{/if} -->
	Filters
	<div
		class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
	>
		{#if products?.length >= 1}
			{#each products as item}
				<ProductCard {item} />
			{/each}
		{/if}
	</div>
</div>
