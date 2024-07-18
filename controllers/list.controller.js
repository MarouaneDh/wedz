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

        let globalNumberOfItems = 0
        let globalNumberOfItemsBought = 0

        const listsWithStats = result.map((list) => {
            let numberOfItems = 0
            let numberOfItemsBought = 0

            list.list.map((el) => numberOfItems = numberOfItems + el.numberOfItems)
            list.list.map((el) => numberOfItemsBought = numberOfItemsBought + el.numberOfItemsBought)

            globalNumberOfItems = globalNumberOfItems + numberOfItems
            globalNumberOfItemsBought = globalNumberOfItemsBought + numberOfItemsBought

            const ratio = numberOfItems > 0 ? (numberOfItemsBought / numberOfItems) : 0;
            const percentage = Math.round(ratio * 100);

            return {
                ...list.toObject(),
                stat: percentage,
            };
        });

        const globalRatio = globalNumberOfItems > 0 ? (globalNumberOfItemsBought / globalNumberOfItems) : 0;
        const globalPercentage = Math.round(globalRatio * 100);

        res.send({
            response: listsWithStats,
            globalstats: globalPercentage,
            message: "Got all lists with success",
        });
    } catch (error) {
        console.log(error)
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

        let numberOfItems = 0
        let numberOfItemsBought = 0

        result.list.map((el) => numberOfItems = numberOfItems + el.numberOfItems)
        result.list.map((el) => numberOfItemsBought = numberOfItemsBought + el.numberOfItemsBought)

        const ratio = numberOfItems > 0 ? (numberOfItemsBought / numberOfItems) : 0;
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