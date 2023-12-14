const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    getReaction,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtsController.js');

router.route('/').get(getThoughts).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.get('/:thoughtId/reactions', getReaction);
router.post('/:thoughtId/reactions', createReaction)
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;