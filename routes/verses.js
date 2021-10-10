import express from 'express'

import { getVerses } from '../controllers/verses.js'

const router = express.Router()

router.get('/:id', getVerses)

export default router
