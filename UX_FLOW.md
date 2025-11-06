# 🎨 Captures d'Écran et Flux Utilisateur

## 🔄 Flux du Processus de Vote

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADMINISTRATEUR (Owner)                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 0: ENREGISTREMENT DES ÉLECTEURS                          │
│  ───────────────────────────────────────────────────────────    │
│  • L'admin ajoute les adresses des électeurs                    │
│  • Formulaire: Saisir adresse → Bouton "Add"                    │
│  • Événement émis: VoterRegistered                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 1: DÉBUT ENREGISTREMENT PROPOSITIONS                     │
│  ───────────────────────────────────────────────────────────    │
│  • L'admin clique "startProposalsRegistering"                   │
│  • Proposition GENESIS créée automatiquement                    │
│  • Les électeurs peuvent maintenant proposer                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ÉLECTEURS (Voters)                            │
│  ───────────────────────────────────────────────────────────    │
│  • Chaque électeur soumet ses propositions                      │
│  • Formulaire: Saisir description → Bouton "Add"                │
│  • Les propositions s'ajoutent à la liste                       │
│  • Événement émis: ProposalRegistered                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 2: FIN ENREGISTREMENT PROPOSITIONS                       │
│  ───────────────────────────────────────────────────────────    │
│  • L'admin clique "endProposalsRegistering"                     │
│  • Plus aucune proposition ne peut être ajoutée                 │
│  • Préparation de la phase de vote                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 3: DÉBUT SESSION DE VOTE                                 │
│  ───────────────────────────────────────────────────────────    │
│  • L'admin clique "startVotingSession"                          │
│  • Les électeurs peuvent maintenant voter                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ÉLECTEURS (Voters)                            │
│  ───────────────────────────────────────────────────────────    │
│  • Consultation de toutes les propositions                      │
│  • Vote pour UNE proposition (une seule fois)                   │
│  • Bouton "Voter" → Confirmation transaction                    │
│  • Bouton devient "Déjà voté"                                   │
│  • Événement émis: Voted                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 4: FIN SESSION DE VOTE                                   │
│  ───────────────────────────────────────────────────────────    │
│  • L'admin clique "endVotingSession"                            │
│  • Plus aucun vote n'est accepté                                │
│  • Préparation du décompte                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Phase 5: COMPTABILISATION DES VOTES                            │
│  ───────────────────────────────────────────────────────────    │
│  • L'admin clique "tallyVotes"                                  │
│  • Le smart contract calcule le gagnant                         │
│  • La proposition avec le plus de votes gagne                   │
│  • Les résultats sont publics                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TOUT LE MONDE                                 │
│  ───────────────────────────────────────────────────────────    │
│  • Consultation des résultats sur /results                      │
│  • Affichage de la proposition gagnante                         │
│  • Statistiques de vote                                         │
│  • Accessible même sans être électeur                           │
└─────────────────────────────────────────────────────────────────┘
```

## 🎭 Rôles et Accès

### 🔑 Administrateur (Owner)

```
┌────────────────────────────────────────┐
│    Dashboard Administrateur            │
├────────────────────────────────────────┤
│  📊 Status Banner                      │
│  ├─ Phase actuelle du vote             │
│  └─ Bouton pour phase suivante         │
│                                        │
│  👥 Gestion des Électeurs              │
│  ├─ Input: Adresse wallet              │
│  └─ Bouton: Add                        │
│                                        │
│  📝 Ajout de Propositions              │
│  ├─ Input: Description                 │
│  └─ Bouton: Add                        │
│                                        │
│  📋 Liste des Propositions             │
│  ├─ Proposition #1: ...                │
│  ├─ Proposition #2: ...                │
│  └─ Proposition #N: ...                │
└────────────────────────────────────────┘
```

### 🗳️ Électeur (Voter)

#### Phase 1: Enregistrement des Propositions
```
┌────────────────────────────────────────┐
│    Dashboard Électeur                  │
├────────────────────────────────────────┤
│  📊 Status Banner                      │
│  └─ "Proposals Registration Started"   │
│                                        │
│  ➕ Ajouter une Proposition            │
│  ├─ Input: Description                 │
│  └─ Bouton: Add                        │
│                                        │
│  📋 Liste des Propositions             │
│  ├─ Proposition #1: ...                │
│  ├─ Proposition #2: ...                │
│  └─ Proposition #N: ...                │
└────────────────────────────────────────┘
```

#### Phase 3: Session de Vote
```
┌────────────────────────────────────────┐
│    Voter pour une Proposition          │
├────────────────────────────────────────┤
│  📊 Status Banner                      │
│  └─ "Voting Session Started"           │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Proposition #1                  │ │
│  │  Description: ...                │ │
│  │  Votes: 3                        │ │
│  │  [    Voter    ]                 │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Proposition #2  ✓ VOTÉ         │ │
│  │  Description: ...                │ │
│  │  Votes: 5                        │ │
│  │  [  Déjà voté  ] (disabled)     │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Proposition #3                  │ │
│  │  Description: ...                │ │
│  │  Votes: 2                        │ │
│  │  [  Déjà voté  ] (disabled)     │ │
│  └──────────────────────────────────┘ │
└────────────────────────────────────────┘
```

#### Phase 5: Résultats
```
┌────────────────────────────────────────┐
│    🏆 Résultats du Vote                │
├────────────────────────────────────────┤
│  ┌──────────────────────────────────┐ │
│  │  🎉 PROPOSITION GAGNANTE         │ │
│  │  ─────────────────────────────── │ │
│  │  Proposition #2                  │ │
│  │  "Construire un parc"            │ │
│  │                                  │ │
│  │  ✓ 5 votes • 50% des props       │ │
│  └──────────────────────────────────┘ │
│                                        │
│  📊 Statistiques                       │
│  ┌──────────────┬──────────────────┐  │
│  │      10      │         5        │  │
│  │ Propositions │ Votes gagnant    │  │
│  └──────────────┴──────────────────┘  │
└────────────────────────────────────────┘
```

### 👀 Visiteur (Non-enregistré)

```
┌────────────────────────────────────────┐
│    Bienvenue sur la DApp de vote       │
├────────────────────────────────────────┤
│  ⚠️  Non enregistré                    │
│  Votre adresse n'est pas dans la       │
│  liste blanche. Contactez l'admin.     │
│                                        │
│  📋 Informations                       │
│  Vous pouvez consulter les résultats   │
│  après la fin du vote.                 │
│                                        │
│  Navigation:                           │
│  • Accueil                             │
│  • Résultats (si phase 5)              │
└────────────────────────────────────────┘
```

## 🎨 Codes Couleur

- **Vert** : Proposition gagnante, actions réussies
- **Bleu** : Actions principales, liens
- **Rouge** : Erreurs, accès refusé
- **Jaune** : Avertissements, attentes
- **Gris** : Éléments désactivés

## 📱 Navigation

```
┌─────────────────────────────────────────────────┐
│  🗳️ Voting DApp        [Connect Wallet]         │
├─────────────────────────────────────────────────┤
│  Accueil | Administration | Électeur | Résultats│
└─────────────────────────────────────────────────┘
       │           │              │          │
       │           │              │          └─> Visible par tous
       │           │              └─> Visible si électeur
       │           └─> Visible si admin
       └─> Toujours visible
```

## 🎯 États des Boutons

### Bouton "Voter"
- **Actif** : Bleu, cliquable
- **Hover** : Bleu foncé
- **Disabled** : Gris, cursor not-allowed
  - Après avoir voté
  - Pendant la transaction
  - En attente de confirmation

### Bouton Workflow (Admin)
- **Actif** : Affiche la prochaine action ("startProposalsRegistering")
- **Disabled** : Transaction en cours
- **Success** : Passe à la phase suivante automatiquement

## 💬 Messages Utilisateur

### Succès
```
✅ Votre vote a été enregistré avec succès !
✅ Voter added successfully!
✅ Proposal added successfully!
```

### Erreurs
```
❌ Accès refusé - Vous n'êtes pas enregistré
⚠️ Wallet non connecté
⚠️ Vous avez déjà voté
```

### Informations
```
ℹ️  Les votes n'ont pas encore été comptabilisés
ℹ️  En attente du début de la session de vote...
ℹ️  Le vote est terminé et les résultats ont été comptabilisés
```

## 🔄 Animations et Transitions

- **Chargement** : Spinner ou texte "Loading..."
- **Transaction en cours** : "Vote en cours...", "Transaction pending..."
- **Succès** : Alert verte avec ✅
- **Navigation** : Transition douce entre les pages
- **Hover** : Légère élévation des cards

## 📊 Tableaux de Bord Comparatifs

| Fonctionnalité              | Admin | Électeur | Visiteur |
|----------------------------|-------|----------|----------|
| Voir le statut             | ✅    | ✅       | ✅       |
| Ajouter électeurs          | ✅    | ❌       | ❌       |
| Gérer workflow             | ✅    | ❌       | ❌       |
| Soumettre propositions     | ✅    | ✅       | ❌       |
| Voir propositions          | ✅    | ✅       | ❌       |
| Voter                      | ✅    | ✅       | ❌       |
| Voir résultats (phase 5)   | ✅    | ✅       | ✅       |

---

Cette documentation visuelle aide à comprendre le flux complet de l'application et l'expérience utilisateur pour chaque rôle.
