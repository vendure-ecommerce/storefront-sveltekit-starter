import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { resolve } from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$houdini: resolve('./$houdini'),
			$components: resolve('./src/lib/components'),
			$lib: resolve('./src/lib'),
			$stores: resolve('./src/stores'),
		},
	},
}

export default config
