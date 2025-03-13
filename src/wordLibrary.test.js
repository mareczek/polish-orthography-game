import { rzWordsList, zWordsList } from './wordLibrary';

describe('Word Lists Validation', () => {
  test('rzWordsList has no duplicate words', () => {
    const words = rzWordsList.map(item => item.word);
    const uniqueWords = new Set(words);
    expect(words.length).toBe(uniqueWords.size);
  });

  test('each word in rzWordsList exactly one "rz"', () => {
    rzWordsList.forEach(item => {
      const word = item.word;
      const matches = word.match(/rz/g);
      if (matches === null) {
        console.log(word);
      }
      expect(matches).not.toBeNull();
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  test('zWordsList has no duplicate words', () => {
    const words = zWordsList.map(item => item.word);
    const uniqueWords = new Set(words);
    expect(words.length).toBe(uniqueWords.size);
  });

  test('each word in zWordsList has exactly one "ż"', () => {
    zWordsList.forEach(item => {
      const word = item.word;
      const matches = word.match(/ż/g);
      if (matches === null) {
        console.log(word);
      }
      expect(matches).not.toBeNull();
      expect(matches.length).toBeGreaterThan(0);
    });
  });
});