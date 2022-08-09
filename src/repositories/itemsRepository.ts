import { ParticipantItem } from "@prisma/client";

import { prisma } from "../database.js";
import { CreateParticipantItemData, CreateItemData } from "../services/itemsService.js";

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

async function createParticipantItemRelation(participantItem: CreateParticipantItemData[]) {
    await prisma.participantItem.createMany({
        data: participantItem
    });
}

const itemsRepository = {
    createItems,
    findMany,
    createRelations: createParticipantItemRelation,
};

export default itemsRepository;