import { fetch } from '../utils/ApiFetch'
import { parseToChart } from './parse/parseToChart'

export function feedDisk(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_partition_util_rank`)
}

export function feedDiskIO(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_io_util_rank`)
}

export function feedDiskChart(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_partition_util_rank`).then((data)=>{
    return {data: parseToChart(data)}
  })
}

export function feedDiskIOChart(){
  return fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_io_util_rank`).then((data)=>{
    return {data: parseToChart(data)}
  })
}
