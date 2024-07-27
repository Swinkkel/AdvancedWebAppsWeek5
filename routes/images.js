const express = require('express');
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/', upload.array('images'), async (req, res) => {
    try {
        const images = req.files.map(file => ({
            buffer: file.buffer,
            mimetype: file.mimetype,
            name: file.originalname,
            encoding: file.encoding
        }));
        const savedImages = await Image.insertMany(images);
        res.json(savedImages);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:imageId', async (req, res) => {
    try {
        const image = await Image.findById(req.params.imageId);
        res.set('Content-Type', image.mimetype);
        res.set('Content-Disposition', 'inline');
        res.send(image.buffer);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
