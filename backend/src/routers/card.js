const express = require('express');
const cardController = require ("../controllers/card.js")

const router = express.Router();

router.get("/", cardController.getCards)
router.post("/", cardController.createCard)
router.get("/:id", cardController.getCardById)
router.put("/:id", cardController.updateCard)
router.delete("/:id", cardController.deleteCard)

module.exports = router;