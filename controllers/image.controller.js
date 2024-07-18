const Images = require('../models/Images');
const List = require('../models/List'); // Ensure you import your List model

const uploadImage = async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;
        const { listId, itemId } = req.body; // Assuming these are sent in the body

        const image = new Images({
            filename: originalname,
            data: buffer,
            contentType: mimetype
        });

        await image.save();

        // Construct the image URL
        const imageUrl = `https://wedz.adaptable.app/api/upload/${image._id}`;

        // Update the specific list item with the image URL
        if (listId && itemId) {
            const list = await List.findById(listId);
            if (list) {
                const item = list.list.id(itemId);
                if (item) {
                    item.imageURLs.push(imageUrl);
                    await list.save();
                }
            }
        }

        res.json({ message: 'Image uploaded successfully', imageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image', details: error.message });
    }
};

const getImage = async (req, res) => {
    try {
        const image = await Images.findById(req.params.id);

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
