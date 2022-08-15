import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";

describe('testing getting the top x amount', () => {
    it('testing the flow and return', async () => {
        const amount = faker.datatype.number({ max: 10 });

        jest.spyOn(recommendationRepository, 'getAmountByScore').mockImplementationOnce((amount): any => {
            return Array.from(Array(amount).keys());
        });

        const result = await recommendationService.getTop(amount);

        expect(recommendationRepository.getAmountByScore).toBeCalled();
        expect(result.length).toBe(amount);
    });
})
