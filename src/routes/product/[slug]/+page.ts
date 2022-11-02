import type { GetProductDetailVariables as V } from './$houdini'

export const GetProductDetailVariables: V = async event => {
  return {
    slug: event.params.slug,
  }
}
