# Voting DApp

## 📋 Description

Application décentralisée (DApp) de vote développée avec Hardhat 3 pour le backend blockchain et React Router pour le frontend. Ce projet suit les principes du Software Craftsmanship et les bonnes pratiques du Clean Code.

## 🎯 Objectifs

- Créer une application de vote sécurisée sur la blockchain
- Implémenter des tests complets (frontend et backend)
- Respecter les principes du Clean Code et du Software Craftsmanship
- Fournir une documentation complète et claire

## 🛠️ Technologies

### Backend
- **Hardhat 3** - Framework de développement Ethereum
- **Solidity** - Langage de smart contracts
- **Viem** - Bibliothèque d'interaction blockchain

### Frontend
- **React** - Bibliothèque UI
- **React Router** - Gestion de la navigation
- **Wagmi** - Hooks React pour Ethereum
- **Viem** - Client TypeScript pour Ethereum

## 📁 Structure du Projet

```
votingDapp/
├── contracts/          # Smart contracts Solidity
├── test/              # Tests backend (Hardhat)
├── scripts/           # Scripts de déploiement
├── frontend/          # Application React
│   ├── src/
│   └── tests/        # Tests frontend
└── README.md
```

## 🚀 Installation et Démarrage

### Backend (Smart Contracts)

```bash
# Depuis le dossier backend/
cd backend

# Installer les dépendances
npm install

# Compiler les contrats
npx hardhat compile

# Lancer un nœud local (dans un terminal séparé)
npx hardhat node

# Déployer les contrats sur le réseau local
npx hardhat ignition deploy ignition/modules/Voting.ts --network localhost
```

### Frontend

```bash
# Depuis le dossier frontend/
cd frontend

# Installer les dépendances
npm install

# Mettre à jour l'adresse du contrat dans core/web3/contants.ts
# avec l'adresse obtenue lors du déploiement

# Démarrer l'application
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🧪 Tests

```bash
# Tests backend (smart contracts)
cd backend
npx hardhat test

# Tests frontend
cd frontend
npm test
```

## 📚 Documentation Complète

- **[Guide d'Utilisation](./GUIDE_UTILISATION.md)** : Instructions détaillées pour utiliser l'application
- **[Configuration](./CONFIGURATION.md)** : Configuration des variables d'environnement et réseaux
- **[Backend README](./backend/README.md)** : Documentation du backend
- **[Frontend README](./frontend/README.md)** : Documentation du frontend

## 📝 Principes Suivis

- **Clean Code** : Code lisible, maintenable et bien organisé
- **Software Craftsmanship** : Excellence technique et professionnalisme
- **Documentation** : Code et fonctionnalités documentés
- **Testing** : Couverture de tests complète

## ⚙️ Architecture Technique

### Smart Contract (Solidity)
- **Voting.sol** : Contrat principal gérant le processus de vote
  - Gestion des électeurs (liste blanche)
  - Enregistrement des propositions
  - Système de vote sécurisé
  - Comptabilisation automatique des résultats
  - Émission d'événements pour le tracking

### Frontend (React)
- **React Router** : Navigation et routing
- **Wagmi** : Hooks React pour interagir avec Ethereum
- **RainbowKit** : Connexion wallet intuitive
- **Viem** : Client TypeScript pour Ethereum
- **Tailwind CSS + shadcn/ui** : Design moderne et responsive

### Composants Principaux
```
frontend/app/
├── components/
│   ├── adminDashboard.tsx          # Dashboard administrateur
│   ├── voterDashboard.tsx          # Dashboard électeur
│   ├── workflowStatusManagement.tsx # Gestion des phases
│   └── shared/
│       ├── addvoter.tsx            # Ajout d'électeurs
│       ├── addProposals.tsx        # Ajout de propositions
│       ├── vote.tsx                # Interface de vote
│       ├── results.tsx             # Affichage des résultats
│       └── proposalLIst.tsx        # Liste des propositions
├── lib/hooks/
│   ├── useAddVoterToWhiteList.ts   # Hook ajout électeur
│   ├── useAddProposal.ts           # Hook ajout proposition
│   ├── useVote.ts                  # Hook vote
│   ├── useGetWinner.ts             # Hook récupération gagnant
│   ├── userIsOwner.ts              # Vérification admin
│   └── userIsVoter.ts              # Vérification électeur
└── routes/
    ├── index.tsx                   # Page d'accueil
    ├── admin.tsx                   # Page admin
    ├── voter.tsx                   # Page électeur
    └── results.tsx                 # Page résultats
```

## 📋 Règles Fonctionnelles

Le système de vote implémente les règles suivantes :

✅ **L'enregistrement d'une liste blanche d'électeurs**
   - Seul l'administrateur peut ajouter des électeurs

✅ **Démarrage de la session d'enregistrement des propositions**
   - Contrôlé par l'administrateur

✅ **Enregistrement des propositions**
   - Accessible uniquement aux électeurs inscrits

✅ **Fin de la session d'enregistrement des propositions**
   - Contrôlé par l'administrateur

✅ **Démarrage de la session de vote**
   - Contrôlé par l'administrateur

✅ **Vote pour les propositions**
   - Accessible uniquement aux électeurs inscrits
   - Un électeur ne peut voter qu'une seule fois

✅ **Fin de la session de vote**
   - Contrôlé par l'administrateur

✅ **Comptabilisation des votes**
   - Effectuée par l'administrateur
   - Détermine automatiquement la proposition gagnante

✅ **Consultation des résultats**
   - Accessible à tous après la comptabilisation

## � Fichiers Créés

Cette implémentation a ajouté les fichiers suivants :

### Hooks Personnalisés
- ✅ `frontend/app/lib/hooks/useVote.ts` - Vote pour une proposition
- ✅ `frontend/app/lib/hooks/useGetWinner.ts` - Récupération du gagnant

### Composants
- ✅ `frontend/app/components/shared/vote.tsx` - Interface de vote
- ✅ `frontend/app/components/shared/results.tsx` - Affichage des résultats
- ✅ `frontend/app/components/voterDashboard.tsx` - Dashboard électeur complet

### Pages
- ✅ `frontend/app/routes/voter.tsx` - Page électeur
- ✅ `frontend/app/routes/results.tsx` - Page résultats publique
- ✅ `frontend/app/routes/index.tsx` - Page d'accueil améliorée
- ✅ `frontend/app/routes/_layout.tsx` - Layout avec navigation

### Documentation
- ✅ `GUIDE_UTILISATION.md` - Guide utilisateur complet
- ✅ `CONFIGURATION.md` - Instructions de configuration
- ✅ `CHECKLIST.md` - Checklist de vérification
- ✅ `IMPLEMENTATIONS.md` - Détails des implémentations
- ✅ `UX_FLOW.md` - Flux utilisateur et captures d'écran
- ✅ `QUICKSTART.md` - Démarrage rapide

### Scripts
- ✅ `start.sh` - Script de démarrage automatique

## 🎯 État du Projet

✅ **Application 100% fonctionnelle**
- Toutes les règles fonctionnelles implémentées
- Smart contract complet et testé
- Frontend avec tous les composants
- Documentation complète
- Code suivant les principes du Clean Code

## �👥 Contribution

Ce projet suit les standards de qualité du Software Craftsmanship. Toute contribution doit respecter ces principes.