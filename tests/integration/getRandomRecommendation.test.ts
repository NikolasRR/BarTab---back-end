import supertest from "supertest";
import "dotenv/config";
import { faker } from "@faker-js/faker";

import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

beforeAll(async () => {
    await prisma.recommendation.createMany({
        data:[
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 10
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 58
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 30
            }
        ]
    });
})

describe('get /recommendations/random', () => {
    afterEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE`;
    });


    it('get request should return a random recommendation', async () => {
        const response = await supertest(app)
            .get('/recommendations/random');

        expect(response.body.id).not.toBeNull();
        expect(response.body.name).not.toBeNull();
        expect(response.body.youtubeLink).not.toBeNull();
        expect(response.body.score).not.toBeNull();
    });


    it('get request should 404 if there are no recommendations', async () => {
        const response = await supertest(app)
            .get('/recommendations/random');

        expect(response.statusCode).toBe(404);
    });
})