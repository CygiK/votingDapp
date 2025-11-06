# ✅ Checklist de Vérification - Voting DApp

Utilisez cette checklist pour vérifier que l'application est correctement configurée et fonctionnelle.

## Backend

### Compilation et Tests
- [ ] Les contrats se compilent sans erreur : `npx hardhat compile`
- [ ] Tous les tests passent : `npx hardhat test`
- [ ] Le nœud local démarre : `npx hardhat node`
- [ ] Le contrat se déploie : `npx hardhat ignition deploy ignition/modules/Voting.ts --network localhost`

### Smart Contract
- [ ] Le fichier `contracts/voting.sol` existe
- [ ] Le contrat hérite de `Ownable` d'OpenZeppelin
- [ ] Toutes les fonctions nécessaires sont implémentées :
  - [ ] `addVoter`
  - [ ] `addProposal`
  - [ ] `setVote`
  - [ ] `startProposalsRegistering`
  - [ ] `endProposalsRegistering`
  - [ ] `startVotingSession`
  - [ ] `endVotingSession`
  - [ ] `tallyVotes`
  - [ ] `getVoter`
  - [ ] `getOneProposal`
  - [ ] `getWorkflowStatus`

## Frontend

### Configuration
- [ ] L'adresse du contrat est correcte dans `frontend/core/web3/contants.ts`
- [ ] Les dépendances sont installées : `npm install`
- [ ] L'application démarre : `npm run dev`
- [ ] L'application est accessible sur `http://localhost:5173`

### Composants et Pages
- [ ] La page d'accueil (`/`) s'affiche correctement
- [ ] Le bouton "Connect Wallet" fonctionne
- [ ] La page admin (`/admin`) existe
- [ ] La page électeur (`/voter`) existe
- [ ] La page résultats (`/results`) existe

### Hooks Personnalisés
- [ ] `useAddVoterToWhiteList` - Ajout d'électeurs
- [ ] `useAddProposal` - Ajout de propositions
- [ ] `useVote` - Vote pour une proposition
- [ ] `useGetWinner` - Récupération du gagnant
- [ ] `useGetProposal` - Récupération des propositions
- [ ] `useChangeWorkflowStatus` - Changement de phase
- [ ] `userIsOwner` - Vérification admin
- [ ] `userIsVoter` - Vérification électeur

## Fonctionnalités

### Dashboard Administrateur
- [ ] Peut ajouter des électeurs
- [ ] Peut démarrer l'enregistrement des propositions
- [ ] Peut terminer l'enregistrement des propositions
- [ ] Peut démarrer la session de vote
- [ ] Peut terminer la session de vote
- [ ] Peut comptabiliser les votes
- [ ] Voit la liste des propositions

### Dashboard Électeur
- [ ] Peut soumettre une proposition (phase appropriée)
- [ ] Peut voir la liste des propositions
- [ ] Peut voter pour une proposition (phase appropriée)
- [ ] Ne peut voter qu'une seule fois
- [ ] Voit les résultats après comptabilisation

### Page Résultats
- [ ] Affiche un message si les votes ne sont pas comptabilisés
- [ ] Affiche la proposition gagnante après comptabilisation
- [ ] Affiche le nombre de votes pour le gagnant
- [ ] Affiche les statistiques globales
- [ ] Accessible à tous (électeurs et non-électeurs)

## Tests d'Intégration

### Scénario Complet
1. [ ] L'administrateur se connecte
2. [ ] L'administrateur ajoute 3 électeurs
3. [ ] L'administrateur démarre l'enregistrement des propositions
4. [ ] Les 3 électeurs soumettent chacun une proposition
5. [ ] L'administrateur termine l'enregistrement des propositions
6. [ ] L'administrateur démarre la session de vote
7. [ ] Les 3 électeurs votent pour différentes propositions
8. [ ] L'administrateur termine la session de vote
9. [ ] L'administrateur comptabilise les votes
10. [ ] Les résultats s'affichent correctement avec le gagnant

### Tests de Sécurité
- [ ] Un non-électeur ne peut pas soumettre de proposition
- [ ] Un non-électeur ne peut pas voter
- [ ] Un électeur ne peut pas voter deux fois
- [ ] Un non-admin ne peut pas changer le workflow
- [ ] Un non-admin ne peut pas ajouter des électeurs
- [ ] Les propositions ne peuvent pas être vides

## MetaMask

### Configuration Réseau Local
- [ ] Le réseau "Hardhat Local" est ajouté dans MetaMask
- [ ] RPC URL : `http://localhost:8545`
- [ ] Chain ID : `31337`
- [ ] Le compte administrateur (Account #0) est importé
- [ ] Au moins 2 comptes de test sont importés pour les électeurs

### Transactions
- [ ] Les transactions se confirment correctement
- [ ] Les événements sont émis correctement
- [ ] Les erreurs sont gérées et affichées

## Documentation

- [ ] Le fichier `README.md` principal est à jour
- [ ] Le fichier `GUIDE_UTILISATION.md` existe et est complet
- [ ] Le fichier `CONFIGURATION.md` existe et est correct
- [ ] Les commentaires dans le code sont clairs et en français
- [ ] Les hooks ont des commentaires JSDoc

## Performance et UX

- [ ] Les composants se chargent rapidement
- [ ] Les états de chargement sont affichés (spinners, textes)
- [ ] Les erreurs sont affichées clairement
- [ ] Les succès de transaction sont confirmés visuellement
- [ ] Le design est responsive (mobile, tablette, desktop)
- [ ] La navigation entre les pages fonctionne correctement
- [ ] Le statut du workflow est toujours visible

## Déploiement (Production)

Si vous déployez en production :

- [ ] Les variables d'environnement sont configurées
- [ ] L'adresse du contrat est correcte pour le réseau cible
- [ ] Le WalletConnect Project ID est configuré
- [ ] Le contrat est vérifié sur Etherscan (si applicable)
- [ ] Les tests de sécurité ont été effectués
- [ ] Un audit du smart contract a été réalisé (recommandé)

## Notes

Utilisez cette checklist avant de considérer l'application comme fonctionnelle. 
Si un élément n'est pas coché, consultez la documentation ou corrigez le problème avant de continuer.

---

**Date de vérification** : _________________
**Vérifié par** : _________________
**Statut** : ⬜ Réussi  ⬜ Problèmes détectés
