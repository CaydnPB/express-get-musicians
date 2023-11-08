const { Router } = require("express");
const musiciansRouter = Router();
const { Band, Musician } = require("../models/index")
const { db } = require("../db/connection")

musiciansRouter.get("/", async (req, res) => {
    const everyMusician = await Musician.findAll();
    res.json(everyMusician);
});
  
musiciansRouter.get("/:id", async (req, res) => {
    if (req.params.id > 3) {
        res.status(404);
    }
    const findMusician = await Musician.findByPk(req.params.id);
    res.json(findMusician);
});

musiciansRouter.post("/", async (req, res) => {
    const musician = await Musician.create(req.body);
    const musicians = await Musician.findAll();
    res.json(musicians);
});

musiciansRouter.put("/:id", async (req, res) => {
    const updatedMusician = await Musician.update(req.body, {where: {id: req.params.id}});
    const musicians = await Musician.findAll();
    res.json(musicians);
});

musiciansRouter.delete("/:id", async (req, res) => {
    const deletedMusician = await Musician.destroy({where: {id: req.params.id}});
    const musicians = await Musician.findAll();
    res.json(musicians);
});

module.exports = { musiciansRouter }