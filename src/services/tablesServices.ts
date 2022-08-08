import { Table } from "@prisma/client";
import tableRepository from "../repositories/tablesRespository.js";

export type CreateTableData = Omit<Table, 'id' | 'createdAt'>

async function createTable(name: string, userId: number) {
    const table: CreateTableData = {
        name: name,
        userId: userId
    };

    return await tableRepository.createTable(table);
}

const tableServices = {
    createTable
};

export default tableServices;