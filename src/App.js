import React, { useState, useEffect } from 'react';
import { Home, Trophy, Volume2, VolumeX, Star } from 'lucide-react';

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBigReward, setShowBigReward] = useState(false);
  const [depositingItems, setDepositingItems] = useState(false);

  // Composant SVG Pelleteuse réaliste
  const ExcavatorSVG = ({ isDigging, isCelebrating, size = 200, className = '' }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`${isDigging ? 'excavator-digging' : ''} ${isCelebrating ? 'excavator-celebrating' : ''} ${className}`}
    >
      {/* Chenilles */}
      <g className="tracks">
        <rect x="20" y="140" width="80" height="20" rx="10" fill="#1a1a1a" />
        <rect x="25" y="143" width="70" height="14" rx="7" fill="#333" />
        {/* Roues de chenilles */}
        <circle cx="35" cy="150" r="6" fill="#000" className="wheel" />
        <circle cx="55" cy="150" r="6" fill="#000" className="wheel" />
        <circle cx="75" cy="150" r="6" fill="#000" className="wheel" />
        <circle cx="90" cy="150" r="6" fill="#000" className="wheel" />
      </g>

      {/* Corps principal / Plateforme tournante */}
      <g className="body">
        <rect x="30" y="110" width="70" height="30" rx="5" fill="#FF8C00" />
        <rect x="35" y="115" width="60" height="20" rx="3" fill="#FFA500" />
        {/* Bandes réfléchissantes */}
        <rect x="32" y="112" width="66" height="4" fill="#FFD700" opacity="0.8" />
        <rect x="32" y="132" width="66" height="4" fill="#FFD700" opacity="0.8" />
      </g>

      {/* Cabine */}
      <g className="cabin">
        <rect x="45" y="85" width="40" height="30" rx="5" fill="#FF8C00" />
        <rect x="50" y="90" width="30" height="20" rx="2" fill="#87CEEB" opacity="0.7" />
        {/* Fenêtre avec reflet */}
        <rect x="52" y="92" width="12" height="8" fill="#FFF" opacity="0.4" />
        {/* Toit */}
        <rect x="45" y="82" width="40" height="6" rx="3" fill="#FFD700" />
      </g>

      {/* Bras principal (animé) */}
      <g className="arm" transform-origin="85 125">
        <rect x="85" y="120" width="50" height="12" rx="3" fill="#FF8C00" />
        <circle cx="85" cy="126" r="6" fill="#1a1a1a" />
        <circle cx="85" cy="126" r="3" fill="#FFD700" />

        {/* Avant-bras (animé) */}
        <g className="forearm" transform-origin="135 126">
          <rect x="135" y="121" width="40" height="10" rx="3" fill="#FFA500" />
          <circle cx="135" cy="126" r="5" fill="#1a1a1a" />
          <circle cx="135" cy="126" r="2" fill="#FFD700" />

          {/* Godet (seau) */}
          <g className="bucket" transform-origin="175 126">
            <path d="M175,121 L175,131 L190,136 L195,131 L195,116 Z" fill="#666" stroke="#1a1a1a" strokeWidth="2" />
            <path d="M175,121 L180,118 L195,118 L195,116 Z" fill="#444" />
            {/* Dents du godet */}
            <path d="M188,136 L186,143 L188,143 Z" fill="#333" />
            <path d="M191,136 L189,143 L191,143 Z" fill="#333" />
            <path d="M194,136 L192,143 L194,143 Z" fill="#333" />
          </g>
        </g>
      </g>

      {/* Échappement avec fumée */}
      <rect x="70" y="100" width="8" height="18" rx="3" fill="#1a1a1a" />
      {isDigging && (
        <g className="smoke">
          <circle cx="74" cy="95" r="4" fill="#888" opacity="0.5" className="smoke-puff" />
          <circle cx="76" cy="90" r="3" fill="#888" opacity="0.3" className="smoke-puff" />
        </g>
      )}

      {/* Détails et rivets */}
      <circle cx="50" cy="125" r="2" fill="#1a1a1a" opacity="0.6" />
      <circle cx="80" cy="125" r="2" fill="#1a1a1a" opacity="0.6" />
      <circle cx="60" cy="118" r="2" fill="#1a1a1a" opacity="0.6" />

      {/* Feux de travail */}
      <circle cx="42" cy="108" r="3" fill="#FFD700" opacity="0.8" />
      <circle cx="88" cy="108" r="3" fill="#FFD700" opacity="0.8" />
    </svg>
  );

  // Animation de confettis
  const Confetti = () => (
    <div className="confetti-container">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            backgroundColor: ['#FF8C00', '#FFD700', '#FFA500', '#FF6347', '#32CD32'][Math.floor(Math.random() * 5)]
          }}
        />
      ))}
    </div>
  );

  // Étoiles brillantes
  const SparkleStars = () => (
    <div className="sparkle-stars">
      {[...Array(15)].map((_, i) => (
        <Star
          key={i}
          className="sparkle-star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1}s`
          }}
          fill="#FFD700"
          color="#FFD700"
        />
      ))}
    </div>
  );

  // Fond de chantier animé
  const ConstructionBackground = () => (
    <div className="construction-background">
      <div className="background-excavator excavator-1">🚜</div>
      <div className="background-excavator excavator-2">🚜</div>
      <div className="background-excavator excavator-3">🚜</div>
      <div className="construction-cone cone-1">🚧</div>
      <div className="construction-cone cone-2">🚧</div>
      <div className="construction-cone cone-3">🚧</div>
      <div className="construction-cone cone-4">🚧</div>
    </div>
  );

  // Grosse pelleteuse de récompense qui construit
  const BigRewardExcavator = () => (
    <div className="big-reward-overlay">
      <div className="big-reward-content">
        <div className="big-excavator-animation">
          <ExcavatorSVG size={300} className="mega-excavator" isCelebrating={true} />
        </div>
        <div className="construction-animation">
          <div className="building-blocks">
            <div className="block block-1">🧱</div>
            <div className="block block-2">🧱</div>
            <div className="block block-3">🧱</div>
            <div className="block block-4">🧱</div>
            <div className="block block-5">🧱</div>
          </div>
        </div>
        <div className="big-reward-text">
          <h2 className="text-6xl font-black mb-4 text-orange-600">
            🏆 INCROYABLE ! 🏆
          </h2>
          <p className="text-4xl font-bold text-yellow-600">
            5 bonnes réponses d'affilée !
          </p>
          <p className="text-3xl font-bold text-gray-700 mt-4">
            La méga-pelleteuse construit un trophée pour toi ! 🏗️
          </p>
        </div>
      </div>
    </div>
  );

  // Items déposés par la pelleteuse
  const DepositedItems = () => (
    <div className="deposited-items">
      <div className="item item-1">⛑️</div>
      <div className="item item-2">🔨</div>
      <div className="item item-3">🧱</div>
    </div>
  );

  // Compteur visuel avec pelleteuses qui avancent
  const ExcavatorProgressTracker = () => {
    const progressPercentage = totalExercises > 0 ? (score / totalExercises) * 100 : 0;
    const excavatorPosition = Math.min(progressPercentage, 100);

    return (
      <div className="excavator-progress-tracker">
        <div className="progress-road">
          <div className="road-markings"></div>
          <div
            className="moving-excavator"
            style={{ left: `${excavatorPosition}%` }}
          >
            <div className="excavator-emoji">🚜</div>
          </div>
          <div className="progress-milestones">
            <div className="milestone start">🏁</div>
            <div className="milestone middle">⭐</div>
            <div className="milestone end">🏆</div>
          </div>
        </div>
        <div className="progress-info">
          <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
          <span className="progress-details">{score} / {totalExercises} réussies</span>
        </div>
      </div>
    );
  };

  // Système de sons amélioré
  const playSound = (type) => {
    if (!soundEnabled) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    switch(type) {
      case 'beep-beep':
        // Bip bip de recul
        [0, 0.3].forEach((delay) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.frequency.value = 880;
          oscillator.type = 'square';
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + delay);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + delay + 0.15);
          oscillator.start(audioContext.currentTime + delay);
          oscillator.stop(audioContext.currentTime + delay + 0.15);
        });
        break;

      case 'dig':
        // Son de creusage
        const digOsc = audioContext.createOscillator();
        const digGain = audioContext.createGain();
        digOsc.connect(digGain);
        digGain.connect(audioContext.destination);
        digOsc.frequency.value = 80;
        digOsc.type = 'sawtooth';
        digGain.gain.setValueAtTime(0.3, audioContext.currentTime);
        digGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        digOsc.start();
        digOsc.stop(audioContext.currentTime + 1);
        break;

      case 'bravo':
        // Son "Bravo!" enjoué
        const notes = [523.25, 659.25, 783.99, 1046.50]; // Do Mi Sol Do
        notes.forEach((freq, i) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.2);
          osc.start(audioContext.currentTime + i * 0.15);
          osc.stop(audioContext.currentTime + i * 0.15 + 0.2);
        });
        break;

      case 'motor':
        // Son de moteur
        const motorOsc = audioContext.createOscillator();
        const motorGain = audioContext.createGain();
        motorOsc.connect(motorGain);
        motorGain.connect(audioContext.destination);
        motorOsc.frequency.value = 120;
        motorOsc.type = 'square';
        motorGain.gain.setValueAtTime(0.2, audioContext.currentTime);
        motorOsc.start();
        motorOsc.stop(audioContext.currentTime + 0.4);
        break;

      case 'mega-success':
        // Son de méga succès
        const megaNotes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.50];
        megaNotes.forEach((freq, i) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.25, audioContext.currentTime + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
          osc.start(audioContext.currentTime + i * 0.1);
          osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
        });
        break;

      default:
        break;
    }
  };

  // Génération d'exercice avec technique +10-1, +20-1, +30-1
  const generateExercise = (addNumber) => {
    const firstNumber = Math.floor(Math.random() * 20) + 1;
    const result = firstNumber + addNumber;

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
      // Grosse récompense pour 5 d'affilée !
      setShowBigReward(true);
      playSound('mega-success');
      setTimeout(() => setShowBigReward(false), 5000);
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
      playSound('beep-beep');
      setIsDigging(true);
      setFeedback('');

      // Animation de creusage
      setTimeout(() => {
        setDepositingItems(true);
        playSound('dig');
      }, 500);

      setTimeout(() => {
        playSound('bravo');
        setShowResult(true);
        setShowConfetti(true);
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

        // Masquer confettis
        setTimeout(() => setShowConfetti(false), 3000);
        setTimeout(() => setDepositingItems(false), 2000);

        // Prochaine question après 3.5 secondes
        setTimeout(() => {
          setAnswer('');
          setFeedback('');
          setShowResult(false);
          setShowTechnique(false);
          setExercise(generateExercise(level));
        }, 3500);
      }, 2000);
    } else {
      playSound('motor');
      setFeedback('Pas encore ! Regarde la technique ci-dessous 👇');
      setShowTechnique(true);
      setStreakCount(0);
      setTotalExercises(totalExercises + 1);
    }
  };

  // Affichage de la technique de calcul
  const TechniqueDisplay = ({ technique, level }) => (
    <div className="technique-box">
      <h3 className="text-2xl font-bold text-orange-600 mb-4">
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
    return (
      <div className="progress-container">
        <ExcavatorProgressTracker />
        {streakCount > 0 && (
          <div className="streak-indicator">
            🔥 Série de {streakCount} bonnes réponses ! Continue ! 🔥
          </div>
        )}
      </div>
    );
  };

  // Menu principal
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-100 to-orange-50 p-6 relative overflow-hidden">
        <ConstructionBackground />

        <header className="text-center mb-12 relative z-10">
          <div className="mb-6 flex justify-center">
            <ExcavatorSVG size={250} isCelebrating={false} />
          </div>
          <h1 className="text-6xl font-black text-orange-600 mb-4 construction-title">
            🚜 CHANTIER DES ADDITIONS 🚜
          </h1>
          <p className="text-3xl text-yellow-700 font-bold">
            Apprends les additions avec les pelleteuses !
          </p>
        </header>

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-center text-2xl text-gray-700 mb-8 font-bold">
            Choisis ton niveau de chantier :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <button
              onClick={() => {
                setLevel(9);
                setScreen('game');
                playSound('motor');
              }}
              className="level-button transform hover:scale-110 transition-all"
            >
              <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-3xl p-8 text-center shadow-2xl border-4 border-black">
                <div className="text-6xl mb-4">🟢</div>
                <div className="text-7xl font-black mb-4">+ 9</div>
                <div className="text-3xl font-black mb-2">FACILE</div>
                <div className="text-lg font-bold opacity-90">Technique : +10 puis -1</div>
              </div>
            </button>

            <button
              onClick={() => {
                setLevel(19);
                setScreen('game');
                playSound('motor');
              }}
              className="level-button transform hover:scale-110 transition-all"
            >
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-3xl p-8 text-center shadow-2xl border-4 border-black">
                <div className="text-6xl mb-4">🟠</div>
                <div className="text-7xl font-black mb-4">+ 19</div>
                <div className="text-3xl font-black mb-2">MOYEN</div>
                <div className="text-lg font-bold opacity-90">Technique : +20 puis -1</div>
              </div>
            </button>

            <button
              onClick={() => {
                setLevel(29);
                setScreen('game');
                playSound('motor');
              }}
              className="level-button transform hover:scale-110 transition-all"
            >
              <div className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-3xl p-8 text-center shadow-2xl border-4 border-black">
                <div className="text-6xl mb-4">🔴</div>
                <div className="text-7xl font-black mb-4">+ 29</div>
                <div className="text-3xl font-black mb-2">DIFFICILE</div>
                <div className="text-lg font-bold opacity-90">Technique : +30 puis -1</div>
              </div>
            </button>
          </div>

          {/* Badges débloqués */}
          {badges.length > 0 && (
            <div className="badges-display">
              <h3 className="text-3xl font-black text-center mb-4 text-orange-600">
                🏆 TES BADGES 🏆
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
                      <div className="text-5xl mb-2">{badgeInfo.icon}</div>
                      <div className="text-lg font-black">{badgeInfo.name}</div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-12 text-5xl relative z-10">
          🏗️ 👷‍♂️ 🚧 👷‍♀️ 🏗️
        </div>
      </div>
    );
  }

  // Écran de jeu
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-50 to-yellow-100 p-6 relative overflow-hidden">
      <ConstructionBackground />

      {showConfetti && <Confetti />}
      {showConfetti && <SparkleStars />}
      {showBigReward && <BigRewardExcavator />}

      {/* Barre du haut */}
      <div className="top-bar relative z-10">
        <button
          onClick={() => {
            setScreen('menu');
            setScore(0);
            setTotalExercises(0);
            setStreakCount(0);
            playSound('beep-beep');
          }}
          className="home-button"
        >
          <Home className="w-10 h-10 text-gray-700" />
        </button>

        <div className="score-display">
          <Trophy className="w-10 h-10 text-yellow-600" />
          <span className="text-4xl font-black text-orange-600">{score}</span>
        </div>

        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (!soundEnabled) playSound('beep-beep');
          }}
          className="sound-button"
          title={soundEnabled ? "Désactiver les sons" : "Activer les sons"}
        >
          {soundEnabled ? (
            <Volume2 className="w-10 h-10 text-orange-600" />
          ) : (
            <VolumeX className="w-10 h-10 text-gray-400" />
          )}
        </button>
      </div>

      {exercise && (
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Barre de progression */}
          <ProgressBar />

          {/* Indication du niveau */}
          <div className="text-center mb-6">
            <div className="level-indicator">
              <span className="text-3xl font-black text-orange-700">
                🏗️ CHANTIER : ADDITIONS AVEC +{level} 🏗️
              </span>
            </div>
          </div>

          {/* Zone de calcul */}
          <div className="exercise-box">
            <h2 className="text-5xl font-black mb-8 text-center text-gray-800">
              {exercise.question}
            </h2>

            {/* Zone de réponse */}
            <div className="answer-section">
              <div className="text-3xl font-black text-orange-600 mb-4">TA RÉPONSE :</div>
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
                {isDigging ? '🚜 LA PELLETEUSE CREUSE...' : '✓ VÉRIFIER'}
              </button>
            </div>
          </div>

          {/* Technique de calcul (si erreur) */}
          {showTechnique && !showResult && (
            <TechniqueDisplay technique={exercise.technique} level={level} />
          )}

          {/* Zone de la pelleteuse */}
          <div className="excavator-zone">
            <div className="flex flex-col items-center gap-6 relative">
              <ExcavatorSVG size={220} isDigging={isDigging} isCelebrating={showResult} />

              {depositingItems && <DepositedItems />}

              {isDigging && (
                <div className="text-3xl font-black text-orange-700 animate-pulse">
                  🚧 LA PELLETEUSE CREUSE POUR TROUVER LA RÉPONSE... 🚧
                </div>
              )}

              {showResult && (
                <>
                  <div className="celebration-excavators">
                    <div className="excavator-left">
                      <ExcavatorSVG size={150} isCelebrating={true} />
                    </div>
                    <div className="excavator-right">
                      <ExcavatorSVG size={150} isCelebrating={true} />
                    </div>
                  </div>
                  <div className="result-box">
                    <div className="text-6xl mb-4">🏆</div>
                    <div className="text-5xl font-black text-green-600 mb-2">
                      RÉPONSE : {exercise.answer}
                    </div>
                    <div className="text-3xl font-black text-orange-600">
                      ⭐ BRAVO ! EXCELLENT TRAVAIL ! ⭐
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
