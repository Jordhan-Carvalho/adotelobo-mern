const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Animal = require('../../models/Animal');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route GET api/animals
// @desc  get all animals
// @acess Public
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find().sort({ date: -1 });

    res.json(animals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/animals/:id
// @desc  get  animal by id
// @acess Public
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({ msg: 'Animal not found' });
    }

    res.json(animal);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Animal not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route POST api/animals
// @desc  Add animal
// @acess Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('description', 'description is required')
        .not()
        .isEmpty(),
      check('sex', 'sex is required')
        .not()
        .isEmpty(),
      check('image', 'image is required')
        .not()
        .isEmpty(),
      check('type', 'type is required')
        .not()
        .isEmpty(),
      check('age', 'age is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const {
        name,
        image,
        image2,
        image3,
        description,
        type,
        age,
        sex,
        location,
        email,
        tel,
        zap,
      } = req.body;

      const newAnimal = new Animal({
        author: req.user.id,
        authorName: user.name,
        avatar: user.avatar,
        name,
        image,
        image2,
        image3,
        location,
        description,
        type,
        age,
        sex,
        tel,
        email,
        zap,
      });

      const animal = await newAnimal.save();

      res.json(animal);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/animals/:id
// @desc  Delete animal
// @acess Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Remove animal
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({ msg: 'Animal not found' });
    }
    // Check user
    if (animal.author.toString() !== req.user.id) {
      return res.status(401).send('User not authorized');
    }

    await animal.remove();

    res.json({ msg: 'Animal removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Animal not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route PUT api/animals/like/:id
// @desc  Like a post
// @acess Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    // check if the post has already been liked
    if (
      animal.likes.filter(like => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Animal already liked' });
    }

    animal.likes.unshift({ user: req.user.id });

    await animal.save();

    res.json(animal.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/animals/unlike/:id
// @desc  unlike a post
// @acess Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    // check if the post has already been liked
    if (
      animal.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Animal has not yet been liked' });
    }

    // get remove index
    const removeIndex = animal.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    animal.likes.splice(removeIndex, 1);

    await animal.save();

    res.json(animal.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/animals/comment/:animal_id
// @desc  Add comment
// @acess Private
router.post(
  '/comment/:animal_id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const animal = await Animal.findById(req.params.animal_id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id,
      };

      animal.comments.unshift(newComment);
      await animal.save();

      res.json(animal.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/animals/comment/:animal_id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:animal_id/:comment_id', auth, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.animal_id);

    //  Pull out comment
    const comment = animal.comments.find(
      comment => comment.id.toString() === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check current user is comment user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = animal.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    animal.comments.splice(removeIndex, 1);

    await animal.save();

    res.json(animal.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
