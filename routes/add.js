const { Router } = require("express");
const carModel = require("../models/carModel");
const router = Router();

router.get("/", (req, res) => {
    res.render("create", {isAdd: true});
});

router.post("/", async (req, res) => {
    const cars = new carModel(req.body.title, req.body.price, req.body.description, req.body.image);
    await cars.save();
    res.redirect("/cars")
})

module.exports = router;





