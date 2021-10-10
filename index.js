import express from 'express'
import cors from 'cors'

import chapter from './routes/chapters.js'
import verses from './routes/verses.js'
import exam from './routes/exam.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/chapter', chapter)
app.use('/verses', verses)
app.use('/exam', exam)

app.get('/', (req, res) => {
    res.send('Quran Tadabbur API.')
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
