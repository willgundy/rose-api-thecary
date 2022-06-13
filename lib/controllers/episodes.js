const { Router } = require('express');
const Episode = require('../models/Episode');

module.exports = Router()
    .get('/', async (req, res) => {
        const episodeList = await Episode.getAll();
        res.json(episodeList);
    });
