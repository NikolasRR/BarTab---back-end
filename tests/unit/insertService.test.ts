import { jest } from "@jest/globals";

import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";

describe('testing the insert service', () => {
    it('insert new recommendation', async () => {
        jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce((): any => {
            return null;
        });
        jest.spyOn(recommendationRepository, 'create').mockImplementationOnce((): any => {
            return null;
        });

        await recommendationService.insert({ name: 'aaaa', youtubeLink: 'link' });

        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();

    });


    it('throw error if recommendation already exists', async () => {
        jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce((): any => {
            return true;
        });

        expect(recommendationService.insert({ name: 'aaaa', youtubeLink: 'link' })).rejects.toEqual({type: "conflict", message: "Recommendations names must be unique"});
    });
})