const express = require('express');
const router = express.Router();

const {create, allCake, allActiveCake, allInactiveCake, cakeByCategory, cakeById, cakeActive, cakeInactive, cakeDelete, updateCakeImage} = require('../controllers/cakeController');

router.post("/create", create);
router.get("/", allCake);
router.get("/active", allActiveCake);
router.get("/inactive", allInactiveCake);
router.get("/category", cakeByCategory);
router.get("/:id", cakeById);
router.patch("/:id/update", updateCakeImage);
router.patch("/:id/isActive", cakeActive);
router.patch("/:id/isInactive", cakeInactive);
router.delete("/:id/delete", cakeDelete);


module.exports = router;