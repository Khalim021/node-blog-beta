const { Router } = require("express");
const Card = require("../models/cardModel");
const carModel = require("../models/carModel");
const router = Router();

router.post("/add", async (req, res) => {
    const tesla = await carModel.getById(req.body.id);
    await Card.add(tesla);
    res.redirect("/card");
});

router.delete("/remove/:id", async (req, res) => {
    const card = await Card.remove(req.params.id);
    res.status(200).send(card);
})


router.get("/", async (req, res) => {
    const card = await Card.fetch();
    res.render("card", {
        title: "Basket",
        isCard: true,
        teslaX: card.teslaX,
        price: card.price,
    });
});

module.exports = router;








