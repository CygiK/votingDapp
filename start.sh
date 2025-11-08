#!/bin/bash

# Script de démarrage rapide pour la Voting DApp
# Usage: ./start.sh

echo "🚀 Démarrage de la Voting DApp..."
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Vérifier si on est dans le bon dossier
if [ ! -f "README.md" ]; then
    print_error "Ce script doit être exécuté depuis la racine du projet votingDapp"
    exit 1
fi

# Étape 1: Backend
print_step "Étape 1: Préparation du backend..."
cd backend || exit 1

if [ ! -d "node_modules" ]; then
    print_step "Installation des dépendances backend..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Échec de l'installation des dépendances backend"
        exit 1
    fi
    print_success "Dépendances backend installées"
fi

print_step "Compilation des smart contracts..."
npx hardhat compile
if [ $? -ne 0 ]; then
    print_error "Échec de la compilation"
    exit 1
fi
print_success "Smart contracts compilés"

print_step "Exécution des tests..."
npx hardhat test
if [ $? -ne 0 ]; then
    print_warning "Certains tests ont échoué, mais on continue..."
else
    print_success "Tous les tests passent"
fi

cd ..

# Étape 2: Frontend
print_step "Étape 2: Préparation du frontend..."
cd frontend || exit 1

if [ ! -d "node_modules" ]; then
    print_step "Installation des dépendances frontend..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Échec de l'installation des dépendances frontend"
        exit 1
    fi
    print_success "Dépendances frontend installées"
fi

cd ..

# Étape 3: Instructions pour le démarrage
echo ""
print_success "Configuration terminée !"
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  🎉 Voting DApp est prête !                                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "📋 Prochaines étapes:"
echo ""
echo "1️⃣  Démarrer le nœud Hardhat (dans un terminal):"
echo "   ${BLUE}cd backend && npx hardhat node${NC}"
echo ""
echo "2️⃣  Déployer les contrats (dans un autre terminal):"
echo "   ${BLUE}cd backend && npx hardhat ignition deploy ignition/modules/Voting.ts --network localhost${NC}"
echo ""
echo "3️⃣  Copier l'adresse du contrat déployé et la mettre dans:"
echo "   ${BLUE}frontend/core/web3/contants.ts${NC}"
echo ""
echo "4️⃣  Démarrer le frontend (dans un terminal):"
echo "   ${BLUE}cd frontend && npm run dev${NC}"
echo ""
echo "5️⃣  Ouvrir votre navigateur:"
echo "   ${BLUE}http://localhost:5173${NC}"
echo ""
echo "📖 Documentation:"
echo "   • Guide d'utilisation: ${BLUE}GUIDE_UTILISATION.md${NC}"
echo "   • Configuration: ${BLUE}CONFIGURATION.md${NC}"
echo "   • Checklist: ${BLUE}CHECKLIST.md${NC}"
echo ""
