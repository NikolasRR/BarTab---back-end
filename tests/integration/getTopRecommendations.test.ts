import supertest from "supertest";
import "dotenv/config";
import { faker } from "@faker-js/faker";

import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

beforeAll(async () => {
    await prisma.recommendation.createMany({
        data: [
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 239
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 123
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 25
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 67
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 98
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 37
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 27
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 48
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 96
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 39
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
                score: 168
            }
        ]
    });
});

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE`;
});

describe('get /recommendations/top/:amount', () => {
    it('get request should return correct amount', async () => {
        const amount = faker.datatype.number({max: 10});
        const response = await supertest(app)
            .get(`/recommendations/top/${amount}`);
        expect(response.body.length).toBe(amount);
    });

    it('get request should return the top scorers',async () => {
        const amount = faker.datatype.number({max: 10});
        const response = await supertest(app)
            .get(`/recommendations/top/${amount}`);

        const topScorerers = await prisma.recommendation.findMany({
            orderBy: { score: "desc" },
            take: amount,
        });

        expect(response.body.length).toBe(amount);
        expect(response.body).toEqual(topScorerers);
    })
})