const mongoose = require("mongoose");

const schema = mongoose.Schema;

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
        type: Array,
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
