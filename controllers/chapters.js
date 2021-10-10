import chaptersData from '../data/chapters.json'

export const getChapters = (req, res) => {
    const chapters = chaptersData

    if (chapters) res.status(200).json({ response: 'success', data: chapters })
    else res.status(404).json({ response: 'error', error: 'chapters not found' })
}

export const getChapter = (req, res) => {
    const { id } = req.params

    const chapter = chaptersData.find(data => data.chapter_id === id)

    const prevChapter = chaptersData.find(data => data.chapter_index === chapter.chapter_index - 1)?.chapter_id || null
    const nextChapter = chaptersData.find(data => data.chapter_index === chapter.chapter_index + 1)?.chapter_id || null

    if (chapter) res.status(200).json({ response: 'success', ...chapter, prev_chapter: prevChapter, next_chapter: nextChapter })
    else res.status(404).json({ response: 'error', error: 'invalid id' })
}
