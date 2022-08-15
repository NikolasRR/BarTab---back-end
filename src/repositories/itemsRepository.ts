import { prisma } from "../database.js";
import { CreateItemParticipantData, CreateItemData, ParticipantWithItems } from "../services/itemsServices.js";

async function createItems(items: CreateItemData[]) {
    await prisma.item.createMany(
        {
            data: items
        }
    );
}

async function findMany(tableId: number) {
    return await prisma.item.findMany({
        where: { tableId }
    });
}

async function createParticipantItemRelation(participantItem: CreateItemParticipantData[]) {
    await prisma.itemParticipant.createMany({
        data: participantItem
    });
}

async function findParticipantsItems(tableId: number) {
    const result: ParticipantWithItems[] = await prisma.$queryRaw`
        SELECT p.id, p.name, array_agg(
            json_build_object(
                'id', i.id, 
                'name', i.name,
                'value', i.value,
                'amount', i.amount,
                'participantsAmount', i."participantsAmount"
            )
        ) AS items
        FROM participants p
        JOIN "itemParticipants" pi ON p.id = pi."participantId"
        JOIN items i ON pi."itemId" = i.id
        WHERE i."tableId" = ${tableId}
        GROUP BY p.id, p.name
    `;

    return result;
}

const itemsRepository = {
    createItems,
    findMany,
    createRelations: createParticipantItemRelation,
    findParticipantsItems
};

export default itemsRepository;