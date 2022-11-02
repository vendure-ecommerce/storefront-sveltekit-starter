import type { PageLoad } from './$types'

export const load: PageLoad = async event => {
  const { slug } = event.params
  const variables = { slug }

  // await GQL_GetProductDetail.fetch({ event, variables })

  return { variables }
}
