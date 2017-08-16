import { fetch } from '../utils/ApiFetch'
import { parseToChart } from './parse/parseToChart'

export function feedMem(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_mem_util_rank`)
}

export function feedLoad(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_load_rank`)
}

export function feedMemChart(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_mem_util_rank`).then((data)=>{
    return {data: parseToChart(data)}
  })
}

export function feedLoadChart(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_load_rank`).then((data)=>{
    return {data: parseToChart(data)}
  })
}
