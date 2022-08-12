import { prisma } from "../database.js";
import { createParticipantData } from "../services/participantsService.js";

async function createParticipants(participantsData: createParticipantData[]) {
    await prisma.participant.createMany(
        {
            data: participantsData
        }
    )
}

async function createParticipant(participant: createParticipantData) {
    await prisma.participant.create({ data: participant });
}

async function findManyByTable(tableId: number) {
    return await prisma.participant.findMany({ where: { tableId } });
}



const participantsRepository = {
    createParticipants,
    findManyByTable,
    createParticipant
}

export default participantsRepository;