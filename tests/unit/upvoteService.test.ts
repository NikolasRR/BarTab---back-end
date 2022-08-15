import { jest } from "@jest/globals";

import authRespository from "../../src/repositories/authRepository";
import recommendationService from "../../src/services/recommendationsService.js";

describe('testing the upvote service', () => {
    it('upvote the recommendation', async () => {
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
            return true;
        });
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce((): any => {});

        await recommendationService.upvote(1);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();

    });


    it('throw error if recommendation does not exist', async () => {
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
            return false;
        });

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationService.upvote(1)).rejects.toEqual({type: "not_found", message: ""});
    });
})