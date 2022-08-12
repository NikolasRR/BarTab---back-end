import { Participant, User } from "@prisma/client";

import participantsRepository from "../repositories/participantsRepository.js";

export type createParticipantData = Omit<Participant, "id">;

async function createParticipants(participants: createParticipantData[], user: User, tableId: number) {
    participants.forEach(participant => {
        participant.handlerId = user.id;
        participant.tableId = tableId;
    });

    await participantsRepository.createParticipants(participants);   
}

async function getParticipants(tableId: number) {
    return await participantsRepository.findManyByTable(tableId);
}

async function createUserAsParticipant(user: User, tableId: number) {
    const participant: createParticipantData = {
        name: user.name,
        handlerId: user.id,
        tableId: tableId
    };

    await participantsRepository.createParticipant(participant);
}

const participantsService = {
    createParticipants,
    getParticipants,
    createUserAsParticipant
};

export default participantsService;