// Unnecessary commands:
// const { execSync } = require('child_process');
// execSync('npm install');
// execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Band, Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");

describe('./musicians endpoint', () => {
    test("to return expected status code", async () => {
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
    });
    test("to return response that isn't null", async () => {
        const response = await request(app).get("/musicians");
        expect(JSON.parse(response.text)).not.toBeNull();
    });
    test("to return valid JSON data", async () => {
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        expect(responseData[0].name).toEqual("Mick Jagger");
        expect(responseData[1].name).toEqual("Drake");
        expect(responseData[2].name).toEqual("Jimi Hendrix");
    });
    it("to return a single musician for a valid ID", async () => {
        const musicianId = 3;
        const response = await request(app).get(`/musicians/${musicianId}`);
        expect(response.statusCode).toBe(200);
    });
    it("to return a 404 status code for an invalid ID", async () => {
        const nonExistentMusicianId = 999;
        const response = await request(app).get(`/musicians/${nonExistentMusicianId}`);
        expect(response.statusCode).toBe(404);
    });
    it("to create a new musician", async () => {
        const newMusician = {
            name: "John Doe",
            instrument: "Guitar",
        };
        const response = await request(app)
            .post("/musicians")
            .send(newMusician);
        const createdMusician = response.body.find(m => m.name === newMusician.name);
    });
    it("doesn't accept short field lengths", async () => {
        const response = await request(app)
            .post('/musicians')
            .send({
                name: 'J',
                instrument: 'Guitar'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error[0].msg).toBe("Parameters must be between 2 and 20 characters");
    });
    it("doesn't accept long field lengths", async () => {
        const response = await request(app)
            .post('/musicians')
            .send({
                name: 'John Doe',
                instrument: 'ThisIsAReallyLongInstrumentName'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error[0].msg).toBe("Parameters must be between 2 and 20 characters");
    });
    it("doesn't accept short and long field lengths", async () => {
        const response = await request(app)
            .post('/musicians')
            .send({
                name: 'J',
                instrument: 'ThisIsAReallyLongInstrumentName'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveLength(2);
        expect(response.body.error[0].msg).toBe("Parameters must be between 2 and 20 characters");
        expect(response.body.error[1].msg).toBe("Parameters must be between 2 and 20 characters");
    });
    it("doesn't accept long and short field lengths", async () => {
        const response = await request(app)
            .post('/musicians')
            .send({
                name: 'ThisIsAReallyLongMusicianName',
                instrument: 'G'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveLength(2);
        expect(response.body.error[0].msg).toBe("Parameters must be between 2 and 20 characters");
        expect(response.body.error[1].msg).toBe("Parameters must be between 2 and 20 characters");
    });
    it("to update an existing musician", async () => {
        const musicianId = 1;
        const updatedMusicianData = {
          name: 'Updated Name',
          instrument: 'Updated Instrument',
        };
        const response = await request(app)
          .put(`/musicians/${musicianId}`)
          .send(updatedMusicianData);
        const updatedMusician = response.body.find(m => m.id === musicianId);
    });
    it('to delete an existing musician', async () => {
        const musicianId = 1;
        const response = await request(app).delete(`/musicians/${musicianId}`);
        const deletedMusician = response.body.find(m => m.id === musicianId);
    });
});

describe('./bands endpoint', () => {
    test("to return expected status code", async () => {
        const response = await request(app).get("/bands");
        expect(response.statusCode).toBe(200);
    });
    test("to return response that isn't null", async () => {
        const response = await request(app).get("/bands");
        expect(JSON.parse(response.text)).not.toBeNull();
    });
    test("to return valid JSON data", async () => {
        const response = await request(app).get("/bands");
        const responseData = JSON.parse(response.text);
        expect(responseData[0].name).toEqual("The Beatles");
        expect(responseData[1].name).toEqual("Black Pink");
        expect(responseData[2].name).toEqual("Coldplay");
    });
    it("to return a single band for a valid ID", async () => {
        const bandId = 3;
        const response = await request(app).get(`/bands/${bandId}`);
        expect(response.statusCode).toBe(200);
    });
    it("to return a 404 status code for an invalid ID", async () => {
        const nonExistentBandId = 999;
        const response = await request(app).get(`/bands/${nonExistentBandId}`);
        expect(response.statusCode).toBe(404);
    });
    it('to create a new band', async () => {
        const newBand = {
            name: "John Doe",
            instrument: "Guitar",
        };
        const response = await request(app)
            .post("/musicians")
            .send(newBand);
        const createdBand = response.body.find(m => m.name === newBand.name);
    });
    it("to update an existing band", async () => {
        const bandId = 1;
        const updatedBandData = {
          name: 'Updated Name',
          genre: 'Updated Genre',
        };
        const response = await request(app)
          .put(`/bands/${bandId}`)
          .send(updatedBandData);
        const updatedBand = response.body.find(m => m.id === bandId);
    });
    it('to delete an existing band', async () => {
        const bandId = 1;
        const response = await request(app).delete(`/bands/${bandId}`);
        const deletedBand = response.body.find(m => m.id === bandId);
    });
});