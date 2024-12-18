const { Router } = require('express');
const { createAttribute, getAttributes } = require ("../controllers/attribute")

const attributeRouter = Router();

attributeRouter.get("/", getAttributes)
attributeRouter.post("/", createAttribute)

module.exports = {attributeRouter};