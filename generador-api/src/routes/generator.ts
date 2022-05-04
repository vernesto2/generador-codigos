import { Router } from 'express'
import { GeneratorController } from '../controllers'

const router = Router()

router.post('/columnstable', GeneratorController.GetColumns);
router.post('/tables', GeneratorController.GetTablesName);

export default router