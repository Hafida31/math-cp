# 🚜 Chantier des Additions

Application interactive pour apprendre les additions avec 9, 19 et 29 sur le thème du chantier de construction avec des pelleteuses animées réalistes.

## 🎯 À propos

Cette application a été spécialement conçue pour aider les enfants avec TSA (Trouble du Spectre de l'Autisme) et TDAH (Trouble du Déficit de l'Attention avec Hyperactivité) à apprendre les additions de manière ludique et visuelle.

## ✨ Fonctionnalités

### 🎨 Interface adaptée TSA/TDAH
- **Visuelle et épurée** : Grands boutons, couleurs contrastées mais apaisantes
- **Prévisible et claire** : Structure simple et cohérente sans distractions
- **Sans stress** : Pas de limite de temps, progression au rythme de l'enfant
- **Feedback positif immédiat** : Encouragements constants et bienveillants
- **Focus clair** : Une tâche à la fois, navigation intuitive
- **Adaptabilité sensorielle** : Support pour `prefers-reduced-motion` pour réduire les animations si nécessaire

### 🚜 Pelleteuses SVG animées réalistes
- **Design détaillé** : Pelleteuses SVG avec chenilles, cabine, bras articulé et godet
- **Animations fluides** :
  - Bras qui creuse avec rotation réaliste
  - Godet qui ramasse
  - Roues de chenilles qui tournent
  - Pelleteuses qui célèbrent les réussites
- **Pelleteuses de célébration** : Deux pelleteuses apparaissent pour féliciter l'enfant

### 📚 Niveaux d'apprentissage avec technique pédagogique
- 🟢 **Niveau 1** : Additions avec +9 (FACILE)
  - Technique : +10 puis -1
- 🟠 **Niveau 2** : Additions avec +19 (MOYEN)
  - Technique : +20 puis -1
- 🔴 **Niveau 3** : Additions avec +29 (DIFFICILE)
  - Technique : +30 puis -1

### 💡 Visualisation de la technique de calcul
- **Affichage pédagogique** : En cas d'erreur, l'application montre la technique étape par étape
- **Méthode +10-1, +20-1, +30-1** : Facilite le calcul mental
- **Explication visuelle** : Chaque étape est clairement illustrée

### 📊 Système de progression
- **Barre de progression** : Visualisation du taux de réussite
- **Score en temps réel** : Compteur de bonnes réponses
- **Série (Streak)** : Affichage du nombre de bonnes réponses consécutives
- **Statistiques** : X / Y réussies pour suivre les progrès

### 🏆 Système de récompenses adapté
- **Badges débloquables** :
  - ⭐ Premier chantier (5 bonnes réponses)
  - 🏆 Expert pelleteuse (10 bonnes réponses)
  - 🔥 3 d'affilée (3 réponses consécutives)
  - 💎 Série incroyable (5 réponses consécutives)
- **Animations de célébration** : Pelleteuses qui dansent, pop-in des résultats
- **Feedback visuel immédiat** : Couleurs et animations encourageantes

### 🔊 Sons optionnels
- **Contrôle du son** : Bouton ON/OFF pour activer/désactiver les sons
- **Sons synthétiques** :
  - Son de moteur au démarrage
  - Son de creusage pendant l'action
  - Mélodie de succès pour les bonnes réponses
- **Web Audio API** : Sons générés sans fichiers externes

## 🚀 Démarrage

### Installation
```bash
npm install
```

### Lancer l'application en développement
```bash
npm start
```

L'application s'ouvrira dans votre navigateur à l'adresse `http://localhost:3000`

### Build pour production
```bash
npm run build
```

### Déploiement
L'application se déploie automatiquement sur GitHub Pages via GitHub Actions lors d'un push sur la branche `main`.

## 🎮 Comment jouer

1. **Choisis ton niveau** : Sélectionne +9, +19 ou +29 selon la difficulté souhaitée
2. **Active les sons (optionnel)** : Clique sur le bouton son en haut à droite
3. **Lis la question** : Observe le problème d'addition affiché
4. **Tape ta réponse** : Entre le résultat dans la grande case orange
5. **Vérifie** : Clique sur "Vérifier" ou appuie sur Entrée
6. **La pelleteuse creuse** :
   - ✅ Si c'est bon : Elle trouve le trésor et deux pelleteuses célèbrent !
   - ❌ Si c'est faux : Regarde la technique de calcul affichée ci-dessous
7. **Débloque des badges** : Collecte les badges en progressant
8. **Suis ta progression** : Regarde ta barre de progression et ton taux de réussite

## 💡 Conseils pour les parents et éducateurs

### Utilisation pédagogique
- **Commencez progressivement** : Niveau facile (+9) pour construire la confiance
- **Utilisez la technique** : Montrez la méthode +10-1, +20-1, +30-1 avant de commencer
- **Pas de pression** : L'enfant peut prendre tout son temps
- **Valorisez les efforts** : Pas seulement les résultats
- **Sons optionnels** : Activez-les si l'enfant apprécie, sinon laissez désactivés
- **Sessions courtes** : 10-15 minutes maximum pour maintenir la concentration

### Adaptations sensorielles
- **Mode réduit** : L'application respecte `prefers-reduced-motion` du navigateur
- **Sons contrôlables** : Désactivables à tout moment
- **Couleurs apaisantes** : Dégradés doux, pas de flashs
- **Animations fluides** : Douces et prévisibles

### Suivi des progrès
- **Barre de progression** : Montre le taux de réussite global
- **Badges** : Objectifs concrets et motivants
- **Série** : Encourage la concentration

## 🏗️ Architecture technique

### Composants React
- **App.js** : Composant principal avec toute la logique
- **ExcavatorSVG** : Pelleteuse SVG animée avec états (creusage, célébration)
- **CelebrationExcavators** : Pelleteuses de célébration
- **TechniqueDisplay** : Affichage pédagogique de la technique
- **ProgressBar** : Barre de progression et statistiques

### Animations CSS
- **excavator-dig** : Rotation du bras pour creuser
- **bucket-scoop** : Mouvement du godet
- **excavator-celebrate** : Danse de célébration
- **tracks-move** : Rotation des roues
- **slide-in** : Arrivée des pelleteuses latérales
- **pop-in** : Apparition des résultats
- **pulse-glow** : Pulsation de la série

### État React
- `screen` : Menu ou jeu
- `level` : 9, 19 ou 29
- `exercise` : Exercice actuel avec question et technique
- `score` : Nombre de bonnes réponses
- `totalExercises` : Total d'exercices tentés
- `streakCount` : Nombre de réponses consécutives
- `badges` : Badges débloqués
- `soundEnabled` : État des sons
- `showTechnique` : Affichage de la technique

### Web Audio API
- Génération de sons synthétiques sans fichiers audio
- Sons adaptatifs selon les actions
- Contrôle du volume et de la durée

## 🛠️ Technologies utilisées

- **React 18.2.0** : Framework JavaScript
- **Tailwind CSS 3.4.1** : Framework CSS utilitaire
- **Lucide React 0.316.0** : Icônes (Home, Trophy, Volume)
- **PostCSS 8.4.33** : Traitement CSS
- **Web Audio API** : Génération de sons

## 📱 Compatibilité

- **Navigateurs modernes** : Chrome, Firefox, Safari, Edge
- **Responsive** : Adapté mobile, tablette et desktop
- **Accessibilité** : Focus visible, support clavier
- **Performances** : Build optimisé ~50kB gzippé

## 🎨 Personnalisation

### Modifier les niveaux
Éditez les valeurs dans `App.js` ligne 147-162 pour changer 9, 19, 29.

### Ajouter des badges
Ajoutez des conditions dans `checkAndAwardBadges()` ligne 179-192.

### Modifier les couleurs
Personnalisez les dégradés et couleurs dans `index.css`.

## 📝 Licence

Ce projet est sous licence privée.

## 🙏 Crédits

Développé avec ❤️ pour aider les enfants à apprendre les mathématiques de manière amusante et adaptée.
