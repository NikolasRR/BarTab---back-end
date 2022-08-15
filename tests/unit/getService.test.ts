import { jest } from "@jest/globals";

import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";


describe('testing getting the last 10 recommendations', () => {
    it('get the last 10 recommendations', async () => {
        jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => {
            return true;
        });

        await recommendationService.get();

        expect(recommendationRepository.findAll).toBeCalled();
    });
})