const { Song } = require('../models');
const { Op } = require('sequelize');

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

const getSongs = async (req, res) => {
  try {
    const { title, artist, genre, releaseYear } = req.query;

    const filters = {};

    if (title) filters.title = { [Op.iLike]: `%${title}%` };
    if (artist) filters.artist = { [Op.iLike]: `%${artist}%` };
    if (genre) filters.genre = { [Op.iLike]: `%${genre}%` };
    if (releaseYear) filters.releaseYear = releaseYear;

    const songs = await Song.findAll({ where: filters });

    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = { uploadSong , getSongs };
