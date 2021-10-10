import express from 'express'

import { getChapter, getChapters } from '../controllers/chapters.js'

const router = express.Router()

router.get('/', getChapters)
router.get('/:id', getChapter)

export default router
