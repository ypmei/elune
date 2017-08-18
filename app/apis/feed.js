import { fetch } from '../utils/ApiFetch'
import { typeConfig } from './config'

export function feedApi(store){
  const { typeKey } = store
  const { topic } = typeConfig[typeKey]
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=${topic}`)
}
