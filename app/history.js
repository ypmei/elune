import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router'

const history = useRouterHistory(createHashHistory)({queryKey: false})

export default history
