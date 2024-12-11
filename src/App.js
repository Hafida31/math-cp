import React, { useState, useEffect } from 'react';
import { Calculator, Hash, Grid, Home, Star, ArrowRight } from 'lucide-react';

const App = () => {
  const [screen, setScreen] = useState('menu');
  const [gameType, setGameType] = useState(null);
  const [exercise, setExercise] = useState(null);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [groupAnswers, setGroupAnswers] = useState({ dizaines: '', unites: '' });
  const [feedback, setFeedback] = useState('');

  // Génération des exercices
  const generateExercise = (type) => {
    switch(type) {
      case 'counting':
        const number = Math.floor(Math.random() * 10) + 10; // 10-19
        return {
          type: 'counting',
          number: number,
          question: 'Compte les points',
          answer: number.toString()
        };
      
      case 'groups':
        const num = Math.floor(Math.random() * 10) + 10; // 10-19
        return {
          type: 'groups',
          number: num,
          question: 'Compte les dizaines et les unités',
          isGroupExercise: true
        };

      case 'additions':
        const n1 = Math.floor(Math.random() * 5) + 1;
        const n2 = Math.floor(Math.random() * 5) + 1;
        return {
          type: 'additions',
          numbers: [n1, n2],
          question: `${n1} + ${n2} = ?`,
          answer: (n1 + n2).toString()
        };

      default:
        return null;
    }
  };

  // Initialisation d'un nouvel exercice
  useEffect(() => {
    if (gameType) {
      const newExercise = generateExercise(gameType);
      setExercise(newExercise);
      setAnswer('');
      setGroupAnswers({ dizaines: '', unites: '' });
      setFeedback('');
    }
  }, [gameType]);

  // Vérification des réponses
  const checkAnswer = () => {
    if (exercise.isGroupExercise) {
      // Pour les exercices de dizaines et unités
      if (groupAnswers.dizaines === '1' && 
          groupAnswers.unites === (exercise.number - 10).toString()) {
        handleSuccess();
      } else {
        setFeedback('Essaie encore ! 💪');
      }
    } else {
      // Pour les autres types d'exercices
      if (answer === exercise.answer) {
        handleSuccess();
      } else {
        setFeedback('Essaie encore ! 💪');
      }
    }
  };

  const handleSuccess = () => {
    setFeedback('Bravo ! 🌟');
    setScore(score + 1);
    setTimeout(() => {
      setFeedback('');
      setAnswer('');
      setGroupAnswers({ dizaines: '', unites: '' });
      setExercise(generateExercise(gameType));
    }, 1500);
  };

  // Composant pour afficher les points
  const Points = ({ count, color }) => (
    <div className="flex flex-wrap gap-2 justify-center">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i}
          className={`w-8 h-8 rounded-full bg-${color}-500`}
        />
      ))}
    </div>
  );

  // Menu principal
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">🌟 Math CP 🌟</h1>
          <p className="text-xl text-gray-600">Choisis ton exercice !</p>
        </header>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => {
              setGameType('counting');
              setScreen('game');
            }}
            className="cursor-pointer transform transition hover:-translate-y-1"
          >
            <div className="bg-purple-500 text-white rounded-xl p-6 text-center shadow-lg">
              <div className="bg-purple-400 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Hash size={40} />
              </div>
              <h2 className="text-xl font-bold">Je compte</h2>
            </div>
          </div>

          <div 
            onClick={() => {
              setGameType('groups');
              setScreen('game');
            }}
            className="cursor-pointer transform transition hover:-translate-y-1"
          >
            <div className="bg-blue-500 text-white rounded-xl p-6 text-center shadow-lg">
              <div className="bg-blue-400 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Grid size={40} />
              </div>
              <h2 className="text-xl font-bold">Dizaines et unités</h2>
            </div>
          </div>

          <div 
            onClick={() => {
              setGameType('additions');
              setScreen('game');
            }}
            className="cursor-pointer transform transition hover:-translate-y-1"
          >
            <div className="bg-green-500 text-white rounded-xl p-6 text-center shadow-lg">
              <div className="bg-green-400 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Calculator size={40} />
              </div>
              <h2 className="text-xl font-bold">Additions</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Écran de jeu
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => {
            setScreen('menu');
            setGameType(null);
            setExercise(null);
          }}
          className="p-3 rounded-xl hover:bg-gray-100"
        >
          <Home className="w-8 h-8 text-gray-600" />
        </button>
        <div className="flex items-center">
          <Star className="w-6 h-6 text-yellow-400 mr-2" />
          <span className="text-xl font-bold">{score}</span>
        </div>
      </div>

      {exercise && (
        <div className="max-w-2xl mx-auto bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-8">{exercise.question}</h2>

          <div className="mb-8">
            {exercise.type === 'counting' && (
              <Points count={exercise.number} color="purple" />
            )}
            
            {exercise.type === 'groups' && (
              <div className="space-y-6">
                {/* Section dizaines */}
                <div>
                  <div className="text-blue-600 font-bold mb-2">Dizaines</div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <Points count={10} color="blue" />
                  </div>
                  <input
                    type="number"
                    value={groupAnswers.dizaines}
                    onChange={(e) => setGroupAnswers({
                      ...groupAnswers,
                      dizaines: e.target.value
                    })}
                    className="mt-4 w-16 h-16 text-2xl text-center border-4 border-blue-400 rounded-xl focus:border-blue-600 focus:outline-none"
                  />
                </div>

                {/* Section unités */}
                <div>
                  <div className="text-green-600 font-bold mb-2">Unités</div>
                  <Points count={exercise.number - 10} color="green" />
                  <input
                    type="number"
                    value={groupAnswers.unites}
                    onChange={(e) => setGroupAnswers({
                      ...groupAnswers,
                      unites: e.target.value
                    })}
                    className="mt-4 w-16 h-16 text-2xl text-center border-4 border-green-400 rounded-xl focus:border-green-600 focus:outline-none"
                  />
                </div>
              </div>
            )}
            
            {exercise.type === 'additions' && (
              <div className="flex items-center justify-center gap-4">
                <Points count={exercise.numbers[0]} color="green" />
                <span className="text-3xl">+</span>
                <Points count={exercise.numbers[1]} color="green" />
              </div>
            )}
          </div>

          {!exercise.isGroupExercise && (
            <div className="flex flex-col items-center gap-4">
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-20 h-20 text-3xl text-center border-4 border-blue-400 rounded-xl focus:border-blue-600 focus:outline-none"
              />
            </div>
          )}

          <button
            onClick={checkAnswer}
            className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 flex items-center gap-2 mx-auto mt-6"
          >
            Vérifier <ArrowRight className="w-6 h-6" />
          </button>

          {feedback && (
            <div className={`mt-6 text-2xl font-bold ${feedback.includes('Bravo') ? 'text-green-500' : 'text-orange-500'}`}>
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
