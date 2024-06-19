const mongoose = require("mongoose");

const schema = mongoose.Schema;

const subListSchema = new mongoose.Schema({
    item: String,
    isBought: Boolean,
    addedBy: String,
    imageURLs: [String],
    numberOfItems: Number,
    numberOfItemsBought: Number,
});

const listSchema = new schema({
    listCategory: {
        type: String,
        required: true,
    },
    listName: {
        type: String,
        required: true,
    },
    list: {
        type: [subListSchema],
        required: false,
    },
    couple: {
        type: Array,
        required: true,
    },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { timestamps: true });

module.exports = List = mongoose.model("list", listSchema);
