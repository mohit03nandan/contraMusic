const { Song } = require('../models');

const uploadSong = async (req, res) => {
  try {
    const { title, artist, album, genre, releaseYear } = req.body;
    const fileUrl = req.file.path; // Cloudinary gives `path` as secure URL

    const song = await Song.create({
      title,
      artist,
      album,
      genre,
      releaseYear,
      fileUrl,
    });

    res.status(201).json({ message: 'Song uploaded to Cloudinary', song });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadSong };
