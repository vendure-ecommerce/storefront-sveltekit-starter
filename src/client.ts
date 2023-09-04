import { browser } from '$app/environment'
import { PUBLIC_GRAPHQL_ENDPOINT } from '$env/static/public'
import { HoudiniClient } from '$houdini'

const url =
	PUBLIC_GRAPHQL_ENDPOINT ||
	'https://readonlydemo.vendure.io/shop-api'

const AUTH_TOKEN_KEY = 'auth_token'

const simpleFetchPlugin = () => {
	return {
		async network(ctx, { resolve }) {
			const headers = {}
			headers['Content-Type'] = 'application/json'

			if (browser) {
				const token = localStorage.getItem(AUTH_TOKEN_KEY)
				if (token) {
					headers['Authorization'] = `Bearer ${token}`
				}
			}

			const result = await fetch(url, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: ctx.text,
					variables: ctx.variables,
				}),
			})

			if (browser) {
				const authToken = result.headers.get('vendure-auth-token')
				if (authToken) {
					localStorage.setItem(AUTH_TOKEN_KEY, authToken)
				}
			}
			const { data, errors } = await result.json()

			// in reality we need to pass more information here.
			// see Type Definitions for more information
			resolve(ctx, {
				data,
				errors,
				fetching: false,
				variables: ctx.variables,
			})
		},
	}
}

export default new HoudiniClient({
	url,

	// uncomment this to configure the network call (for things like authentication)
	// for more information, please visit here: https://www.houdinigraphql.com/guides/authentication
	// fetchParams({ session }) {
	//     return {
	//         headers: {
	//             Authentication: `Bearer ${session.token}`,
	//         }
	//     }
	// }
	plugins: [simpleFetchPlugin],
})
