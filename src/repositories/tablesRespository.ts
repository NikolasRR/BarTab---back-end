import { prisma } from "../database.js";
import { CreateTableData } from "../services/tablesServices.js";

async function createTable(table: CreateTableData) {
    return await prisma.table.create({ data: table });
}

async function findById(id: number) {
    return await prisma.table.findUnique({ where: { id } });
}

const tableRepository = {
    createTable,
    findById
};

export default tableRepository;