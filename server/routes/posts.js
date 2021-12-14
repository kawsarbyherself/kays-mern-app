const router = require ('express').Router ();

const { getPosts, getPost, createPost, updatePost, likePost, deletePost } = require ('../controllers/posts.js');



router.get('/', getPosts);
//router.route('/').get(getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

module.exports = router; 