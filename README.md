# 🗳️ Voting DApp - Application de Vote Décentralisée

<div align="center">

![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-blue)
![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)
![License](https://img.shields.io/badge/License-MIT-green)

**Une application de vote transparente, sécurisée et décentralisée sur la blockchain Ethereum**

[Démarrage Rapide](#-démarrage-rapide) • [Fonctionnalités](#-fonctionnalités) • [Documentation](#-documentation) • [Technologies](#-technologies)

</div>

---

## 📋 Qu'est-ce que c'est ?

**Voting DApp** est une application décentralisée permettant d'organiser des votes **transparents**, **sécurisés** et **infalsifiables** grâce à la technologie blockchain.

### 🎯 Pourquoi utiliser la blockchain pour voter ?

- **🔒 Sécurité** : Les votes sont stockés de manière immuable sur la blockchain
- **👁️ Transparence** : Tout le processus est vérifiable publiquement
- **🛡️ Intégrité** : Impossible de modifier ou supprimer un vote après son enregistrement
- **⚡ Autonomie** : Pas besoin d'intermédiaire centralisé
- **🔐 Confidentialité** : Seule l'adresse wallet est visible, pas l'identité

### ✨ Cas d'usage

- Votes communautaires pour des projets Web3
- Décisions collectives dans une DAO
- Élections internes d'organisations
- Sondages décentralisés avec preuve on-chain

## 🎯 Fonctionnalités Principales

## 🎯 Fonctionnalités Principales

### Pour l'Administrateur 👑

- ✅ Ajouter des électeurs à la liste blanche
- ✅ Gérer les 6 phases du workflow de vote
- ✅ Démarrer/arrêter l'enregistrement des propositions
- ✅ Démarrer/arrêter la session de vote
- ✅ Comptabiliser les votes et proclamer le gagnant

### Pour les Électeurs �️

- ✅ Soumettre des propositions pendant la phase d'enregistrement
- ✅ Consulter toutes les propositions enregistrées
- ✅ Voter pour une proposition (un vote par électeur)
- ✅ Voir les résultats après la comptabilisation

### Pour Tous 👀

- ✅ Consulter l'état actuel du vote
- ✅ Voir les statistiques en temps réel
- ✅ Accéder aux résultats finaux après le décompte

## 🚀 Démarrage Rapide

### Prérequis

Avant de commencer, assurez-vous d'avoir :

- **Node.js** (v20 ou supérieur)
- **npm** ou **pnpm**
- **MetaMask** ou un autre wallet Ethereum

### Installation en 3 étapes

#### 1️⃣ Cloner le projet

```bash
git clone https://github.com/CygiK/votingDapp.git
cd votingDapp
```

#### 2️⃣ Démarrer le backend (blockchain locale)

```bash
cd backend
npm install
npx hardhat node  # Laissez ce terminal ouvert
```

Dans un **nouveau terminal** :

```bash
cd backend
npx hardhat ignition deploy ignition/modules/Voting.ts --network localhost
```

📝 **Important** : Copiez l'adresse du contrat déployé (elle ressemble à `0x5FbDB2315678afecb367f032d93F642f64180aa3`)

#### 3️⃣ Démarrer le frontend

```bash
cd frontend
npm install

# Configurez l'adresse du contrat
# Éditez frontend/core/web3/contants.ts et remplacez CONTRACT_ADDRESS par l'adresse copiée

npm run dev
```

🎉 **C'est prêt !** Ouvrez http://localhost:5173 dans votre navigateur

### Configuration MetaMask

1. Ouvrez MetaMask
2. Ajoutez le réseau Hardhat :
   - **Nom** : Hardhat Local
   - **RPC URL** : http://localhost:8545
   - **Chain ID** : 31337
   - **Symbole** : ETH

3. Importez un compte de test depuis Hardhat (voir les clés privées dans le terminal où tourne `hardhat node`)

## 🛠️ Technologies

### Backend Blockchain

| Technologie | Version | Description |
|------------|---------|-------------|
| **Hardhat** | 3.x | Framework de développement Ethereum |
| **Solidity** | 0.8.28 | Langage des smart contracts |
| **Viem** | 2.x | Bibliothèque d'interaction blockchain |
| **OpenZeppelin** | 5.x | Contrats sécurisés standard |

### Frontend Web3

| Technologie | Version | Description |
|------------|---------|-------------|
| **React** | 19.x | Bibliothèque UI |
| **React Router** | 7.x | Navigation SPA |
| **Wagmi** | 2.x | Hooks React pour Ethereum |
| **RainbowKit** | 2.x | Connexion wallet intuitive |
| **Viem** | 2.x | Client TypeScript Ethereum |
| **Tailwind CSS** | 4.x | Framework CSS utilitaire |
| **shadcn/ui** | - | Composants UI modernes |

## 📁 Structure du Projet

```
votingDapp/
├── 📂 backend/                 # Smart contracts et configuration blockchain
│   ├── contracts/             # Contrats Solidity
│   │   └── voting.sol        # Contrat principal de vote
│   ├── test/                 # Tests des contrats
│   ├── ignition/modules/     # Scripts de déploiement
│   └── hardhat.config.ts     # Configuration Hardhat
│
├── 📂 frontend/               # Application React
│   ├── app/
│   │   ├── components/       # Composants React
│   │   │   ├── adminDashboard.tsx
│   │   │   ├── voterDashboard.tsx
│   │   │   └── shared/       # Composants réutilisables
│   │   ├── lib/hooks/        # Hooks personnalisés Web3
│   │   ├── routes/           # Pages de l'application
│   │   └── root.tsx          # Point d'entrée
│   ├── core/web3/            # Configuration Web3
│   └── public/               # Assets statiques
│
└── � Documentation/          # Guides et documentations
    ├── GUIDE_UTILISATION.md
    ├── CONFIGURATION.md
    └── ...
```

## 🎮 Comment Utiliser l'Application

### 🔐 Connexion

1. Cliquez sur **"Connect Wallet"** en haut à droite
2. Sélectionnez MetaMask (ou votre wallet préféré)
3. Approuvez la connexion

### 👑 En tant qu'Administrateur

L'administrateur est le compte qui a déployé le contrat (Account #0 de Hardhat par défaut).

**Workflow complet** :

1. **Phase 0 - Enregistrement des électeurs** 📝
   - Ajoutez les adresses des électeurs autorisés
   - Cliquez sur "Passer à la phase suivante"

2. **Phase 1 - Début enregistrement des propositions** 💡
   - Les électeurs peuvent soumettre leurs propositions
   - Surveillez l'ajout des propositions

3. **Phase 2 - Fin enregistrement des propositions** ⏸️
   - Clôturez la soumission des propositions
   - Passez à la phase de vote

4. **Phase 3 - Début de la session de vote** 🗳️
   - Les électeurs peuvent voter
   - Surveillez la participation

5. **Phase 4 - Fin de la session de vote** 🔒
   - Clôturez le vote
   - Aucun vote supplémentaire n'est accepté

6. **Phase 5 - Comptabilisation** 🏆
   - Le système détermine automatiquement le gagnant
   - Les résultats sont publiés

### 🗳️ En tant qu'Électeur

1. **Vérifiez votre statut** : Vous devez être ajouté par l'admin
2. **Soumettez une proposition** (Phase 1) :
   - Allez sur votre dashboard électeur
   - Entrez votre proposition
   - Cliquez sur "Ajouter la proposition"

3. **Votez** (Phase 3) :
   - Consultez la liste des propositions
   - Sélectionnez votre proposition préférée
   - Cliquez sur "Voter"
   - Confirmez la transaction dans MetaMask

4. **Consultez les résultats** (Phase 5) :
   - Allez sur la page "Résultats"
   - Découvrez la proposition gagnante

## 🔍 Fonctionnement Technique

### Smart Contract - `Voting.sol`

Le contrat gère 6 phases (workflow) :

```solidity
enum WorkflowStatus {
    RegisteringVoters,              // 0: Ajout des électeurs
    ProposalsRegistrationStarted,   // 1: Début propositions
    ProposalsRegistrationEnded,     // 2: Fin propositions
    VotingSessionStarted,           // 3: Début vote
    VotingSessionEnded,             // 4: Fin vote
    VotesTallied                    // 5: Résultats
}
```

**Fonctions principales** :
- `addVoter(address)` - Ajoute un électeur (admin seulement)
- `addProposal(string)` - Ajoute une proposition (électeur)
- `setVote(uint)` - Vote pour une proposition (électeur)
- `tallyVotes()` - Comptabilise les votes (admin)
- `getOneProposal(uint)` - Récupère une proposition

### Architecture Frontend

```
RainbowKit → Wagmi → Viem → Ethereum Node
     ↓         ↓       ↓
  Wallet   Hooks   Client   → Smart Contract
```

**Hooks personnalisés** :
- `useAddVoterToWhiteList()` - Ajouter un électeur
- `useAddProposal()` - Soumettre une proposition
- `useVote()` - Voter
- `useGetWinner()` - Récupérer le gagnant
- `useWorkflowStatus()` - État du workflow

## 🧪 Tests

### Tests Backend (Smart Contracts)

```bash
cd backend
npm test

# Avec couverture
npx hardhat coverage
```

### Tests Frontend

```bash
cd frontend
npm test

# Vérification TypeScript
npm run typecheck
```

## 🌐 Déploiement

### Déploiement Local (Développement)

Suivez les étapes du [Démarrage Rapide](#-démarrage-rapide)

### Déploiement sur Sepolia (Testnet)

1. **Configurer les variables d'environnement** :

```bash
cd backend
# Créez .env avec :
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/VOTRE_CLE
SEPOLIA_PRIVATE_KEY=votre_cle_privee
```

2. **Déployer le contrat** :

```bash
npx hardhat ignition deploy ignition/modules/Voting.ts --network sepolia
```

3. **Configurer le frontend** :

```typescript
// frontend/core/web3/contants.ts
const CONTRACT_ADDRESS = '0xVotreAdresseSurSepolia';
```

4. **Mettre à jour la configuration réseau** :

```typescript
// frontend/app/components/shared/rainbowkitAndWagmiProvider.tsx
chains: [sepolia]  // Retirer hardhat en production
```

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**CygiK**
- GitHub: [@CygiK](https://github.com/CygiK)

---

<div align="center">

**⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile ! ⭐**

Fait avec ❤️ et ⚡ par [CygiK](https://github.com/CygiK)

</div>