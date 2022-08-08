import { prisma } from "../database.js";
import { participantsData } from "../services/participantsService.js";

async function createParticipants(participantsData: participantsData) {
    await prisma.participant.createMany(
        {
            data: participantsData
        }
    )
}

async function findMany(handlerId: number, tableId: number) {
    return await prisma.participant.findMany(
        {
            where: {
                handlerId,
                tableId
            }
        }
    )
}

// async function createParticipantsTableRelation(participantsData: participantsData, tableId: number) {
//     await prisma.tableParticipant.createMany(
//         {
//             data: 
//         }
//     )
// }

const participantsRepository = {
    createParticipants,
    findMany
}

export default participantsRepository;