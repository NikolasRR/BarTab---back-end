import { Table } from "@prisma/client";
import tableRepository from "../repositories/tablesRespository.js";

export type CreateTableData = Omit<Table, 'id' | 'createdAt'>

async function createNewTable(name: string, userId: number) {
    await deleteCurrent(userId);

    const table: CreateTableData = {
        name: name,
        userId: userId
    };

    return await tableRepository.createTable(table);
}

async function deleteCurrent(userId: number) {
    const existingTable = getCurrent(userId);
    if (existingTable) await tableRepository.deleteCurrent(userId);
}

async function getCurrent(userId: number) {
    return await tableRepository.findByUser(userId);
}

const tableServices = {
    createNewTable,
    getCurrent
};

export default tableServices;