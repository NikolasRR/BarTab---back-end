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
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
            },
        ]
    });
});

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE`;
});

describe('get /recommendations', () => {
    it('get request should return 10 itens', async () => {
        const response = await supertest(app)
            .get('/recommendations');
        expect(response.body.length).toBe(10);
    });


    it('get request should return with correct body format', async () => {
        const response = await supertest(app)
            .get('/recommendations');
        expect(response.body[0].id).not.toBeNull();
        expect(response.body[0].name).not.toBeNull();
        expect(response.body[0].youtubeLink).not.toBeNull();
        expect(response.body[0].score).not.toBeNull();
    });


    it('get request should return 10 last itens', async () => {
        const response = await supertest(app)
            .get('/recommendations');

        let passed = true;
        for (let i = 0; i < response.body.length; i++) {
            if (response.body[i].id + i !== 10) {
                passed = false;
                break;
            }
        }
       
        expect(passed).toBeTruthy();
    });
})