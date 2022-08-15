import supertest from "supertest";
import "dotenv/config";
import { faker } from "@faker-js/faker";

import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

beforeAll(async () => {
    await prisma.recommendation.create({
        data: 
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`,
            }
    });
});

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE`;
});

describe('post /recommendations/:id/upvote', () => {
    it('posted upvote w/ correct ID, without body, should succeed and persist', async () => {
        const response = await supertest(app)
            .post('/recommendations/1/upvote');
        expect(response.statusCode).toBe(200);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { id: 1 } });
        expect(persisted.score).toBe(1);
    });

    it('posted upvote w/ non existent ID, without body, should not succeed and persist', async () => {
        const response = await supertest(app)
            .post('/recommendations/2/upvote');
        expect(response.statusCode).toBe(404);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { id: 2 } });
        expect(persisted).toBeNull();
    });

    it('posted upvote w/ incorrect ID, without body, should not succeed', async () => {
        const response = await supertest(app)
            .post('/recommendations/ar2/upvote');
        expect(response.statusCode).not.toBe(200);
    });
})