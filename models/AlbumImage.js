const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumImageSchema = new Schema({
    filename: { type: String, required: true },
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true }
});

module.exports = mongoose.model('AlbumImage', AlbumImageSchema);