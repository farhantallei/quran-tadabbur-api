import quranData from '../data/quran.json'

export const getVerses = (req, res) => {
    const { id } = req.params

    const chapter = quranData[parseInt(id) - 1]

    if (chapter) res.status(200).json({ response: 'success', ...chapter })
    else res.status(404).json({ response: 'error', error: 'invalid id' })
}
