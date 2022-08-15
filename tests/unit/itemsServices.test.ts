import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

import itemsRepository from "../../src/repositories/itemsRepository.js";
import itemsServices from "../../src/services/itemsServices.js";

const items = [
    {
        tableId: 4,
        value: 10,
        name: 'name',
        amount: 2,
        participantsAmount: 4,
        participants: [
            { id: 1 },
            { id: 2 }
        ]
    }
]

describe('testing items services', () => {
    it('creating items', async () => {
        const tableId = faker.datatype.number();
        const value = faker.datatype.number();
        const thisTestItems = [
            {
                tableId: 4,
                value: value,
                name: 'name',
                amount: 2,
                participantsAmount: 4,
                participants: [
                    { id: 1 },
                    { id: 2 }
                ]
            }
        ]

        jest.spyOn(itemsRepository, 'createItems').mockImplementationOnce((): any => { });

        await itemsServices.createItems(thisTestItems, tableId);

        expect(itemsRepository.createItems).toBeCalledWith([
            {
                tableId: tableId,
                value: value * 100,
                name: 'name',
                amount: 2,
                participantsAmount: 2,
            }
        ]);
    });


    it('creating ItemParticipant relation', async () => {
        jest.spyOn(itemsRepository, 'findMany').mockImplementationOnce((): any => [
            {
                id: 1,
                tableId: 1,
                value: 10,
                name: 'name',
                amount: 2,
                participantsAmount: 2,
            }
        ]);
        jest.spyOn(itemsRepository, 'createRelations').mockImplementationOnce((): any => { });

        await itemsServices.createItemParticipantRelation(items, 1);

        expect(itemsRepository.findMany).toBeCalled();
        expect(itemsRepository.createRelations).toBeCalledWith([
            { itemId: 1, participantId: 1 },
            { itemId: 1, participantId: 2 }
        ]);
    });


    it('testing getting the table items', async () => {
        const value = faker.datatype.number();
        const amount = faker.datatype.number();
        const thisTestItems = [
            {
                id: 1,
                tableId: 1,
                value: value,
                name: 'name',
                amount: amount,
                participantsAmount: 2,
            }
        ];

        jest.spyOn(itemsRepository, 'findMany').mockImplementationOnce((): any => thisTestItems);

        const result: any = await itemsServices.getTableItems(1);

        expect(result.total).toBe(value * amount);
        expect(result.items).toBe(thisTestItems);
    });


    it('testting getting participants items', async () => {
        const value = faker.datatype.number();
        const amount = faker.datatype.number();
        const participantsAmount = faker.datatype.number();
        const thisTestItems = [
            {
                id: 1,
                name: 'participant',
                total: 0,
                items: [
                    {
                        id: 1,
                        tableId: 1,
                        value: value,
                        name: 'name',
                        amount: amount,
                        participantsAmount: participantsAmount,
                        total: 0
                    }
                ]
            }

        ];
        jest.spyOn(itemsRepository, 'findParticipantsItems').mockImplementationOnce((): any => thisTestItems);
        jest.spyOn(Math, 'round').mockImplementationOnce((): any => {return ((value * amount) / participantsAmount)});

        const result = await itemsServices.getParticipantsItems(1);

        expect(result[0].total).toBe((value * amount) / participantsAmount);
        expect(itemsRepository.findParticipantsItems).toBeCalled();
        expect(Math.round).toBeCalled();
    });
})


