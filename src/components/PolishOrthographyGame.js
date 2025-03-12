import React, { useState, useEffect } from 'react';
import allWordsList from '../wordLibrary';

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
    // Mieszamy słowa i wybieramy losowo 20 z pełnej listy
    const shuffled = [...allWordsList].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20);
    setWords(selected);

    setCurrentWordIndex(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setGameEnded(false);
    setIncorrectWords([]);

    if (selected.length > 0) {
      prepareWord(selected[0]);
    }
  };

  // Obliczanie procentu poprawnych odpowiedzi
  const calculatePercentage = () => {
    if (words.length === 0) return 0;
    return Math.round((correctAnswers / words.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Polska Ortografia: rz czy ż?</h1>

        {!gameEnded ? (
          <>
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 mb-2">Słowo {currentWordIndex + 1} z {words.length}</p>
              <div className="text-4xl font-bold mb-4">{displayWord}</div>

              {feedback && (
                <div className="mb-4">
                  <p style={{ color: feedbackColor }} className="text-xl font-semibold">{feedback}</p>
                  {showingFeedback && (
                    <p className="text-gray-700 mt-2">{rule}</p>
                  )}
                </div>
              )}

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