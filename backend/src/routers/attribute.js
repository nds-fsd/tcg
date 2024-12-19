const { Router } = require('express');
const { createAttribute, getAttributes, updateAttribute, deleteAttribute } = require ("../controllers/attribute")

const attributeRouter = Router();

attributeRouter.get("/", getAttributes)
attributeRouter.post("/", createAttribute)
attributeRouter.put("/:id", updateAttribute)
attributeRouter.delete("/:id", deleteAttribute)

module.exports = {attributeRouter};