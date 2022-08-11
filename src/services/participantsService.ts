import { Participant } from "@prisma/client";

import participantsRepository from "../repositories/participantsRepository.js";

type createParticipantData = Omit<Participant, "id">;
export type participantsData = createParticipantData[];

async function createParticipants(participants: participantsData, userId: number, tableId: number) {
    participants.forEach(participant => {
        participant.handlerId = userId;
        participant.tableId = tableId;
    });

    await participantsRepository.createParticipants(participants);
}

async function getParticipants(tableId: number) {
    return await participantsRepository.findManyByTable(tableId);
}

const participantsService = {
    createParticipants,
    getParticipants
};

export default participantsService;