# Guide d'Utilisation - Voting DApp

## 📖 Introduction

Cette application décentralisée (DApp) permet de gérer un processus de vote transparent et sécurisé sur la blockchain. Elle suit un workflow structuré en plusieurs phases.

## 🔄 Workflow du Vote

Le système de vote suit les étapes suivantes :

### 1. **Enregistrement des Électeurs** (RegisteringVoters)
- L'administrateur ajoute les adresses des électeurs à la liste blanche
- Seul l'administrateur peut effectuer cette action
- Les électeurs doivent être enregistrés avant de pouvoir participer

### 2. **Début de l'Enregistrement des Propositions** (ProposalsRegistrationStarted)
- L'administrateur démarre la phase d'enregistrement des propositions
- Les électeurs enregistrés peuvent soumettre leurs propositions
- Une proposition GENESIS est automatiquement créée

### 3. **Fin de l'Enregistrement des Propositions** (ProposalsRegistrationEnded)
- L'administrateur termine la phase d'enregistrement
- Plus aucune nouvelle proposition ne peut être ajoutée
- Préparation de la phase de vote

### 4. **Début de la Session de Vote** (VotingSessionStarted)
- L'administrateur démarre la session de vote
- Les électeurs peuvent voter pour leur proposition préférée
- Chaque électeur ne peut voter qu'une seule fois

### 5. **Fin de la Session de Vote** (VotingSessionEnded)
- L'administrateur termine la session de vote
- Plus aucun vote n'est accepté
- Préparation du décompte

### 6. **Votes Comptabilisés** (VotesTallied)
- L'administrateur lance le décompte des votes
- La proposition gagnante est déterminée
- Les résultats sont accessibles à tous

## 👥 Rôles et Permissions

### 🔑 Administrateur (Owner)
L'administrateur a accès à toutes les fonctionnalités de gestion :

#### Dashboard Administrateur
- **Ajouter des électeurs** : Enregistrer les adresses autorisées à voter
- **Gérer le workflow** : Faire avancer les phases du vote
  - Démarrer l'enregistrement des propositions
  - Terminer l'enregistrement des propositions
  - Démarrer la session de vote
  - Terminer la session de vote
  - Comptabiliser les votes
- **Voir les propositions** : Consulter toutes les propositions soumises

### 🗳️ Électeur (Voter)
Les électeurs enregistrés peuvent :

#### Phase d'Enregistrement des Propositions
- Soumettre une ou plusieurs propositions
- Consulter les propositions existantes

#### Phase de Vote
- Voter pour une proposition
- Voir toutes les propositions avec leur nombre de votes

#### Phase Résultats
- Consulter les résultats finaux

### 👀 Visiteur (Non-enregistré)
Les utilisateurs non enregistrés peuvent :
- Consulter les résultats une fois le vote terminé
- Voir le statut actuel du processus de vote

## 🚀 Démarrage de l'Application

### Backend (Smart Contracts)

```bash
# Depuis le dossier backend/
cd backend

# Installer les dépendances
npm install

# Compiler les contrats
npx hardhat compile

# Lancer un nœud local
npx hardhat node

# Dans un autre terminal, déployer les contrats
npx hardhat ignition deploy ignition/modules/Voting.ts --network localhost

# Récupérer l'adresse du contrat déployé et la mettre dans frontend/core/web3/contants.ts
```

### Frontend

```bash
# Depuis le dossier frontend/
cd frontend

# Installer les dépendances
npm install

# Mettre à jour l'adresse du contrat dans core/web3/contants.ts
# Exemple : const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

# Démarrer l'application
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📝 Scénario d'Utilisation Complet

### Étape 1 : Connexion de l'Administrateur
1. Ouvrir l'application
2. Cliquer sur "Connect Wallet"
3. Sélectionner MetaMask (ou autre wallet)
4. Se connecter avec le compte qui a déployé le contrat

### Étape 2 : Enregistrement des Électeurs
1. Sur le dashboard administrateur, section "Ajouter un électeur"
2. Entrer l'adresse Ethereum de chaque électeur
3. Cliquer sur "Add" pour chaque adresse
4. Confirmer la transaction dans le wallet

### Étape 3 : Démarrer l'Enregistrement des Propositions
1. Cliquer sur le bouton "startProposalsRegistering"
2. Confirmer la transaction
3. Le statut passe à "Proposals Registration Started"

### Étape 4 : Les Électeurs Soumettent des Propositions
1. Les électeurs se connectent avec leur wallet
2. Ils accèdent à leur dashboard électeur
3. Dans "Ajouter une proposition", ils saisissent leur proposition
4. Cliquer sur "Add" et confirmer la transaction

### Étape 5 : Fin de l'Enregistrement des Propositions
1. L'administrateur clique sur "endProposalsRegistering"
2. Confirmer la transaction
3. Plus aucune proposition ne peut être ajoutée

### Étape 6 : Démarrer la Session de Vote
1. L'administrateur clique sur "startVotingSession"
2. Confirmer la transaction
3. Les électeurs peuvent maintenant voter

### Étape 7 : Les Électeurs Votent
1. Les électeurs voient toutes les propositions
2. Ils cliquent sur "Voter" pour leur proposition préférée
3. Confirmer la transaction
4. Ils ne peuvent voter qu'une seule fois

### Étape 8 : Fin de la Session de Vote
1. L'administrateur clique sur "endVotingSession"
2. Confirmer la transaction
3. Plus aucun vote n'est accepté

### Étape 9 : Comptabilisation des Votes
1. L'administrateur clique sur "tallyVotes"
2. Confirmer la transaction
3. Les résultats sont calculés automatiquement

### Étape 10 : Consultation des Résultats
1. Tous les utilisateurs (électeurs ou non) peuvent accéder à la page "Résultats"
2. La proposition gagnante est affichée avec le nombre de votes
3. Les statistiques complètes sont visibles

## ⚠️ Points Importants

### Sécurité
- Seul l'administrateur peut faire avancer le workflow
- Les électeurs doivent être enregistrés pour participer
- Chaque électeur ne peut voter qu'une seule fois
- Toutes les actions sont enregistrées sur la blockchain

### Ordre du Workflow
- Les phases doivent être suivies dans l'ordre strict
- Il n'est pas possible de revenir en arrière
- Assurez-vous que tout est prêt avant de passer à la phase suivante

### Gestion du Gas
- Chaque action sur la blockchain nécessite du gas (ETH)
- Assurez-vous d'avoir suffisamment d'ETH dans votre wallet
- Les transactions peuvent échouer si le gas est insuffisant

## 🧪 Tests

### Backend
```bash
cd backend
npx hardhat test
```

### Frontend
```bash
cd frontend
npm test
```

## 🛠️ Dépannage

### Le contrat ne répond pas
- Vérifier que le nœud Hardhat est toujours en cours d'exécution
- Vérifier que l'adresse du contrat dans `contants.ts` est correcte
- Vérifier que vous êtes connecté au bon réseau (localhost)

### Les transactions échouent
- Vérifier que vous avez assez d'ETH pour le gas
- Vérifier que vous êtes dans la bonne phase du workflow
- Vérifier que votre wallet est bien connecté

### Je ne suis pas reconnu comme électeur
- Vérifier que l'administrateur a bien ajouté votre adresse
- Vérifier que vous utilisez la bonne adresse wallet
- Actualiser la page après avoir été ajouté

## 📞 Support

Pour toute question ou problème :
- Consulter la documentation du projet
- Vérifier les logs de la console du navigateur
- Vérifier les transactions sur le réseau local

## 📄 Licence

MIT
