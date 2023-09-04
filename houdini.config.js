/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'https://readonlydemo.vendure.io/shop-api',
	},
	plugins: {
		'houdini-svelte': {},
	},
	scalars: {
		DateTime: {
			type: 'string',
		},
		Money: {
			type: 'number',
		},
	},
}

export default config
