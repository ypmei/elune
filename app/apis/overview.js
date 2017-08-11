import { fetch } from '../utils/ApiFetch'

/**
 * 磁盘,磁盘IO
 */

var feedDisk = () => fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_partition_util_rank`)

var feedDiskIO = () => fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_io_util_rank`)

var feedMem = () => fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_mem_util_rank`)

var feedLoad = () => fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_load_rank`)

var feedBytout = () => fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_bytout_rank`)

var feedBytin = () => fetch(`${YPMEI.urlPrefix}/feed.do?topic=tsar_bytin_rank`)

export {
  feedDisk,
  feedDiskIO,
  feedMem,
  feedLoad,
  feedBytout,
  feedBytin
}
