const sharp = require('sharp');
const AlbumImages = require('../models/AlbumImage');

const uploadImage = async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;

        // Compress the image using sharp
        const compressedBuffer = await sharp(buffer)
            .resize({ width: 800 })
            .jpeg({ quality: 70 })
            .toBuffer();

        const image = new AlbumImages({
            filename: originalname,
            data: compressedBuffer,
            contentType: 'image/jpeg'
        });

        await image.save();

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

const getAllImages = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Set default values for page and limit

    try {
        // Convert page and limit to integers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Calculate the offset for pagination
        const skip = (pageNumber - 1) * limitNumber;

        // Fetch paginated images from the database
        const images = await AlbumImages.find()
            .skip(skip)
            .limit(limitNumber);

        if (!images || images.length === 0) {
            return res.status(404).json({ error: 'Images not found' });
        }

        const modifiedImages = images.map(image => {
            const { _id, filename } = image;
            return {
                _id,
                filename,
                imageUrl: `https://wedzing.adaptable.app/api/album/${_id}`
            };
        });

        // Get total number of images for calculating total pages
        const totalImages = await AlbumImages.countDocuments();
        const totalPages = Math.ceil(totalImages / limitNumber); // Calculate total pages

        // Send response with modified images and pagination info
        res.json({
            page: pageNumber,
            limit: limitNumber,
            totalImages,
            totalPages, // Include total pages in the response
            images: modifiedImages
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image', details: error.message });
    }
}

module.exports = {
    uploadImage,
    getImage,
    getAllImages
}
