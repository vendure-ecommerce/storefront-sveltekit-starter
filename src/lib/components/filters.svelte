<script lang="ts">
	import { fragment, graphql } from '$houdini'
	import type { SearchFilter } from '$houdini'

	export let search: SearchFilter
	$: data = fragment(
		search,
		graphql(`
			fragment SearchFilter on SearchResponse {
				facetValues {
					count
					facetValue {
						id
						name
						facet {
							id
							name
						}
					}
				}
			}
		`)
	)

	$: groupedData = $data.facetValues.reduce((acc, facetValueData) => {
		const facetValueName = facetValueData.facetValue.facet.name

		if (!acc[facetValueName]) {
			acc[facetValueName] = []
		}

		acc[facetValueName].push(facetValueData)

		return acc
	}, {})
</script>

<div class="p-2 mr-6 w-1/5 h-full bordered card">
	<div class="form-control">
		{#each Object.entries(groupedData) as [key, items]}
			<p class="capitalize font-medium pl-1">{key}</p>
			{#each items ?? [] as item}
				<label class="cursor-pointer label py-1">
					<span class="label-text"
						>{item.facetValue.name} ({item.count})</span
					>
					<!-- bind:group={filterValues} -->
					<input
						value={item.facetValue.id}
						type="checkbox"
						checked
						class="checkbox checkbox-sm checkbox-primary"
					/>
				</label>
			{/each}
		{/each}
	</div>
</div>
