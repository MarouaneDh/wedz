const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema;

const userSchema = new schema({
    role: {
        type: String,
        require: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false
    },
    partner: {
        type: String,
        required: false
    },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { timestamps: true });
module.exports = User = mongoose.model("User", userSchema);