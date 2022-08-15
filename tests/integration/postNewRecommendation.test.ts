import supertest from "supertest";
import "dotenv/config";
import { faker } from "@faker-js/faker";

import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

beforeAll(async () => {
    await prisma.recommendation.create({
        data: {
            name: 'alguma musica',
            youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`
        }
    })
})

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE`;
});

describe('post /recommendations', () => {
    it('given name and youtube link it should succeed and persist recommendation', async () => {
        const recommendation = {
            name: faker.music.songName(),
            youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`
        };

        const response = await supertest(app)
            .post('/recommendations')
            .send(recommendation);
        expect(response.statusCode).toBe(201);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { name: recommendation.name } });
        expect(persisted).not.toBeNull();
    });


    it('given alredy registered song name, should fail and not create', async () => {
        const recommendation = {
            name: 'alguma musica',
            youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`
        };

        const response = await supertest(app)
            .post('/recommendations')
            .send(recommendation);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { youtubeLink: recommendation.youtubeLink } });

        expect(response.statusCode).toBe(409);
        expect(persisted).toBeNull();
    });


    it('given no name and youtube link it should not succeed and persist recommendation', async () => {
        const recommendation = {
            name: '',
            youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
        }

        const response = await supertest(app)
            .post('/recommendations')
            .send(recommendation);
        expect(response.statusCode).not.toBe(201);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { name: recommendation.name } });
        expect(persisted).toBeNull();
    });


    it('given name and no link it should not succeed and persist recommendation', async () => {
        const recommendation = {
            name: faker.music.songName(),
            youtubeLink: ``
        }

        const response = await supertest(app)
            .post('/recommendations')
            .send(recommendation);
        expect(response.statusCode).not.toBe(201);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { name: recommendation.name } });
        expect(persisted).toBeNull();
    });


    it('given name and a link that`s not from youtube it should not succeed and persist recommendation', async () => {
        const recommendation = {
            name: faker.music.songName(),
            youtubeLink: faker.internet.url()
        }

        const response = await supertest(app)
            .post('/recommendations')
            .send(recommendation);
        expect(response.statusCode).not.toBe(201);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { name: recommendation.name } });
        expect(persisted).toBeNull();
    });
})