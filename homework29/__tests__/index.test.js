import { ageClassification } from '../index.js';

describe('Функція ageClassification', () => {

    test('для параметру -1 очікуваний результат null', () => {
        expect(ageClassification(-1)).toBe(null)
    });

    test('для параметру 0 очікуваний результат null', () => {
        expect(ageClassification(-1)).toBe(null)
    });

    test('для параметру 1 очікуваний результат "Дитинство"', () => {
        expect(ageClassification(1)).toBe('Дитинство')
    });

    test('для параметру 24 очікуваний результат "Дитинство"', () => {
        expect(ageClassification(24)).toBe('Дитинство')
    });
    
    test('для параметру 24.01 очікуваний результат "Молодість"', () => {
        expect(ageClassification(24.01)).toBe('Молодість')
    });

    test('для параметру 44 очікуваний результат "Молодість"', () => {
        expect(ageClassification(44)).toBe('Молодість')
    });

    test('для параметру 44.01 очікуваний результат "Зрілість"', () => {
        expect(ageClassification(44.01)).toBe('Зрілість')
    });

    test('для параметру 65.01 очікуваний результат "Старість"', () => {
        expect(ageClassification(65.01)).toBe('Старість')
    });

    test('для параметру 75.01 очікуваний результат "Довголіття"', () => {
        expect(ageClassification(75.01)).toBe('Довголіття')
    });

    test('для параметру 90.01 очікуваний результат "Рекорд"', () => {
        expect(ageClassification(90.01)).toBe('Рекорд')
    });

    test('для параметру 122 очікуваний результат "Рекорд"', () => {
        expect(ageClassification(122)).toBe('Рекорд')
    });

    test('для параметру 122.01 очікуваний результат "null"', () => {
        expect(ageClassification(122.01)).toBe(null)
    });

});
