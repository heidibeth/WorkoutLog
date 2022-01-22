const Express = require('express');
const router = Express.Router();
const validateJWT = require('../middleware/validate-jwt');
const { WorkoutModel } = require('../models');

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey! This is a practice route!')
});

router.post('/create', validateJWT, async (req, res) => {
    const { descriptions, definitions, results } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        descriptions,
        definitions,
        results,
        owner: id
    }
    try {
        const newLog = await WorkoutModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err});
    }

});

router.get('/', async (req, res) => {
    try {
        const entries = await WorkoutModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/mine', validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userLogs = await WorkoutModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const results = await WorkoutModel.findAll({
            where: { id: id }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put('/update/:entryId', validateJWT, async (req, res) => {
    const { descriptions, definitions, results } = req.body.log;
    const workoutId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: workoutId,
            owner: userId
        }
    };

    const updatedWorkout = {
        descriptions: descriptions,
        definitions: definitions,
        results: results
    };

    try {
        const update = await WorkoutModel.update(updatedWorkout, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const workoutId = req.params.id;

    try {
        const query = {
            where: {
                id: workoutId,
                owner: ownerId
            }
        };

        await WorkoutModel.destroy(query);
        res.status(200).json({ message: 'Workout Entry Removed' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

router.get('/about', (req, res) => {
    res.send('Not too much to talk about')
});

module.exports = router;






// /*

//     Log Create

// */
// router.post('/create', validateJWT, async (req, res) => {
//     const { title, date, entry } = req.body.journal;
//     const { id } = req.user;
//     const journalEntry = {
//         title,
//         date,
//         entry,
//         owner: id
//     }
//     try {
//         const newJournal = await JournalModel.create(journalEntry);
//         res.status(200).json(newJournal);
//     } catch (err) {
//         res.status(500).json({ error: err});
//     }

// });

// /*
//     Get All Journals
// */
// router.get('/', async (req, res) => {
//     try {
//         const entries = await JournalModel.findAll();
//         res.status(200).json(entries);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// /*
//     Get Journals by User
// */
// router.get('/mine', validateJWT, async (req, res) => {
//     let { id } = req.user;
//     try {
//         const userJournals = await JournalModel.findAll({
//             where: {
//                 owner: id
//             }
//         });
//         res.status(200).json(userJournals);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: err });
//     }
// });

// /*
//     Get Journals By Title
// */
// router.get('/:title', async (req, res) => {
//     const { title } = req.params;
//     try {
//         const results = await JournalModel.findAll({
//             where: { title: title }
//         });
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// router.get('/about', (req, res) => {
//     res.send('This is the about route!')
// });

// /*
//     Update a Journal
// */
// router.put('/update/:entryId', validateJWT, async (req, res) => {
//     const { title, date, entry } = req.body.journal;
//     const journalId = req.params.entryId;
//     const userId = req.user.id;

//     const query = {
//         where: {
//             id: journalId,
//             owner: userId
//         }
//     };

//     const updatedJournal = {
//         title: title,
//         date: date,
//         entry: entry
//     };

//     try {
//         const update = await JournalModel.update(updatedJournal, query);
//         res.status(200).json(update);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// /*
//     Delete a Journal
// */
// router.delete('/delete/:id', validateJWT, async (req, res) => {
//     const ownerId = req.user.id;
//     const journalId = req.params.id;

//     try {
//         const query = {
//             where: {
//                 id: journalId,
//                 owner: ownerId
//             }
//         };

//         await JournalModel.destroy(query);
//         res.status(200).json({ message: 'Journal Entry Removed' });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// })

// module.exports = router;