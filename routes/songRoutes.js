const express = require('express');
const { uploadSong } = require('../controllers/songController');
const {getSongs} = require('../controllers/songController')
const upload = require('../middlewares/songUploader');

const router = express.Router();

router.post('/upload', upload.single('song'), uploadSong);
router.get('/', getSongs);


module.exports = router;
