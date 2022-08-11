import { prisma } from "../database.js";
import { participantsData } from "../services/participantsService.js";

async function createParticipants(participantsData: participantsData) {
    await prisma.participant.createMany(
        {
            data: participantsData
        }
    )
}

async function findManyByTable(tableId: number) {
    return await prisma.participant.findMany({ where: { tableId } });
}



const participantsRepository = {
    createParticipants,
    findManyByTable
}

export default participantsRepository;