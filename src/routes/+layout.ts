import {
  load_GetCollections,
  load_GetCurrencyCode,
  load_GetTopSellers,
} from '$houdini'
import '../app.css'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async event => {
  return {
    key: event.url.pathname,
    ...(await load_GetTopSellers({ event })),
    ...(await load_GetCurrencyCode({ event })),
    ...(await load_GetCollections({ event })),
  }
}
