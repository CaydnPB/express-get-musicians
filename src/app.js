const express = require("express");
const app = express();
const { Band, Musician } = require("../models/index")
const { db } = require("../db/connection")
const { musiciansRouter } = require("../routes/musicians");
const { bandsRouter } = require("../routes/bands");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/musicians", musiciansRouter)
app.use("/bands", bandsRouter)

// Old Musicians Handlers Replaced by Express Router:
// app.get("/musicians", async (req, res) => {
//     const everyMusician = await Musician.findAll();
//     res.json(everyMusician);
// });
  
// app.get("/musicians/:id", async (req, res) => {
//     if (req.params.id > 3) {
//         res.status(404);
//     }
//     const findMusician = await Musician.findByPk(req.params.id);
//     res.json(findMusician);
// });

// app.post("/musicians", async (req, res) => {
//     const musician = await Musician.create(req.body);
//     const musicians = await Musician.findAll();
//     res.json(musicians);
// });

// app.put("/musicians/:id", async (req, res) => {
//     const updatedMusician = await Musician.update(req.body, {where: {id: req.params.id}});
//     const musicians = await Musician.findAll();
//     res.json(musicians);
// });

// app.delete("/musicians/:id", async (req, res) => {
//     const deletedMusician = await Musician.destroy({where: {id: req.params.id}});
//     const musicians = await Musician.findAll();
//     res.json(musicians);
// });  

// Old Bands Handlers Replaced by Express Router:
// app.get("/bands", async (req, res) => {
//     const everyBand = await Band.findAll();
//     res.json(everyBand);
// });

// app.get("/bands/:id", async (req, res) => {
//     if (req.params.id > 3) {
//         res.status(404);
//     }
//     const findBand = await Band.findByPk(req.params.id);
//     res.json(findBand);
// });

// app.post("/bands", async (req, res) => {
//     const band = await Band.create(req.body);
//     const bands = await Band.findAll();
//     res.json(bands);
// });

// app.put("/bands/:id", async (req, res) => {
//     const updatedBand = await Band.update(req.body, {where: {id: req.params.id}});
//     const bands = await Band.findAll();
//     res.json(bands);
// });

// app.delete("/bands/:id", async (req, res) => {
//     const updatedBand = await Band.destroy({where: {id: req.params.id}});
//     const bands = await Band.findAll();
//     res.json(bands);
// });

module.exports = app;