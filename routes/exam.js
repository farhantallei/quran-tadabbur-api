import express from 'express'

import { getLevel } from '../controllers/exam.js'

const router = express.Router()

router.get('/:id/:ruku/:level', getLevel)

export default router
