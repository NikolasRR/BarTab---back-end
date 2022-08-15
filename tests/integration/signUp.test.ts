import supertest from "supertest";
import "dotenv/config";
import { faker } from "@faker-js/faker";

import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
});

const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

const route = "/sign-up";

describe('post /sign-up', () => {
    it('posted acceptable data should succeed and persist', async () => {
        const response = await supertest(app)
            .post(route)
            .send(user);
        expect(response.statusCode).toBe(201);

        const persisted = await prisma
            .user
            .findFirst({ where: { email: user.email } });
        
        expect(persisted.email).toBe(user.email);
        expect(persisted.password).not.toBe(user.password);
    });


    it('already registered email should fail with 409', async () => {
        const response = await supertest(app)
            .post(route)
            .send(user);
        expect(response.statusCode).toBe(409);

        const persisted = await prisma
            .user
            .findMany({ where: { email: user.email } });
        expect(persisted.length).toBe(1);
    });

    it('unvalid email should fail w/ 422', async () => {
        let data = user;
        data.email = 'invalid@';
        const response = await supertest(app)
            .post(route)
            .send(data);
        expect(response.statusCode).toBe(422);

        const persisted = await prisma
            .user
            .findFirst({ where: { email: data.email } });
        expect(persisted).toBeNull();
    });

    it('missing name, email or password should respond with 422', async () => {
        let data = user;
        data.name = "";
        const response = await supertest(app)
            .post(route)
            .send(data);
        expect(response.statusCode).toBe(422);
    });
})