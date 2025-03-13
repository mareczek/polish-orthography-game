import React, { useState, useEffect } from 'react';
import { rzWordsList, zWordsList } from '../wordLibrary';
import Fireworks from './Fireworks';

const PolishOrthographyGame = () => {
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
  const [showFireworks, setShowFireworks] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [displayContext, setDisplayContext] = useState("");
  const [highlightedWord, setHighlightedWord] = useState("");
  const [showHighlightedWord, setShowHighlightedWord] = useState(false);
  const numberOfWords = 20;

  // Inicjalizacja gry
  useEffect(() => {
    // Helper method to get random words from both lists
    const selected = getRandomWords(numberOfWords);
    setWords(selected);
    prepareWord(selected[0]);

    // Check if speech synthesis is supported
    setSpeechSupported(!!window.speechSynthesis);
  }, []);

  const getRandomWords = (count) => {
    const rzShuffled = [...rzWordsList].sort(() => 0.5 - Math.random());
    const zShuffled = [...zWordsList].sort(() => 0.5 - Math.random());
    const rzNumberToTake = Math.floor(count / 2);
    const zNumberToTake = count - rzNumberToTake;
    return [...rzShuffled.slice(0, rzNumberToTake), ...zShuffled.slice(0, zNumberToTake)].sort(() => 0.5 - Math.random());
  };

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
    setShowHighlightedWord(false);

    // Set context if available
    if (wordObj.context) {
      const formattedContext = wordObj.context.replace('{word}', processed);
      setDisplayContext(formattedContext);
    } else {
      setDisplayContext("");
    }
  };

  // Sprawdzenie odpowiedzi
  const checkAnswer = (answer) => {
    const currentWord = words[currentWordIndex];

    if (answer === currentWord.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
      setFeedback("Dobrze!");
      setFeedbackColor("green");

      // Show the word with only the correct answer part highlighted
      const wordWithHighlight = currentWord.word.replace(
        answer === "rz" ? /rz/i : /ż/i,
        match => `<span class="text-green-600 font-bold">${match}</span>`
      );
      setHighlightedWord(wordWithHighlight);
      setShowHighlightedWord(true);

      // Przejście do następnego słowa po krótkim czasie
      setTimeout(() => {
        moveToNextWord();
      }, 2000);
    } else {
      setWrongAnswers(prev => prev + 1);
      setFeedback(`Ojjj, niedobrze! Poprawna odpowiedź: ${currentWord.correctAnswer}`);
      setFeedbackColor("red");
      setRule(currentWord.rule);

      // Show the word with the correct answer highlighted in red
      const wordWithHighlight = currentWord.word.replace(
        currentWord.correctAnswer === "rz" ? /rz/i : /ż/i,
        match => `<span class="text-red-600 font-bold">${match}</span>`
      );
      setHighlightedWord(wordWithHighlight);
      setShowHighlightedWord(true);

      setShowingFeedback(true);

      // Dodaj błędne słowo do listy
      setIncorrectWords(prev => [...prev, currentWord]);
    }
  };

  // Przejście do następnego słowa
  const moveToNextWord = () => {
    const nextIndex = currentWordIndex + 1;

    if (nextIndex < words.length) {
      setCurrentWordIndex(nextIndex);
      prepareWord(words[nextIndex]);
      setFeedback("");
      setShowingFeedback(false);
      setShowHighlightedWord(false);
    } else {
      // Sprawdzamy czy wynik jest wystarczająco dobry dla fajerwerków
      const score = correctAnswers + 1; // +1 bo właśnie dodaliśmy poprawną odpowiedź
      const percentage = Math.round((score / words.length) * 100);

      setGameEnded(true);
      // Tylko pokazuj fajerwerki dla wyników 90% lub lepszych
      if (percentage >= 90) {
        console.log("Pokazuję fajerwerki! Wynik:", percentage, "%");
        setShowFireworks(true);
      } else {
        console.log("Brak fajerwerków. Wynik:", percentage, "%");
        setShowFireworks(false);
      }
    }
  };

  // Restart gry
  const restartGame = () => {
    const selected = getRandomWords(numberOfWords);

    setWords(selected);
    setCurrentWordIndex(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setGameEnded(false);
    setIncorrectWords([]);
    setShowFireworks(false);
    setFeedback("");
    setShowingFeedback(false);
    setShowHighlightedWord(false);
    prepareWord(selected[0]);
  };

  // Obliczanie procentu poprawnych odpowiedzi
  const calculatePercentage = () => {
    if (words.length === 0) return 0;
    return Math.round((correctAnswers / words.length) * 100);
  };

  // Funkcja do odczytania słowa na głos
  const speakWord = () => {
    if (!speechSupported) {
      console.error("Speech synthesis not supported in this browser");
      return;
    }

    const currentWord = words[currentWordIndex];
    if (!currentWord) return;

    // Zatrzymaj poprzednie odtwarzanie
    window.speechSynthesis.cancel();

    // If context is available, read the entire sentence
    let textToSpeak = currentWord.word;
    if (currentWord.context) {
      textToSpeak = currentWord.context.replace('{word}', currentWord.word);
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'pl-PL'; // Ustawienie języka na polski
    utterance.rate = 0.9; // Nieco wolniejsze tempo

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {showFireworks && <Fireworks />}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Polska Ortografia: rz czy ż?</h1>

        {!gameEnded ? (
          <>
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 mb-2">Słowo {currentWordIndex + 1} z {words.length}</p>
              <div className="flex justify-center items-center mb-4">
                <div className="flex items-center">
                  <div className="text-4xl font-bold">
                    {showHighlightedWord ? (
                      <span dangerouslySetInnerHTML={{ __html: highlightedWord }} />
                    ) : (
                      displayWord
                    )}
                  </div>
                  {speechSupported && (
                    <button
                      onClick={speakWord}
                      className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors ml-2"
                      title="Posłuchaj słowa"
                      aria-label="Posłuchaj słowa"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {displayContext && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{displayContext}</p>
                </div>
              )}

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

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Wybierz czy w zaznaczonym miejscu powinno być "rz" czy "ż"</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Koniec gry!</h2>
            <p className="text-lg mb-2">Twój wynik: {correctAnswers} / {words.length}</p>
            <p className="text-xl font-bold mb-6">{calculatePercentage()}% poprawnych odpowiedzi</p>

            {calculatePercentage() >= 90 ? (
              <div className="mb-6">
                <p className="text-xl text-green-600 font-bold">Gratulacje! Świetny wynik!</p>
              </div>
            ) : calculatePercentage() >= 70 ? (
              <div className="mb-6">
                <p className="text-xl text-green-600 font-bold">Dobry wynik!</p>
              </div>
            ) : calculatePercentage() > 0 ? (
              <div className="mb-6">
                <p className="text-xl text-orange-500 font-bold">Spróbuj jeszcze raz!</p>
              </div>
            ) : null}

            {incorrectWords.length > 0 && (
              <div className="mt-6 mb-8 text-left">
                <h3 className="text-xl font-semibold mb-3 text-red-600">Słowa, w których popełniono błędy:</h3>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  {incorrectWords.map((word, index) => (
                    <div key={index} className="mb-4 pb-3 border-b border-red-100 last:border-b-0 last:mb-0 last:pb-0">
                      <p className="font-bold">{word.word} <span className="text-red-600">({word.correctAnswer})</span></p>
                      <p className="text-sm text-gray-700">{word.rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={restartGame}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
            >
              Zagraj ponownie
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolishOrthographyGame;