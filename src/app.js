const express = require("express");
const app = express();
const { Band, Musician } = require("../models/index")
const { db } = require("../db/connection")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/musicians", async (req, res) => {
    const everyMusician = await Musician.findAll();
    res.json(everyMusician);
});
  
app.get("/musicians/:id", async (req, res) => {
    if (req.params.id > 3) {
        res.status(404);
    }
    const findMusician = await Musician.findByPk(req.params.id);
    res.json(findMusician);
}); 

app.get("/bands", async (req, res) => {
    const everyBand = await Band.findAll();
    res.json(everyBand);
});

app.get("/bands/:id", async (req, res) => {
    if (req.params.id > 3) {
        res.status(404);
    }
    const findBand = await Band.findByPk(req.params.id);
    res.json(findBand);
});

module.exports = app;