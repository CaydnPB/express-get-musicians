const { Router } = require("express");
const bandsRouter = Router();
const { Band, Musician } = require("../models/index")
const { db } = require("../db/connection")

bandsRouter.get("/", async (req, res) => {
    const everyBand = await Band.findAll();
    res.json(everyBand);
});

bandsRouter.get("/:id", async (req, res) => {
    if (req.params.id > 3) {
        res.status(404);
    }
    const findBand = await Band.findByPk(req.params.id);
    res.json(findBand);
});

bandsRouter.post("/", async (req, res) => {
    const band = await Band.create(req.body);
    const bands = await Band.findAll();
    res.json(bands);
});

bandsRouter.put("/:id", async (req, res) => {
    const updatedBand = await Band.update(req.body, {where: {id: req.params.id}});
    const bands = await Band.findAll();
    res.json(bands);
});

bandsRouter.delete("/:id", async (req, res) => {
    const updatedBand = await Band.destroy({where: {id: req.params.id}});
    const bands = await Band.findAll();
    res.json(bands);
});

module.exports = { bandsRouter }