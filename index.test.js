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
        const response = await request(app).get(`/musicians/${bandId}`);
        expect(response.statusCode).toBe(200);
    });
    it("to return a 404 status code for an invalid ID", async () => {
        const nonExistentBandId = 999;
        const response = await request(app).get(`/musicians/${nonExistentBandId}`);
        expect(response.statusCode).toBe(404);
    });
});