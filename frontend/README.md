# Luggage Frontend - Next.js

## Stack Technique

- **Next.js 15** - Framework React avec App Router
- **Ant Design 5** - Bibliothèque de composants UI
- **Tailwind CSS v4** - Utility-first CSS
- **TypeScript** - Typage statique
- **Axios** - Client HTTP

## Structure du Projet

```
app/
├── layout.tsx              # Layout racine avec Ant Design Provider
├── page.tsx                # Landing page (/)
├── globals.css             # Styles globaux Tailwind
├── middleware.ts           # Protection des routes
│
├── auth/                   # Routes publiques (/auth/*)
│   ├── login/
│   │   └── page.tsx       # Page de connexion
│   └── register/
│       └── page.tsx       # Page d'inscription
│
└── (space)/               # Groupe protégé (nécessite auth)
    ├── layout.tsx         # Layout avec sidebar + header
    └── space/             # Routes protégées (/space/*)
        ├── dashboard/
        │   └── page.tsx   # Dashboard
        ├── trips/
        │   └── page.tsx   # Gestion des voyages
        └── packages/
            └── page.tsx   # Gestion des colis

lib/
└── api.ts                 # Services API centralisés

components/
└── ...                    # Composants réutilisables
```

## Routes

### Routes Publiques
- `/` - Landing page
- `/auth/login` - Connexion
- `/auth/register` - Inscription

### Routes Protégées (nécessite authentification)
- `/space/dashboard` - Tableau de bord
- `/space/trips` - Gestion des voyages
- `/space/packages` - Gestion des colis

## Protection des Routes

Le middleware (`middleware.ts`) protège automatiquement toutes les routes `/space/*` :
- Redirige vers `/auth/login` si non authentifié
- Redirige vers `/space/dashboard` si déjà connecté et essaie d'accéder à `/auth/*`

## Développement

### Installation
```bash
npm install
```

### Lancement du serveur de développement
```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

### Build de production
```bash
npm run build
npm start
```

## Configuration

Créer un fichier `.env.local` :
```env
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```

## Docker

### Développement
```bash
docker-compose up
```

Le frontend sera accessible sur http://localhost:3000

### Production
Le Dockerfile utilise un build multi-stage pour optimiser la taille de l'image.

## Ant Design

### Thème
Le thème Ant Design est configuré dans `app/layout.tsx` :
- Couleur primaire : `#1890ff` (bleu)
- Locale : Français (`frFR`)
- Border radius : `6px`

### Composants disponibles
- Layout (Header, Sider, Content)
- Navigation (Menu, Dropdown)
- Formulaires (Form, Input, Select, DatePicker, Upload)
- Affichage de données (Table, Card, Statistic)
- Feedback (Modal, Message, Tag)
- Et bien plus...

## Tailwind CSS v4

Tailwind est configuré pour ne pas entrer en conflit avec Ant Design :
```js
// tailwind.config.ts
corePlugins: {
  preflight: false, // Désactive le reset CSS de Tailwind
}
```

Utilisez Tailwind pour le layout et l'espacement, Ant Design pour les composants.

## API

Les services API sont centralisés dans `lib/api.ts` :

```typescript
import { authService, packagesService, tripsService } from '@/lib/api';

// Connexion
const response = await authService.login(username, password);

// Récupérer tous les colis
const packages = await packagesService.getAll();

// Créer un voyage
await tripsService.create(tripData);
```

## Bonnes Pratiques

1. **Composants Client** : Utilisez `'use client'` pour les composants avec hooks ou événements
2. **Typage** : Toujours typer les props et les données
3. **Gestion d'état** : Utilisez les hooks React (useState, useEffect)
4. **Navigation** : Utilisez `Link` de Next.js et `useRouter` pour la navigation
5. **Messages** : Utilisez `message` d'Ant Design pour les notifications

## TODO

- [ ] Ajouter la gestion du profil utilisateur
- [ ] Implémenter la messagerie entre utilisateurs
- [ ] Ajouter un système de notation/reviews
- [ ] Intégrer un système de paiement
- [ ] Ajouter des tests (Jest + React Testing Library)
