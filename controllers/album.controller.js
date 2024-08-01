const sharp = require('sharp');
const AlbumImages = require('../models/AlbumImage');

const uploadImage = async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;

        // Compress the image using sharp
        const compressedBuffer = await sharp(buffer)
            .resize({ width: 800 }) // Resize the image to a width of 800px, maintaining aspect ratio
            .jpeg({ quality: 70 }) // Convert to JPEG format with 70% quality
            .toBuffer();

        const image = new AlbumImages({
            filename: originalname,
            data: compressedBuffer,
            contentType: 'image/jpeg'
        });

        await image.save();

        // Construct the image URL
        const imageUrl = `https://wedzing.adaptable.app/api/album/${image._id}`;

        res.json({ message: 'Image uploaded successfully', imageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image', details: error.message });
    }
};

const getImage = async (req, res) => {
    try {
        const image = await AlbumImages.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.set('Content-Type', image.contentType);
        res.send(image.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image', details: error.message });
    }
}

module.exports = {
    uploadImage,
    getImage
}
