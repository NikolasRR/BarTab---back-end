import { jest } from "@jest/globals";

import tableRepository from "../../src/repositories/tablesRespository.js"
import tableServices from "../../src/services/tablesServices";

describe('testing the table creating service', () => {
    it('create a new table when there is no current one', async () => {
        const createdTable = { table: "teste" };

        jest.spyOn(tableRepository, 'findByUser').mockImplementationOnce((): any => {
            return null;
        });
        jest.spyOn(tableRepository, 'createTable').mockImplementationOnce((): any => {
            return createdTable;
        });

        const result = await tableServices.createNewTable("teste", 1);

        expect(result).toBe(createdTable);
        expect(tableRepository.findByUser).toBeCalled();
        expect(tableRepository.createTable).toBeCalled();

    });


    it('create a new table when there is a current one', async () => {
        const createdTable = { table: "teste" };

        jest.spyOn(tableRepository, 'findByUser').mockImplementationOnce((): any => {
            return { name: "current Table" };
        });
        jest.spyOn(tableRepository, 'deleteCurrent').mockImplementationOnce((): any => {});
        jest.spyOn(tableRepository, 'createTable').mockImplementationOnce((): any => {
            return createdTable;
        });

        const result = await tableServices.createNewTable("teste", 1);

        expect(result).toBe(createdTable);
        expect(tableRepository.findByUser).toBeCalled();
        expect(tableRepository.deleteCurrent).toBeCalled();
        expect(tableRepository.createTable).toBeCalled();
    });
})