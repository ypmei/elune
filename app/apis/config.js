const typeConfig = {
  disk: {
    topic: 'tsar_partition_util_rank'
  },
  diskIO: {
    topic: 'tsar_io_util_rank'
  },
  jvmGc: {
    topic: 'jvm_monitor_gc_rank'
  },
  oldMem: {
    topic: 'jvm_monitor_oldmemory_rank'
  },
  memory: {
    topic: 'tsar_mem_util_rank'
  },
  sysLoad: {
    topic: 'tsar_load_rank'
  },
  bytin: {
    topic: 'tsar_bytin_rank'
  },
  bytout: {
    topic: 'tsar_bytout_rank'
  },
  tcpAtmpFail: {
    topic: 'tsar_tcp_AtmpFail_rank'
  },
  tcpCurrEstab: {
    topic: 'tsar_tcp_CurrEstab_rank'
  },
  tcpReset: {
    topic: 'tsar_tcp_EstReset_rank'
  },
  tcpRetran: {
    topic: 'tsar_tcp_retran_rank'
  }
}

export { typeConfig }
