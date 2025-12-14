import React, { useState, useEffect } from 'react';
import { Home, Trophy } from 'lucide-react';

const App = () => {
  const [screen, setScreen] = useState('menu');
  const [level, setLevel] = useState(9); // 9, 19, ou 29
  const [exercise, setExercise] = useState(null);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isDigging, setIsDigging] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Génération d'un exercice d'addition avec 9, 19 ou 29
  const generateExercise = (addNumber) => {
    const firstNumber = Math.floor(Math.random() * 20) + 1; // 1 à 20
    return {
      numbers: [firstNumber, addNumber],
      question: `${firstNumber} + ${addNumber} = ?`,
      answer: (firstNumber + addNumber).toString()
    };
  };

  // Initialisation d'un nouvel exercice
  useEffect(() => {
    if (level && screen === 'game') {
      const newExercise = generateExercise(level);
      setExercise(newExercise);
      setAnswer('');
      setFeedback('');
      setShowResult(false);
    }
  }, [level, screen]);

  // Vérification de la réponse
  const checkAnswer = () => {
    if (!answer) return;

    if (answer === exercise.answer) {
      setIsDigging(true);
      setFeedback('');

      // Animation de la pelleteuse qui creuse
      setTimeout(() => {
        setShowResult(true);
        setFeedback('SUPER ! Tu as trouvé le trésor !');
        setScore(score + 1);
        setIsDigging(false);

        // Prochaine question après 3 secondes
        setTimeout(() => {
          setAnswer('');
          setFeedback('');
          setShowResult(false);
          setExercise(generateExercise(level));
        }, 3000);
      }, 2000);
    } else {
      setFeedback('Pas encore ! Réessaie, tu peux le faire !');
    }
  };

  // Composant pelleteuse
  const Excavator = ({ isDigging }) => (
    <div className={`text-6xl transition-transform duration-500 ${isDigging ? 'animate-bounce' : ''}`}>
      🚜
    </div>
  );

  // Composant objet de chantier (casque, cône, etc.)
  const ConstructionItem = ({ type }) => {
    const items = {
      helmet: '⛑️',
      cone: '🚧',
      brick: '🧱',
      tool: '🔨'
    };
    return <span className="text-3xl">{items[type] || items.helmet}</span>;
  };

  // Affichage visuel des nombres
  const VisualNumber = ({ count, color }) => {
    const getItems = (n) => {
      const items = [];
      const types = ['helmet', 'cone', 'brick', 'tool'];
      for (let i = 0; i < n; i++) {
        items.push(<ConstructionItem key={i} type={types[i % types.length]} />);
      }
      return items;
    };

    return (
      <div className={`bg-${color}-50 border-4 border-${color}-400 rounded-2xl p-6`}>
        <div className="text-5xl font-bold text-gray-800 mb-4">{count}</div>
        <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
          {getItems(count)}
        </div>
      </div>
    );
  };

  // Menu principal
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-yellow-50 p-6">
        <header className="text-center mb-12">
          <div className="text-8xl mb-4">🚜</div>
          <h1 className="text-5xl font-bold text-orange-600 mb-4">
            Chantier des Additions
          </h1>
          <p className="text-2xl text-gray-700 font-semibold">
            La pelleteuse va t'aider à trouver les résultats !
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xl text-gray-600 mb-8 font-semibold">
            Choisis ton niveau :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <button
              onClick={() => {
                setLevel(9);
                setScreen('game');
              }}
              className="transform transition hover:scale-105 active:scale-95"
            >
              <div className="bg-green-500 text-white rounded-3xl p-8 text-center shadow-2xl border-4 border-green-600">
                <div className="text-6xl mb-4">🟢</div>
                <div className="text-6xl font-bold mb-4">+ 9</div>
                <div className="text-2xl font-bold">FACILE</div>
              </div>
            </button>

            <button
              onClick={() => {
                setLevel(19);
                setScreen('game');
              }}
              className="transform transition hover:scale-105 active:scale-95"
            >
              <div className="bg-orange-500 text-white rounded-3xl p-8 text-center shadow-2xl border-4 border-orange-600">
                <div className="text-6xl mb-4">🟠</div>
                <div className="text-6xl font-bold mb-4">+ 19</div>
                <div className="text-2xl font-bold">MOYEN</div>
              </div>
            </button>

            <button
              onClick={() => {
                setLevel(29);
                setScreen('game');
              }}
              className="transform transition hover:scale-105 active:scale-95"
            >
              <div className="bg-red-500 text-white rounded-3xl p-8 text-center shadow-2xl border-4 border-red-600">
                <div className="text-6xl mb-4">🔴</div>
                <div className="text-6xl font-bold mb-4">+ 29</div>
                <div className="text-2xl font-bold">DIFFICILE</div>
              </div>
            </button>
          </div>
        </div>

        <div className="text-center mt-12 text-6xl">
          🏗️ 👷 🏗️
        </div>
      </div>
    );
  }

  // Écran de jeu
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-50 p-6">
      {/* Barre du haut */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => {
            setScreen('menu');
            setLevel(null);
            setExercise(null);
          }}
          className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition border-4 border-gray-300"
        >
          <Home className="w-10 h-10 text-gray-600" />
        </button>

        <div className="bg-white px-8 py-4 rounded-2xl shadow-lg border-4 border-yellow-400">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="text-3xl font-bold text-gray-800">{score}</span>
          </div>
        </div>
      </div>

      {exercise && (
        <div className="max-w-4xl mx-auto">
          {/* Indication du niveau */}
          <div className="text-center mb-6">
            <div className="inline-block bg-white px-6 py-3 rounded-2xl shadow-lg border-4 border-blue-400">
              <span className="text-2xl font-bold text-blue-600">
                Additions avec + {level}
              </span>
            </div>
          </div>

          {/* Zone de calcul */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-orange-400 mb-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
              {exercise.question}
            </h2>

            {/* Affichage visuel des nombres */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
              <VisualNumber count={exercise.numbers[0]} color="blue" />

              <div className="text-center">
                <div className="text-7xl font-bold text-orange-500">+</div>
              </div>

              <VisualNumber count={exercise.numbers[1]} color="green" />
            </div>

            {/* Zone de réponse */}
            <div className="flex flex-col items-center gap-6">
              <div className="text-2xl font-bold text-gray-600">Ta réponse :</div>
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                className="w-32 h-32 text-6xl text-center border-8 border-orange-400 rounded-3xl focus:border-orange-600 focus:outline-none shadow-lg font-bold"
                disabled={isDigging || showResult}
                autoFocus
              />

              <button
                onClick={checkAnswer}
                disabled={isDigging || showResult || !answer}
                className="px-12 py-6 bg-orange-500 text-white rounded-3xl hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-3xl font-bold shadow-xl border-4 border-orange-600 transition transform hover:scale-105 active:scale-95"
              >
                {isDigging ? 'La pelleteuse creuse...' : 'Vérifier'}
              </button>
            </div>
          </div>

          {/* Zone de la pelleteuse */}
          <div className="bg-amber-100 rounded-3xl p-8 border-4 border-amber-600 shadow-2xl">
            <div className="flex flex-col items-center gap-6">
              <Excavator isDigging={isDigging} />

              {isDigging && (
                <div className="text-2xl font-bold text-amber-800 animate-pulse">
                  🚧 La pelleteuse creuse pour trouver la réponse... 🚧
                </div>
              )}

              {showResult && (
                <div className="bg-yellow-300 border-4 border-yellow-500 rounded-2xl p-6 shadow-xl">
                  <div className="text-5xl mb-4">🏆</div>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    Réponse : {exercise.answer}
                  </div>
                  <div className="text-2xl text-gray-700">
                    ⛑️ Excellent travail ! ⛑️
                  </div>
                </div>
              )}

              {feedback && !showResult && (
                <div className={`text-3xl font-bold p-6 rounded-2xl border-4 ${
                  feedback.includes('SUPER')
                    ? 'bg-green-200 text-green-700 border-green-500'
                    : 'bg-blue-200 text-blue-700 border-blue-500'
                }`}>
                  {feedback}
                </div>
              )}
            </div>
          </div>

          {/* Décorations de chantier */}
          <div className="text-center mt-8 text-5xl space-x-4">
            <span>🏗️</span>
            <span>👷</span>
            <span>🚧</span>
            <span>⛑️</span>
            <span>🔨</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
