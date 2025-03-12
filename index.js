import React, { useState, useEffect } from 'react';
import allWordsList from './wordLibrary';

const PolishOrthographyGame = () => {
  // Stan aplikacji
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [displayWord, setDisplayWord] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("black");
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [rule, setRule] = useState("");
  const [incorrectWords, setIncorrectWords] = useState([]);

  // Inicjalizacja gry
  useEffect(() => {
    // Mieszamy słowa i wybieramy losowo 20 z pełnej listy
    const shuffled = [...allWordsList].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20);
    setWords(selected);

    if (selected.length > 0) {
      prepareWord(selected[0]);
    }
  }, []);

  // Przygotowanie słowa z pustym miejscem
  const prepareWord = (wordObj) => {
    const word = wordObj.word;
    let processed = "";

    if (wordObj.correctAnswer === "rz") {
      processed = word.replace(/rz/i, "_");
    } else {
      processed = word.replace(/ż/i, "_");
    }

    setDisplayWord(processed);
  };

  // Sprawdzenie odpowiedzi
  const checkAnswer = (answer) => {
    const currentWord = words[currentWordIndex];

    if (answer === currentWord.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
      setFeedback("Dobrze!");
      setFeedbackColor("green");
      // Przejście do następnego słowa po krótkim czasie
      setTimeout(() => {
        moveToNextWord();
      }, 1000);
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setFeedback(`Źle! Poprawna odpowiedź: ${currentWord.correctAnswer}`);
      setFeedbackColor("red");
      setRule(currentWord.rule);
      setShowingFeedback(true);

      // Dodaj błędne słowo do listy
      setIncorrectWords([...incorrectWords, currentWord]);
    }
  };

  // Przejście do następnego słowa
  const moveToNextWord = () => {
    const nextIndex = currentWordIndex + 1;

    if (nextIndex < words.length) {
      setCurrentWordIndex(nextIndex);
      prepareWord(words[nextIndex]);
      setFeedback("");
    } else {
      setGameEnded(true);
    }
  };

  // Restart gry
  const restartGame = () => {
    const shuffled = [...allWordsList].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20);
    setWords(selected);
    setCurrentWordIndex(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setGameEnded(false);
    setFeedback("");
    setIncorrectWords([]);

    if (selected.length > 0) {
      prepareWord(selected[0]);
    }
  };

  // Obliczanie wyniku procentowego
  const calculatePercentage = () => {
    const total = correctAnswers + wrongAnswers;
    if (total === 0) return 0;
    return Math.round((correctAnswers / total) * 100);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Gra Ortograficzna - "rz" czy "ż"?</h1>

        {!gameEnded ? (
          <>
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-2">Słowo {currentWordIndex + 1} z {words.length}</p>
              <p className="text-4xl font-bold text-center mb-2">{displayWord}</p>
              <p className="text-lg text-center" style={{ color: feedbackColor }}>{feedback}</p>

              {showingFeedback && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm font-medium text-yellow-800">Zasada ortograficzna:</p>
                  <p className="text-sm text-yellow-700">{rule}</p>
                </div>
              )}
            </div>

            {!showingFeedback ? (
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => checkAnswer("rz")}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
                >
                  rz
                </button>
                <button
                  onClick={() => checkAnswer("ż")}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
                >
                  ż
                </button>
              </div>
            ) : (
              <div className="flex justify-center mb-8">
                <button
                  onClick={() => {
                    setShowingFeedback(false);
                    moveToNextWord();
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
                >
                  Dalej
                </button>
              </div>
            )}

            <div className="flex justify-between text-lg">
              <div className="text-green-600">Poprawne: {correctAnswers}</div>
              <div className="text-red-600">Błędne: {wrongAnswers}</div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Koniec gry!</h2>
            <p className="text-lg mb-2">Twój wynik: {correctAnswers} / {words.length}</p>
            <p className="text-xl font-bold mb-6">{calculatePercentage()}% poprawnych odpowiedzi</p>

            <button
              onClick={restartGame}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
            >
              Zagraj ponownie
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Wybierz czy w zaznaczonym miejscu powinno być "rz" czy "ż"</p>
        </div>
      </div>
    </div>
  );
};

export default PolishOrthographyGame;