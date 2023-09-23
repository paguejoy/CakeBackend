const express = require('express');
const router = express.Router();

const {register, login, allUser, userById} = require('../controllers/userController');

router.get("/", allUser)
router.get("/:id", userById)
router.post("/register", register);
router.post("/login", login);


module.exports = router;