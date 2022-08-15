import supertest from "supertest";
import "dotenv/config";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

let token = "";
console.log(process.env);

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

    const result = await prisma.user.findFirst({where: {email: "admin@admin.com"}});
    delete result.password;
    token = jwt.sign(result, process.env.JWT_SECRET);
});

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
});

const route = "/table";
const tableName = faker.name.findName();

describe('route /table', () => {
    it('given table name should create on post /table', async () => {
        const response = await supertest(app)
            .post(route)
            .send({ name: tableName })
            .set("Cookie", [`token=${token}`]);
        expect(response.statusCode).toBe(201);

        const persisted = await prisma
            .table
            .findFirst({ where: { name: tableName } });
        expect(persisted).not.toBe(null);
    });


    it('getting table info on get /table, only requires token', async () => {
        const response = await supertest(app)
            .get(route)
            .set("Cookie", [`token=${token}`]);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(tableName);
    });



    it('only with token should delete user table on delete /table', async () => {
        const response = await supertest(app)
            .delete(route)
            .set("Cookie", [`token=${token}`]);
        expect(response.statusCode).toBe(200);

        const persisted = await prisma
            .table
            .findFirst({ where: { name: tableName } });
        expect(persisted).toBe(null);
    });
})