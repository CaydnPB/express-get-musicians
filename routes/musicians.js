const { Router } = require("express");
const musiciansRouter = Router();
const { Band, Musician } = require("../models/index");
const { db } = require("../db/connection");
const { check, validationResult } = require("express-validator");

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

musiciansRouter.post("/", [
    check(["name", "instrument"]).isLength({ min: 2, max: 20 }).withMessage("Parameters must be between 2 and 20 characters")
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }
    else {
        const musician = await Musician.create(req.body);
        const musicians = await Musician.findAll();
        res.json(musicians);
    }
});

musiciansRouter.put("/:id", [
    check(["name", "instrument"]).isLength({ min: 2, max: 20 }).withMessage("Parameters must be between 2 and 20 characters")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
    } else {
        const updatedMusician = await Musician.update(req.body, { where: { id: req.params.id } });
        const musicians = await Musician.findAll();
        res.json(musicians);
    }
});

musiciansRouter.delete("/:id", async (req, res) => {
    const deletedMusician = await Musician.destroy({where: {id: req.params.id}});
    const musicians = await Musician.findAll();
    res.json(musicians);
});

module.exports = { musiciansRouter }