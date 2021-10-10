import quranData from '../data/quran.json'

export const getLevel = (req, res) => {
    const { id, ruku, level } = req.params

    const currentLevel = parseInt(level)
    const chapter = quranData.find(data => data.chapter_id === id)

    if (chapter) {
        const verses = chapter.chapter_verses[parseInt(ruku) - 1]

        if (verses) {
            const groupedVerses = {}
            
            for (const v of verses) {
                const level = Math.max(...v.verses.map(w => w.level))
                if (groupedVerses[level] == null) groupedVerses[level] = []
                groupedVerses[level].push(v.verse_index)
            }

            const versesIndices = groupedVerses[currentLevel]
            const totalVerses = versesIndices.length

            const versesByLevel = verses.filter(v => {
                const w = v.verses.filter(w => w.level === currentLevel)

                if (w.length) return { ...v, verses: w }
            })

            const questions = versesByLevel.flatMap(v => {
                const verse = v.verses.filter(w => w.level === currentLevel)
                const verseIndex = v.verse_index

                const modifiedVerse = verse.map(v => ({ verse_index: verseIndex, ...v }))

                return modifiedVerse
            })

            const fullVerseQuestion = versesByLevel.filter(v => Math.max(...v.verses.map(w => w.level)) === currentLevel).map(v => v.verses)

            if (versesByLevel.length) {
                const reading = questions.map(ques => {
                    const correctAnswer = ques.translation
                    const answers = ques.options
                    
                    if (answers.length < 4)
                        answers.push(correctAnswer)

                    const modifiedAnswer = answers.map(ans => {
                        if (ans === ques.translation)
                            return { answer: ans, correct: true, selected: false }
                        else
                            return { answer: ans, correct: false, selected: false }
                    })

                    answers.sort(() => Math.random() - .5)

                    return { question: ques.arabic, answers: modifiedAnswer }
                })

                const arrangeLetters = questions.map(ques => {
                    const answer = ques.arabic
                    const letters = ques.arabic.match(/[\u0627-\u064A][\u06E4]|[\u0671][\u0644]([\u06E1]|[\u064B-\u0670][\u064B-\u0670])?|[\u0644][\u064E][\u0627]|\W[\u08F0-\u08F2][\u0649]|\W[\u064E][\u0648][\u0670]|\W[\u0651][\u064E][\u0627]|\W[\u0650][\u064A][\u0651][\u064E][\u0627]|\W[\u0651][\u0650][\u064A]|\W[\u0650][\u064A]|\W[\u064F][\u0648]|\W([\u06E1]|[\u064B-\u0670][\u064B-\u0670]|[\u064B-\u0670])|\W/g)

                    letters.sort(() => Math.random() - .5)

                    return { question: ques.translation, answer, letters }
                })

                const listening = questions.map(ques => {
                    const correctAnswer = ques.translation
                    const answers = ques.options
                    
                    if (answers.length < 4)
                        answers.push(correctAnswer)

                    const modifiedAnswer = answers.map(ans => {
                        if (ans === ques.translation)
                            return { answer: ans, correct: true, selected: false }
                        else
                            return { answer: ans, correct: false, selected: false }
                    })

                    answers.sort(() => Math.random() - .5)

                    return { question: ques.arabic, answers: modifiedAnswer }
                })

                const speaking = questions.map(ques => ques.arabic)
                
                if (fullVerseQuestion.length) {
    
                    const writing = fullVerseQuestion.map(v => {
                        const arabic = v.map(ques => `${ques.arabic}`).join(' ')
                        const translation = v.map(ques => `${ques.translation}`).join(' ')
    
                        return { arabic, translation }
                    })
    
                    const finishing = fullVerseQuestion.map(v => v.map(ques => `${ques.arabic}`).join(' '))
    
                    const exam = { reading, arrange_letters: arrangeLetters, listening, speaking, writing, finishing }
    
                    res.status(200).json({ response: 'success', total_verses: totalVerses, verses_indices: versesIndices, review: questions, exam })
                } else {
                    const exam = { reading, arrange_letters: arrangeLetters, listening, speaking }
    
                    res.status(200).json({ response: 'success', total_verses: totalVerses, verses_indices: versesIndices, review: questions, exam })
                }
            } else res.status(404).json({ response: 'error', error: 'level no data' })
        } else res.status(404).json({ response: 'error', error: 'ruku has no data' })
    } else res.status(404).json({ response: 'error', error: 'invalid id' })
}
