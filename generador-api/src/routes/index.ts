import { Router } from 'express'
import columnsTable from './generator'

const routes  = Router()

routes.use('/generator', columnsTable)

export default routes