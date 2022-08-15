import supertest from "supertest";
import "dotenv/config";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

let token = "";
let userData = { id: 1 };
let tableData = { id: 1 };

beforeAll(async () => {
    const SALT = 10;
    const hashedPassword = bcrypt.hashSync("admin", SALT);
    await prisma.user.upsert({
        where: { email: "admin@admin.com" },
        update: {},
        create: {
            name: "admin",
            email: "admin@admin.com",
            password: hashedPassword
        }
    });

    const result = await prisma.user.findFirst({ where: { email: "admin@admin.com" } });
    delete result.password;
    userData = result;
    token = jwt.sign(result, process.env.JWT_SECRET);

    const table = await prisma.table.create({ data: { name: 'table', userId: userData.id } });
    tableData = table;
});

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
});

const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

const route = "/participants";

const participants = [
    { name: faker.name.firstName() },
    { name: faker.name.firstName() },
    { name: faker.name.firstName() },
    { name: faker.name.firstName() }
];

describe('route /participants', () => {
    it('given correct data should respond 200 and persist', async () => {
        const response = await supertest(app)
            .post(`${route}/${tableData.id}`)
            .send(participants)
            .set("Cookie", [`token=${token}`]);
        expect(response.statusCode).toBe(201);

        const persisted = await prisma
            .participant
            .findMany({ where: { handlerId: userData.id } });

        expect(persisted.length).toBe(5); //the user is added as a participant
    });


    it('given any void name should responde w/ 422', async () => {
        let data = [...participants];
        data[0].name = "";
        const response = await supertest(app)
            .post(`${route}/${tableData.id}`)
            .send(data)
            .set("Cookie", [`token=${token}`]);
        expect(response.statusCode).toBe(422);
    });


    it('get participants', async () => {
        const response = await supertest(app)
            .get(`${route}/${tableData.id}`)
            .set("Cookie", [`token=${token}`]);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(5);
    });


    it('w/out tableId, the request fails', async () => {
        const response1 = await supertest(app)
            .get(route)
            .set("Cookie", [`token=${token}`]);

        const response2 = await supertest(app)
            .post(route)
            .send(participants)
            .set("Cookie", [`token=${token}`]);

        expect(response1.statusCode).not.toBe(200);
        expect(response2.statusCode).not.toBe(200);

    });
})