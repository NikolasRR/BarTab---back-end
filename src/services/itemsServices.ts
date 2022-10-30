import { Item, ItemParticipant } from "@prisma/client";

import itemsRepository from "../repositories/itemsRepository.js";

export type CreateItemParticipantData = Omit<ItemParticipant, "id">;

export type CreateItemData = Omit<Item, "id">;

type Participant = { id: number, name: string };
export type ReceivedItemData = CreateItemData & { participants: Participant[] };

export type ParticipantWithItems = {
    id: number,
    name: string,
    total?: number
    items: Item[]
};

export type TableItemsWithTotal = { 
    total: number,
    items: Item[] 
};


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
    const result = await itemsRepository.findMany(tableId);
    return calculateTableTotal(result);
}

function calculateTableTotal(items: Item[]) {
    let total = 0;
    items.forEach(item => total += (item.value * item.amount));
    const data: TableItemsWithTotal = {
        total: total,
        items: items
    };
    return data;
}

async function getParticipantsItems(tableId: number) {
    const result =  await itemsRepository.findParticipantsItems(tableId);
    result.forEach(pi => calculateParticipantTotal(pi));
    return result;
}

function calculateParticipantTotal(pi: ParticipantWithItems) {
    let total = 0;
    pi.items.forEach(item => total += (item.value * item.amount) / item.participantsAmount);
    pi.total = Math.round(total);
}

const itemsServices = {
    createItems,
    createItemParticipantRelation,
    getTableItems,
    getParticipantsItems
};

export default itemsServices;