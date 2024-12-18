const { Router } = require('express');
const { createAttribute, getAttributes } = require ("../controllers/attribute")

const attributeRouter = Router();

router.get("/", getAttributes)
router.post("/", createAttribute)

module.exports = {attributeRouter};