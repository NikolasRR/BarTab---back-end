import supertest from "supertest";
import "dotenv/config";
import { faker } from "@faker-js/faker";

import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE`;
})

describe('get /recommendations/:id', () => {
    it('get request should return with correct body format', async () => {
        const response = await supertest(app)
            .get('/recommendations/1');
        expect(response.body.id).not.toBeNull();
        expect(response.body.name).not.toBeNull();
        expect(response.body.youtubeLink).not.toBeNull();
        expect(response.body.score).not.toBeNull();
    });

    it('get request should return 404 for not registered id', async () => {
        const response = await supertest(app)
            .get('/recommendations/25');
        expect(response.statusCode).toBe(404);
    });
})