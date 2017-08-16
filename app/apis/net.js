import { fetch } from '../utils/ApiFetch'
import { parseToChart } from './parse/parseToChart'

export function feedBytout(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_bytout_rank`)
}

export function feedBytin(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_bytin_rank`)
}

export function feedBytoutChart(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_bytout_rank`).then((data)=>{
    return {data: parseToChart(data)}
  })
}

export function feedBytinChart(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_bytin_rank`).then((data)=>{
    return {data: parseToChart(data)}
  })
}
