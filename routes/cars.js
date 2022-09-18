const { Router } = require("express");
const carModel = require("../models/carModel");
const router = Router();

router.get("/", async (req, res) => {
    const cars = await carModel.getAll();
    res.render("cars", {isCars: true, cars});
});

router.get("/:id/edit", async (req, res) => {
    if(!req.query.allow) {
        return res.redirect("/");
    }
    const tesla = await carModel.getById(req.params.id);
    res.render("carEdit", {
        title: `Edit ${tesla.title}`,
        tesla,
    })
});

router.post("/edit", async (req, res) => {
    await carModel.update(req.body)
    res.redirect("/cars")
})

router.get("/:id", async (req, res) => {
    const tesla = await carModel.getById(req.params.id);
    res.render("tesla", {
        layouts: "detail",
        title: `carModel ${tesla.title}`, 
        tesla
    })
})

module.exports = router;











