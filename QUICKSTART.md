# 🚀 Quick Start - Voting DApp

## Installation en 3 étapes

### 1. Lancer le Backend
```bash
cd backend
npm install
npx hardhat compile
npx hardhat node
```

### 2. Déployer le Contrat
Dans un nouveau terminal :
```bash
cd backend
npx hardhat ignition deploy ignition/modules/Voting.ts --network localhost
```

Copiez l'adresse du contrat affichée.

### 3. Lancer le Frontend
```bash
cd frontend
npm install
```

Éditez `frontend/core/web3/contants.ts` et remplacez l'adresse du contrat :
```typescript
const CONTRACT_ADDRESS = 'VOTRE_ADRESSE_ICI' as `0x${string}`;
```

Puis :
```bash
npm run dev
```

Ouvrez http://localhost:5173

## Configuration MetaMask

1. Ajouter le réseau Hardhat Local
   - RPC: `http://localhost:8545`
   - Chain ID: `31337`
   - Symbole: `ETH`

2. Importer le compte admin :
   - Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

## Test Rapide

1. Connectez-vous avec le compte admin
2. Ajoutez 2-3 électeurs
3. Cliquez sur "startProposalsRegistering"
4. Changez de compte et soumettez des propositions
5. Admin : "endProposalsRegistering" → "startVotingSession"
6. Votez avec différents comptes
7. Admin : "endVotingSession" → "tallyVotes"
8. Consultez les résultats sur `/results`

## Documentation

- 📖 [Guide complet](./GUIDE_UTILISATION.md)
- ⚙️ [Configuration](./CONFIGURATION.md)
- ✅ [Checklist](./CHECKLIST.md)
- 🎨 [UX Flow](./UX_FLOW.md)
- 📝 [Implémentations](./IMPLEMENTATIONS.md)

## Support

En cas de problème :
1. Vérifiez que le nœud Hardhat est toujours actif
2. Vérifiez que l'adresse du contrat est correcte
3. Consultez la console du navigateur pour les erreurs
4. Relancez MetaMask si nécessaire

---

**Développé avec ❤️ en suivant les principes du Clean Code et Software Craftsmanship**
