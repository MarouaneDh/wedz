const jwt = require("jsonwebtoken");
const List = require('../models/List')

const createList = async (req, res) => {
    try {
        const list = new List(req.body);
        await list.save();
        res.status(201).send({ msg: "List created with success", list });
    } catch (error) {
        res.status(400).send({ message: "Not able to create list" });
    }
};

const getAllLists = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, process.env.secret);

        const result = await List.find({
            "couple": { $elemMatch: { $regex: new RegExp(decoded._id, 'i') } }
        })
            .select("-__v")
            .sort({ createdAt: -1 });

        // Add the "stat" key to each list object as a rounded percentage
        const listsWithStats = result.map((list) => {
            const totalItems = list.list.length;
            const boughtItems = list.list.filter(item => item.isBought).length;
            const ratio = totalItems > 0 ? (boughtItems / totalItems) : 0;
            const percentage = Math.round(ratio * 100);

            return {
                ...list.toObject(),
                stat: percentage,
            };
        });

        res.send({
            response: listsWithStats,
            message: "Got all lists with success",
        });
    } catch (error) {
        res.status(400).send({ message: "Can't get lists" });
    }
};

const getOneList = async (req, res) => {
    const _id = req.params.id;
    const filter = req.body;

    try {
        let result;

        if (Object.keys(filter).length === 0) {
            result = await List.findOne({ _id }).select("-__v");
        } else {
            result = await List.findOne({ _id }).select("-__v");

            if (result) {
                result.list = result.list.filter(item => item.isBought === filter.isBought);
            }
        }

        const totalItems = result.list.length;
        const boughtItems = result.list.filter(item => item.isBought).length;
        const ratio = totalItems > 0 ? (boughtItems / totalItems) : 0;
        const percentage = Math.round(ratio * 100);

        const listWithStats = {
            ...result.toObject(),
            stat: percentage,
        };

        res.send({ response: listWithStats, message: `Got list with success` });
    } catch (error) {
        res.status(400).send({ message: "There is no list with this id" });
    }
};


const updateList = async (req, res) => {
    const _id = req.params.id;

    try {
        const list = await List.findById(_id);

        if (!list) {
            return res.status(404).send({ message: "List not found" });
        }

        Object.assign(list, req.body);

        await list.save();

        res.status(200).send({ message: `${list.listName} was updated successfully`, list });
    } catch (error) {
        res.status(400).send({ message: "Unable to update list" });
    }
};

const deleteList = async (req, res) => {
    const _id = req.params.id

    try {
        const result = await List.deleteOne({ _id });

        result.deletedCount === 1
            ? res.status(200).send({ message: "List was deleted successfully" })
            : res.status(404).send({ message: "There is no list with this ID" })

    } catch (error) {
        res.send("List wasn't deleted");
    }
};

module.exports = {
    createList,
    getAllLists,
    getOneList,
    updateList,
    deleteList
}