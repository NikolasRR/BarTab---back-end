import supertest from "supertest";
import "dotenv/config";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

const user = {
    email: faker.internet.email(),
    password: faker.internet.password()
}

beforeAll(async () => {
    await prisma.user.create({
        data: {
            name: faker.name.firstName(),
            email: user.email,
            password: bcrypt.hashSync(user.password, 10)
        }
    })
});

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
});

const route = "/sign-in";

describe('post /sign-in', () => {
    it('existing user should be able to log in w/ correct info', async () => {
        const response = await supertest(app)
            .post(route)
            .send(user);
        expect(response.statusCode).toBe(200);
    });

    it('wrong password respondes w/ 401', async () => {
        let data = {
            email: user.email,
            password: "wrong"
        }
        const response = await supertest(app)
            .post(route)
            .send(data);
        expect(response.statusCode).toBe(401);
    });

    it('not registered email respondes with 404', async () => {
        let data = {
            email: faker.internet.email(),
            password: "wrong"
        }
        const response = await supertest(app)
            .post(route)
            .send(data);
        expect(response.statusCode).toBe(404);
    });

    it('any info missing or out of format responds with 422', async () => {
        let data = {
            email: "notanemail@",
            password: ""
        }
        const response = await supertest(app)
            .post(route)
            .send(data);
        expect(response.statusCode).toBe(422);
    });
})