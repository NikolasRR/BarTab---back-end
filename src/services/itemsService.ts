import { Item, ItemParticipant } from "@prisma/client";

import itemsRepository from "../repositories/itemsRepository.js";

export type CreateItemParticipantData = Omit<ItemParticipant, "id">;

export type CreateItemData = Omit<Item, "id">;

type ParticipantId = { id: number };
export type ReceivedItemData = CreateItemData & { participants: ParticipantId[] };

export type ParticipantWithItems = {
    id: number,
    name: string,
    items: Item[]
};

export type ItemWithParticipantsAmount = {
    id: number,
    name: string,
    participants: number
}


async function createItems(items: ReceivedItemData[], tableId: number) {
    const itemsData: CreateItemData[] = items.map(item => {
        return {
            tableId: tableId,
            value: Math.round(item.value * 100),
            name: item.name,
            amount: item.amount,
            participantsAmount: item.participants.length
        }
    });

    await itemsRepository.createItems(itemsData);
}

async function createItemParticipantRelation(items: ReceivedItemData[], tableId: number) {
    const createdItems = await itemsRepository.findMany(tableId);

    let participantItems: CreateItemParticipantData[] = [];

    for (let i = 0; i < items.length; i++) {
        items[i].participants.forEach(participant => {
            participantItems.push(
                {
                    participantId: participant.id,
                    itemId: createdItems[i].id
                }
            )
        });
    }

    await itemsRepository.createRelations(participantItems);
}

async function getTableItems(tableId: number) {
    return await itemsRepository.findMany(tableId)
}

async function getParticipantsItems(tableId: number) {
    return await itemsRepository.findParticipantsItems(tableId);
}

const itemsService = {
    createItems,
    createItemParticipantRelation,
    getTableItems,
    getParticipantsItems
};

export default itemsService;