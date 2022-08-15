import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import authRespository from "../../src/repositories/authRepository";
import authServices from "../../src/services/authServices";

const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

describe('testing the authentication services', () => {
    it('create new user', async () => {
        jest.spyOn(authRespository, 'getByEmail').mockImplementationOnce((): any => {
            return false;
        });
        jest.spyOn(authRespository, 'create').mockImplementationOnce((): any => { });
        jest.spyOn(bcrypt, "hashSync").mockImplementationOnce(() => { })

        await authServices.createNewUser(user);

        expect(authRespository.getByEmail).toBeCalled();
        expect(bcrypt.hashSync).toBeCalled();
        expect(authRespository.create).toBeCalled();
    });


    it('create new user, throw error if email already registered', async () => {
        jest.spyOn(authRespository, 'getByEmail').mockImplementationOnce((): any => {
            return true;
        });

        expect(authServices.createNewUser(user)).rejects.toEqual({ type: "conflict", details: "email" });
        expect(authRespository.getByEmail).toBeCalled();
    });

    it('sign user in', async () => {
        jest.spyOn(authRespository, 'getByEmail').mockImplementationOnce((): any => {
            return true;
        });
        jest.spyOn(bcrypt, "compareSync").mockImplementationOnce(() => true);
        jest.spyOn(jwt, "sign").mockImplementationOnce(() => "token");

        const result = await authServices.logUserIn(user);

        expect(authRespository.getByEmail).toBeCalled();
        expect(bcrypt.compareSync).toBeCalled();
        expect(jwt.sign).toBeCalled();
        expect(result).toEqual("token");
    });

    it('sign user in with wrong password', async () => {
        jest.spyOn(authRespository, 'getByEmail').mockImplementationOnce((): any => {
            return true;
        });
        jest.spyOn(bcrypt, "compareSync").mockImplementationOnce(() => false);

        expect(authServices.logUserIn(user)).rejects.toEqual({ type: "unauthorized" });
        expect(authRespository.getByEmail).toBeCalled();
        expect(bcrypt.compareSync).toBeCalled();
    });

    it('sign user in with user not registered', async () => {
        jest.spyOn(authRespository, 'getByEmail').mockImplementationOnce((): any => {
            return null;
        });

        expect(authServices.logUserIn(user)).rejects.toEqual({ type: "not found", details: "email" });
        expect(authRespository.getByEmail).toBeCalled();
    });
})