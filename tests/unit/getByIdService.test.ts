import { jest } from "@jest/globals";

import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";

describe('testing getting a recommendation by id', () => {
    it('get recommendation by id', async () => {
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
            return { id: 1, name: 'aaaa', youtubeLink: 'link', score: 5 };
        });

        await recommendationService.getById(1);

        expect(recommendationRepository.find).toBeCalled();
    });


    it('throw error when id does not exist', async () => {
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
            return false;
        });

        expect(recommendationService.getById(200)).rejects.toEqual({type: "not_found", message: ""});
        expect(recommendationRepository.find).toBeCalled();
    });
})