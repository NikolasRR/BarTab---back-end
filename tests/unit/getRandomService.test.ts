import { jest } from "@jest/globals";

import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";

describe('testing getting a random recommendation', () => {
    it('testing flow and return, when Math.random() returns the 70% of score > 10',async () => {
        jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => {
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
        jest.spyOn(Math, 'random').mockImplementationOnce((): any => {
            return 0.1
        });

        const result: any = await recommendationService.getRandom();

        expect(recommendationRepository.findAll).toBeCalledWith({score: 10, scoreFilter: 'gt'});
        expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(result)).toBeTruthy();
    });


    it('testing flow and return, when Math.random() returns the 30% of (-5 < score < 10)',async () => {
        jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => {
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
        jest.spyOn(Math, 'random').mockImplementationOnce((): any => {
            return 0.8
        });

        const result: any = await recommendationService.getRandom();

        expect(recommendationRepository.findAll).toBeCalledWith({score: 10, scoreFilter: 'lte'});
        expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(result)).toBeTruthy();
    });


    it('testing the flow and return when there are no recommendations with the desired score', async () => {
        jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => {
            return [];
        });
        jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => {
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        });

        const result: any = await recommendationService.getRandom();

        expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(result));
    });


    it('throw error when there are no recommendations', async () => {
        jest.spyOn(recommendationRepository, 'findAll').mockImplementation((): any => {
            return [];
        });

        expect(recommendationService.getRandom()).rejects.toEqual({type: "not_found", message: ""});
    });
})


