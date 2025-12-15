import React, { useState, useEffect } from 'react';
import { Home, Trophy, Volume2, VolumeX } from 'lucide-react';

const App = () => {
  const [screen, setScreen] = useState('menu');
  const [level, setLevel] = useState(9);
  const [exercise, setExercise] = useState(null);
  const [score, setScore] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isDigging, setIsDigging] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showTechnique, setShowTechnique] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [badges, setBadges] = useState([]);

  // Composant SVG Pelleteuse réaliste
  const ExcavatorSVG = ({ isDigging, isCelebrating }) => (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      className={`${isDigging ? 'excavator-digging' : ''} ${isCelebrating ? 'excavator-celebrating' : ''}`}
    >
      {/* Chenilles */}
      <g className="tracks">
        <rect x="20" y="140" width="80" height="20" rx="10" fill="#333" />
        <rect x="25" y="143" width="70" height="14" rx="7" fill="#555" />
        {/* Roues de chenilles */}
        <circle cx="35" cy="150" r="6" fill="#222" />
        <circle cx="55" cy="150" r="6" fill="#222" />
        <circle cx="75" cy="150" r="6" fill="#222" />
        <circle cx="90" cy="150" r="6" fill="#222" />
      </g>

      {/* Corps principal / Plateforme tournante */}
      <g className="body">
        <rect x="30" y="110" width="70" height="30" rx="5" fill="#FFD700" />
        <rect x="35" y="115" width="60" height="20" rx="3" fill="#FFA500" />
      </g>

      {/* Cabine */}
      <g className="cabin">
        <rect x="45" y="85" width="40" height="30" rx="5" fill="#4A90E2" />
        <rect x="50" y="90" width="30" height="20" rx="2" fill="#87CEEB" opacity="0.6" />
        {/* Fenêtre avec reflet */}
        <rect x="52" y="92" width="12" height="8" fill="#FFF" opacity="0.3" />
      </g>

      {/* Bras principal (animé) */}
      <g className="arm" transform-origin="85 125">
        <rect x="85" y="120" width="50" height="12" rx="3" fill="#FFD700" />
        <circle cx="85" cy="126" r="6" fill="#333" />

        {/* Avant-bras (animé) */}
        <g className="forearm" transform-origin="135 126">
          <rect x="135" y="121" width="40" height="10" rx="3" fill="#FFA500" />
          <circle cx="135" cy="126" r="5" fill="#333" />

          {/* Godet (seau) */}
          <g className="bucket" transform-origin="175 126">
            <path d="M175,121 L175,131 L190,136 L195,131 L195,116 Z" fill="#888" stroke="#333" strokeWidth="2" />
            <path d="M175,121 L180,118 L195,118 L195,116 Z" fill="#666" />
            {/* Dents du godet */}
            <path d="M190,136 L188,142 L190,142 Z" fill="#555" />
            <path d="M193,135 L191,141 L193,141 Z" fill="#555" />
          </g>
        </g>
      </g>

      {/* Échappement */}
      <rect x="70" y="105" width="6" height="15" rx="2" fill="#333" />

      {/* Détails et rivets */}
      <circle cx="50" cy="125" r="2" fill="#333" opacity="0.5" />
      <circle cx="80" cy="125" r="2" fill="#333" opacity="0.5" />
    </svg>
  );

  // Pelleteuses de célébration
  const CelebrationExcavators = () => (
    <div className="celebration-excavators">
      <div className="excavator-left">
        <ExcavatorSVG isCelebrating={true} />
      </div>
      <div className="excavator-right">
        <ExcavatorSVG isCelebrating={true} />
      </div>
    </div>
  );

  // Système de sons
  const playSound = (type) => {
    if (!soundEnabled) return;

    // Création de sons synthétiques simples
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch(type) {
      case 'dig':
        // Son de creusage (bruit basse fréquence)
        oscillator.frequency.value = 80;
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
      case 'success':
        // Son de succès (notes ascendantes)
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Do
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Mi
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Sol
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
      case 'motor':
        // Son de moteur
        oscillator.frequency.value = 120;
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      default:
        break;
    }
  };

  // Génération d'exercice avec technique +10-1, +20-1, +30-1
  const generateExercise = (addNumber) => {
    const firstNumber = Math.floor(Math.random() * 20) + 1;
    const result = firstNumber + addNumber;

    // Calcul de la technique : +10-1, +20-1, ou +30-1
    let intermediateStep, subtractStep;
    switch(addNumber) {
      case 9:
        intermediateStep = firstNumber + 10;
        subtractStep = 1;
        break;
      case 19:
        intermediateStep = firstNumber + 20;
        subtractStep = 1;
        break;
      case 29:
        intermediateStep = firstNumber + 30;
        subtractStep = 1;
        break;
      default:
        intermediateStep = firstNumber + addNumber;
        subtractStep = 0;
    }

    return {
      numbers: [firstNumber, addNumber],
      question: `${firstNumber} + ${addNumber} = ?`,
      answer: result.toString(),
      technique: {
        step1: `${firstNumber} + ${addNumber + 1}`,
        step1Result: intermediateStep,
        step2: `${intermediateStep} - ${subtractStep}`,
        finalResult: result
      }
    };
  };

  // Vérifier et attribuer des badges
  const checkAndAwardBadges = (newScore, newStreak) => {
    if (newScore === 5 && !badges.includes('first5')) {
      setBadges([...badges, 'first5']);
    }
    if (newScore === 10 && !badges.includes('first10')) {
      setBadges([...badges, 'first10']);
    }
    if (newStreak === 3 && !badges.includes('streak3')) {
      setBadges([...badges, 'streak3']);
    }
    if (newStreak === 5 && !badges.includes('streak5')) {
      setBadges([...badges, 'streak5']);
    }
  };

  // Initialisation d'un nouvel exercice
  useEffect(() => {
    if (level && screen === 'game') {
      const newExercise = generateExercise(level);
      setExercise(newExercise);
      setAnswer('');
      setFeedback('');
      setShowResult(false);
      setShowTechnique(false);
    }
  }, [level, screen]);

  // Vérification de la réponse
  const checkAnswer = () => {
    if (!answer) return;

    if (answer === exercise.answer) {
      playSound('dig');
      setIsDigging(true);
      setFeedback('');

      // Animation de creusage
      setTimeout(() => {
        playSound('success');
        setShowResult(true);
        setFeedback('SUPER ! Tu as trouvé le trésor !');

        const newScore = score + 1;
        const newStreak = streakCount + 1;
        const newTotal = totalExercises + 1;

        setScore(newScore);
        setStreakCount(newStreak);
        setTotalExercises(newTotal);
        setIsDigging(false);

        // Vérifier les badges
        checkAndAwardBadges(newScore, newStreak);

        // Prochaine question après 3 secondes
        setTimeout(() => {
          setAnswer('');
          setFeedback('');
          setShowResult(false);
          setShowTechnique(false);
          setExercise(generateExercise(level));
        }, 3000);
      }, 2000);
    } else {
      playSound('motor');
      setFeedback('Pas encore ! Regarde la technique ci-dessous 👇');
      setShowTechnique(true);
      setStreakCount(0); // Réinitialiser la série
      setTotalExercises(totalExercises + 1);
    }
  };

  // Affichage de la technique de calcul
  const TechniqueDisplay = ({ technique, level }) => (
    <div className="technique-box">
      <h3 className="text-2xl font-bold text-purple-700 mb-4">
        💡 Technique de calcul :
      </h3>
      <div className="technique-steps">
        <div className="technique-step">
          <span className="step-number">1️⃣</span>
          <span className="step-text">
            Ajoute {level + 1} : {technique.step1} = <strong>{technique.step1Result}</strong>
          </span>
        </div>
        <div className="technique-arrow">↓</div>
        <div className="technique-step">
          <span className="step-number">2️⃣</span>
          <span className="step-text">
            Enlève 1 : {technique.step2} = <strong>{technique.finalResult}</strong>
          </span>
        </div>
      </div>
      <div className="technique-explanation">
        <p>
          Pour ajouter {level}, c'est plus facile d'ajouter {level + 1} puis de retirer 1 !
        </p>
      </div>
    </div>
  );

  // Barre de progression
  const ProgressBar = () => {
    const percentage = totalExercises > 0 ? Math.min((score / totalExercises) * 100, 100) : 0;

    return (
      <div className="progress-container">
        <div className="progress-label">
          <span>Taux de réussite : {totalExercises > 0 ? Math.round(percentage) : 0}%</span>
          <span>{score} / {totalExercises} réussies</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        {streakCount > 0 && (
          <div className="streak-indicator">
            🔥 Série de {streakCount} bonnes réponses !
          </div>
        )}
      </div>
    );
  };

  // Menu principal
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-6">
        <header className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <ExcavatorSVG isCelebrating={false} />
          </div>
          <h1 className="text-5xl font-bold text-amber-700 mb-4">
            🚜 Chantier des Additions 🚜
          </h1>
          <p className="text-2xl text-gray-700 font-semibold">
            Apprends les additions avec les pelleteuses !
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xl text-gray-600 mb-8 font-semibold">
            Choisis ton niveau de chantier :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <button
              onClick={() => {
                setLevel(9);
                setScreen('game');
                playSound('motor');
              }}
              className="level-button"
            >
              <div className="bg-green-500 text-white rounded-3xl p-8 text-center shadow-2xl border-4 border-green-600 hover:bg-green-600 transition-all">
                <div className="text-6xl mb-4">🟢</div>
                <div className="text-6xl font-bold mb-4">+ 9</div>
                <div className="text-2xl font-bold mb-2">FACILE</div>
                <div className="text-sm opacity-90">Technique : +10 puis -1</div>
              </div>
            </button>

            <button
              onClick={() => {
                setLevel(19);
                setScreen('game');
                playSound('motor');
              }}
              className="level-button"
            >
              <div className="bg-orange-500 text-white rounded-3xl p-8 text-center shadow-2xl border-4 border-orange-600 hover:bg-orange-600 transition-all">
                <div className="text-6xl mb-4">🟠</div>
                <div className="text-6xl font-bold mb-4">+ 19</div>
                <div className="text-2xl font-bold mb-2">MOYEN</div>
                <div className="text-sm opacity-90">Technique : +20 puis -1</div>
              </div>
            </button>

            <button
              onClick={() => {
                setLevel(29);
                setScreen('game');
                playSound('motor');
              }}
              className="level-button"
            >
              <div className="bg-red-500 text-white rounded-3xl p-8 text-center shadow-2xl border-4 border-red-600 hover:bg-red-600 transition-all">
                <div className="text-6xl mb-4">🔴</div>
                <div className="text-6xl font-bold mb-4">+ 29</div>
                <div className="text-2xl font-bold mb-2">DIFFICILE</div>
                <div className="text-sm opacity-90">Technique : +30 puis -1</div>
              </div>
            </button>
          </div>

          {/* Badges débloqués */}
          {badges.length > 0 && (
            <div className="badges-display">
              <h3 className="text-2xl font-bold text-center mb-4 text-amber-700">
                🏆 Tes badges 🏆
              </h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {badges.map((badgeId) => {
                  const badgeInfo = [
                    { id: 'first5', name: 'Premier chantier !', icon: '⭐' },
                    { id: 'first10', name: 'Expert pelleteuse !', icon: '🏆' },
                    { id: 'streak3', name: '3 d\'affilée !', icon: '🔥' },
                    { id: 'streak5', name: 'Série incroyable !', icon: '💎' }
                  ].find(b => b.id === badgeId);

                  return badgeInfo ? (
                    <div key={badgeId} className="badge-item">
                      <div className="text-4xl mb-2">{badgeInfo.icon}</div>
                      <div className="text-sm font-semibold">{badgeInfo.name}</div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-12 text-4xl">
          🏗️ 👷‍♂️ 🚧 👷‍♀️ 🏗️
        </div>
      </div>
    );
  }

  // Écran de jeu
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-emerald-50 p-6">
      {/* Barre du haut */}
      <div className="top-bar">
        <button
          onClick={() => {
            setScreen('menu');
            setScore(0);
            setTotalExercises(0);
            setStreakCount(0);
          }}
          className="home-button"
        >
          <Home className="w-10 h-10 text-gray-600" />
        </button>

        <div className="score-display">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <span className="text-3xl font-bold text-gray-800">{score}</span>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="sound-button"
          title={soundEnabled ? "Désactiver les sons" : "Activer les sons"}
        >
          {soundEnabled ? (
            <Volume2 className="w-10 h-10 text-blue-600" />
          ) : (
            <VolumeX className="w-10 h-10 text-gray-400" />
          )}
        </button>
      </div>

      {exercise && (
        <div className="max-w-4xl mx-auto">
          {/* Barre de progression */}
          <ProgressBar />

          {/* Indication du niveau */}
          <div className="text-center mb-6">
            <div className="level-indicator">
              <span className="text-2xl font-bold">
                Chantier : Additions avec +{level}
              </span>
            </div>
          </div>

          {/* Zone de calcul */}
          <div className="exercise-box">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
              {exercise.question}
            </h2>

            {/* Zone de réponse */}
            <div className="answer-section">
              <div className="text-2xl font-bold text-gray-600 mb-4">Ta réponse :</div>
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                className="answer-input"
                disabled={isDigging || showResult}
                autoFocus
              />

              <button
                onClick={checkAnswer}
                disabled={isDigging || showResult || !answer}
                className="verify-button"
              >
                {isDigging ? '🚜 La pelleteuse creuse...' : '✓ Vérifier'}
              </button>
            </div>
          </div>

          {/* Technique de calcul (si erreur) */}
          {showTechnique && !showResult && (
            <TechniqueDisplay technique={exercise.technique} level={level} />
          )}

          {/* Zone de la pelleteuse */}
          <div className="excavator-zone">
            <div className="flex flex-col items-center gap-6">
              <ExcavatorSVG isDigging={isDigging} isCelebrating={showResult} />

              {isDigging && (
                <div className="text-2xl font-bold text-amber-800 animate-pulse">
                  🚧 La pelleteuse creuse pour trouver la réponse... 🚧
                </div>
              )}

              {showResult && (
                <>
                  <CelebrationExcavators />
                  <div className="result-box">
                    <div className="text-5xl mb-4">🏆</div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      Réponse : {exercise.answer}
                    </div>
                    <div className="text-2xl text-gray-700">
                      ⭐ Excellent travail ! ⭐
                    </div>
                  </div>
                </>
              )}

              {feedback && !showResult && (
                <div className={`feedback-box ${
                  feedback.includes('SUPER')
                    ? 'feedback-success'
                    : 'feedback-retry'
                }`}>
                  {feedback}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
