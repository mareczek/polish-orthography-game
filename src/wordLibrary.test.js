import { rzWordsList, zWordsList } from './wordLibrary';

describe('Word Lists Validation', () => {
  test('rzWordsList has no duplicate words', () => {
    const words = rzWordsList.map(item => item.word);
    const uniqueWords = new Set(words);
    expect(words.length).toBe(uniqueWords.size);
  });

  test('zWordsList has no duplicate words', () => {
    const words = zWordsList.map(item => item.word);
    const uniqueWords = new Set(words);
    expect(words.length).toBe(uniqueWords.size);
  });
});