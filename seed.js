const { Musician, Band } = require("./models/index")
const { db } = require("./db/connection");
const { seedMusician, seedBand } = require("./seedData");

const syncSeed = async () => {
    await db.sync({force: true});
    seedMusician.map(musician => Musician.create(musician));
    seedBand.map(band => Band.create(band));

    const newBand = await Band.findByPk(1);
    const allMusicians = await Musician.findAll();
    await newBand.setMusicians(allMusicians);
}

syncSeed();