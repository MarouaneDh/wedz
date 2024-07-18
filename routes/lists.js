/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       required:
 *         - listCategory
 *         - listName
 *         - couple
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the list
 *         listCategory:
 *           type: string
 *           description: The category of your list
 *         listName:
 *           type: string
 *           description: The list name
 *         list:
 *           type: array
 *           description: The array of the actual list
 *       example:
 *         listCategory: bathroom
 *         listName: Bathroom
 *         list:
 *           - item: Towels
 *             isBought: true
 *             addedBy: 65bd076f828f42b463067bbf
 *             numberOfItems: 10
 *             numberOfItemsBought: 6
 *             imageURLs:
 *               - https://wedz.adaptable.app/api/upload/666bf6ccbcaef4c07646ab0a
 *               - https://wedz.adaptable.app/api/upload/666bf6ccbcaef4c07646ab0a
 *           - item: Bath robes
 *             isBought: false
 *             addedBy: 65bd076f828f42b463067bbf
 *             numberOfItems: 2
 *             numberOfItemsBought: 2
 *             imageURLs:
 *               - https://wedz.adaptable.app/api/upload/666bf6ccbcaef4c07646ab0a
 *           - item: Bins for clothes
 *             isBought: false
 *             addedBy: 65bd076f828f42b463067bbf
 *             numberOfItems: 3
 *             numberOfItemsBought: 2
 *             imageURLs:
 *               - https://wedz.adaptable.app/api/upload/666bf6ccbcaef4c07646ab0a
 *               - https://wedz.adaptable.app/api/upload/666bf6ccbcaef4c07646ab0a
 *               - https://wedz.adaptable.app/api/upload/666bf6ccbcaef4c07646ab0a
 *           - item: Plastic tubs
 *             isBought: false
 *             addedBy: 65bd076f828f42b463067bbf
 *             numberOfItems: 2
 *             numberOfItemsBought: 2
 *             imageURLs:
 *               - https://wedz.adaptable.app/api/upload/666bf6ccbcaef4c07646ab0a
 *         couple:
 *           - 65bd076f828f42b463067bbf
 *           - 65bd075c828f42b463067bbc
 *     ListFilter:
 *       type: object
 *       properties:
 *         isBought:
 *           type: boolean
 *           description: value of isBought
 *       example:
 *         isBought: true
 */

/**
 * @swagger
 * tags:
 *   name: Lists
 *   description: The lists managing API
 * /api/list:
 *   post:
 *     summary: Create a new list
 *     tags: [Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/List'
 *     responses:
 *       200:
 *         description: The list was created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/List'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Get all lists
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: The list of lists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/List'
 *       500:
 *         description: Some server error
 * /api/list/{id}:
 *   post:
 *     summary: Get one list
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The list id
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListFilter'
 *     responses:
 *       200:
 *         description: The list of lists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/List'
 *       404:
 *        description: The list was not found
 *       500:
 *         description: Some server error
 *   patch:
 *     summary: edit one list
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The list id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/List'
 *     responses:
 *       200:
 *         description: The list was updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/List'
 *       404:
 *        description: The list was not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete the list by id
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The list id
 *
 *     responses:
 *       200:
 *         description: The list was deleted
 *       404:
 *         description: The list was not found
 *
 */

const express = require("express");
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const { createList, getAllLists, getOneList, updateList, deleteList } = require('../controllers/list.controller');

// POST
// List posting
// PATH: http://localhost:3000/api/list/
// Params Body
router.post("/", isAuth, createList);

// GET
// Getting all lists
// PATH: http://localhost:3000/api/list/
router.get("/", isAuth, getAllLists);

// POST
// Getting list by id
// PATH: http://localhost:3000/api/list/:id
// Params id
router.post("/:id", isAuth, getOneList);

// PATCH
// Updating a list by id
// PATH: http://localhost:3000/api/list/:id
// Params id body
router.patch("/:id", isAuth, updateList);

// DELETE
// Deleting a list by id
// PATH: http://localhost:3000/api/list/:id
// Params id
router.delete("/:id", isAuth, deleteList);

module.exports = router;
