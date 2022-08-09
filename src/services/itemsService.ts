import { Item, ParticipantItem } from "@prisma/client";

import itemsRepository from "../repositories/itemsRepository.js";

export type CreateParticipantItemData = Omit<ParticipantItem, "id">;

export type CreateItemData = Omit<Item, "id">;

type ParticipantsId = { id: number };
export type ReceivedItemData = CreateItemData & { participants: ParticipantsId[] };


async function createItems(items: ReceivedItemData[], tableId: number) {
    const itemsData: CreateItemData[] = items.map(item => {
        return {
            tableId: tableId,
            value: Math.round(item.value * 100),
            name: item.name,
            amount: item.amount
        }
    });

    await itemsRepository.createItems(itemsData);
}

async function createParticipantItemRelation(items: ReceivedItemData[], tableId: number) {
    const createdItems = await itemsRepository.findMany(tableId);

    let participantItems: CreateParticipantItemData[] = [];

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

const itemsService = {
    createItems,
    createParticipantItemRelation
};

export default itemsService;