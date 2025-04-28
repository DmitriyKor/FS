import { ageClassification } from '../index.js';

describe('Функція ageClassification', () => {

    test('для параметру -1 очікуваний результат null', () => {
        expect(ageClassification(-1)).toBe(null)
    });

    test('для параметру 1 очікуваний результат "Дитинство"', () => {
        expect(ageClassification(1)).toBe('Дитинство')
    });
});
