# Frontend - Voting DApp

Interface utilisateur de l'application décentralisée de vote construite avec React Router, Wagmi et RainbowKit.

## 🎯 Fonctionnalités

- � **Connexion Wallet** : Intégration RainbowKit pour une connexion facile
- 👑 **Dashboard Administrateur** : Gestion complète du processus de vote
  - Ajout d'électeurs à la liste blanche
  - Gestion des phases du workflow
  - Démarrage/fin de l'enregistrement des propositions
  - Démarrage/fin de la session de vote
  - Comptabilisation des votes
- �️ **Dashboard Électeur** : Interface pour les votants enregistrés
  - Soumission de propositions
  - Vote pour une proposition
  - Consultation des propositions et résultats
- � **Page Résultats** : Affichage public des résultats après décompte
- 🎨 **UI Moderne** : Design responsive avec Tailwind CSS et shadcn/ui

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
