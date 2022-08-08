import { prisma } from "../database.js";
import { CreateTableData } from "../services/tablesServices.js";

async function createTable(table: CreateTableData) {
    return await prisma.table.create({data: table});
}

const tableRepository = {
    createTable
};

export default tableRepository;