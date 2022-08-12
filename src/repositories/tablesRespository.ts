import { prisma } from "../database.js";
import { CreateTableData } from "../services/tablesServices.js";

async function createTable(table: CreateTableData) {
    return await prisma.table.create({ data: table });
}

async function findById(id: number) {
    return await prisma.table.findUnique({ where: { id } });
}

async function findByUser(userId: number) {
    return await prisma.table.findFirst({ where: { userId } });
}

async function deleteCurrent(userId: number) {
    await prisma.table.delete({ where: { userId } });
}

const tableRepository = {
    createTable,
    findById,
    findByUser,
    deleteCurrent
};

export default tableRepository;