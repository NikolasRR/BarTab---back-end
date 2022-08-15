import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

import participantsRepository from "../../src/repositories/participantsRepository.js";
import participantsServices from "../../src/services/participantsServices.js";

const participants = [
    {
        name: faker.name.firstName(),
        tableId: 1,
        handlerId: 1
    },
    {
        name: faker.name.firstName(),
        tableId: 1,
        handlerId: 1
    }
]

describe('testing the participant services', () => {
    it('create participants', async () => {
        jest.spyOn(participantsRepository, 'createParticipants').mockImplementationOnce((): any => {});

        await participantsServices.createParticipants(participants, 1, 1);

        expect(participantsRepository.createParticipants).toBeCalled();
    });


    it('get participants', async () => {
        jest.spyOn(participantsRepository, 'findManyByTable').mockImplementationOnce((): any => {
            return participants;
        });
        const result = await participantsServices.getParticipants(1);

        expect(participantsRepository.findManyByTable).toBeCalled();
        expect(result).toBe(participants);
    });

    it('create user as participant', async () => {
        const user = {
            id: 1,
            name: faker.name.firstName(),
            email: 'email',
            password: 'password',
            tableId: 1,
            handlerId: 1,
            createdAt: new Date()
        };

        jest.spyOn(participantsRepository, 'createParticipant').mockImplementationOnce((): any => {});

        await participantsServices.createUserAsParticipant(user, 1);

        expect(participantsRepository.createParticipant).toBeCalled();
    });
})