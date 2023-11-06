const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

app.get("/musicians", async (req, res) => {
    const findMusician = await Musician.findAll();
    res.json(findMusician);
});

app.get("/musicians/1", async (req, res) => {
    const findMusician = await Musician.findOne({ where: { id: 1 } });
    res.json(findMusician);
});

app.get("/musicians/2", async (req, res) => {
    const findMusician = await Musician.findOne({ where: { id: 2 } });
    res.json(findMusician);
});

app.get("/musicians/3", async (req, res) => {
    const findMusician = await Musician.findOne({ where: { id: 3 } });
    res.json(findMusician);
});

module.exports = app;