# Configuration - Voting DApp

## Variables d'Environnement

### Frontend (.env)

Créez un fichier `.env` dans le dossier `frontend/` :

```env
# Adresse du contrat déployé (à mettre à jour après déploiement)
VITE_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3

# WalletConnect Project ID (optionnel, pour production)
VITE_WALLETCONNECT_PROJECT_ID=43ad57af286e1c1ce143a75ef96efa3c

# Réseau (local par défaut)
VITE_CHAIN_ID=31337
```

### Backend

Le backend utilise la configuration Hardhat par défaut. Pour un réseau différent, modifiez `backend/hardhat.config.ts`.

## Après Déploiement

1. **Récupérer l'adresse du contrat**
   ```bash
   # L'adresse est affichée après le déploiement
   # Exemple : Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
   ```

2. **Mettre à jour le frontend**
   - Ouvrir `frontend/core/web3/contants.ts`
   - Remplacer la valeur de `CONTRACT_ADDRESS` par la nouvelle adresse
   
   ```typescript
   const CONTRACT_ADDRESS = '0xVOTRE_NOUVELLE_ADRESSE' as `0x${string}`;
   ```

3. **Copier l'ABI**
   - L'ABI est automatiquement généré dans `backend/artifacts/contracts/voting.sol/Voting.json`
   - Il est déjà configuré dans le frontend

## Configuration de MetaMask pour le Réseau Local

1. Ouvrir MetaMask
2. Cliquer sur le réseau en haut
3. "Add Network" > "Add a network manually"
4. Remplir les informations :
   - **Network Name**: Hardhat Local
   - **RPC URL**: http://localhost:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH

## Comptes de Test Hardhat

Hardhat fournit 20 comptes de test avec 10000 ETH chacun.

Le premier compte est utilisé comme administrateur (owner) :
```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Utilisez les autres comptes pour tester en tant qu'électeurs.

## Ports Utilisés

- **Backend (Hardhat Node)**: 8545
- **Frontend (Vite)**: 5173

Assurez-vous que ces ports sont libres avant de démarrer l'application.
