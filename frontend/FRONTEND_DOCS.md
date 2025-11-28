# Documentation Frontend - LUGGAGE Platform

## 📋 Table des matières

1. [Architecture](#architecture)
2. [Stack Technique](#stack-technique)
3. [Structure du Projet](#structure-du-projet)
4. [Patterns de Développement](#patterns-de-développement)
5. [Data Fetching avec SWR](#data-fetching-avec-swr)
6. [Services API](#services-api)
7. [Types TypeScript](#types-typescript)
8. [Composants UI](#composants-ui)
9. [Authentification](#authentification)
10. [Bonnes Pratiques](#bonnes-pratiques)

---

## Architecture

### Vue d'ensemble

Le frontend LUGGAGE est une application **Next.js 14** utilisant le **App Router** avec TypeScript. L'architecture suit le principe de **séparation des préoccupations** :

```
frontend/
├── app/              # Pages et routes (App Router)
├── components/       # Composants réutilisables
├── hooks/            # Custom React hooks (SWR)
├── services/         # Couche d'abstraction API
├── types/            # Définitions TypeScript
├── context/          # Contexts React (Auth)
└── lib/              # Utilitaires et configuration
```

### Flux de données

```
UI Components
    ↓
Custom Hooks (SWR)
    ↓
API Services
    ↓
Axios Instance (avec intercepteurs JWT)
    ↓
Backend API
```

---

## Stack Technique

| Technologie | Version | Usage |
|------------|---------|-------|
| Next.js | 14.x | Framework React avec App Router |
| React | 18.x | Bibliothèque UI |
| TypeScript | 5.x | Typage statique |
| SWR | 2.x | Data fetching & cache |
| Axios | 1.x | Client HTTP |
| Ant Design | 5.x | Bibliothèque de composants UI |
| Tailwind CSS | 3.x | Framework CSS utilitaire |
| Lucide React | - | Icônes |
| **Yarn** | - | **Package Manager (obligatoire)** |

### 📦 Installation et Démarrage

**Package Manager : YARN (obligatoire)**

```bash
# Installation des dépendances
cd frontend
yarn install

# Démarrage du serveur de développement
yarn dev

# Build de production
yarn build

# Démarrage en production
yarn start
```

**⚠️ IMPORTANT** : Ce projet utilise **Yarn** comme package manager. Ne PAS utiliser npm ou pnpm.

---

## Structure du Projet

### `/app` - Pages et Routes

```typescript
app/
├── (space)/              # Layout groupe pour espace utilisateur
│   ├── layout.tsx        # Layout avec sidebar
│   └── space/
│       ├── dashboard/    # 📊 Tableau de bord
│       ├── trips/        # ✈️ Gestion des voyages
│       └── packages/     # 📦 Gestion des colis
├── auth/                 # 🔐 Pages d'authentification
│   ├── login/
│   └── register/
└── page.tsx              # Page d'accueil publique
```

### `/hooks` - Custom Hooks SWR

**Hooks pour les voyages** (`useTravels.ts`):
```typescript
- useMyTravels()         // Voyages de l'utilisateur
- useAllTravels()        // Tous les voyages
- useTravel(id)          // Un voyage spécifique
- useTravelMutations()   // CRUD operations
```

**Hooks pour les colis** (`usePackages.ts`):
```typescript
- useMyPackages()        // Colis de l'utilisateur
- useAllPackages()       // Tous les colis
- usePackage(id)         // Un colis spécifique
- usePackageMutations()  // CRUD operations
```

### `/services` - API Services

Couche d'abstraction pour les appels API :
- `travel.service.ts` - CRUD voyages
- `package.service.ts` - CRUD colis
- `auth.service.ts` - Authentification

### `/types` - TypeScript Types

Définitions centralisées :
- `travel.types.ts` - Travel, TravelCreate, TravelFilters
- `package.types.ts` - Package, PackageCreate, PackageStatus
- `user.types.ts` - User, UserProfile
- `auth.types.ts` - Token, LoginCredentials

---

## Patterns de Développement

### 1. Data Fetching avec SWR

#### ❌ ANCIEN PATTERN (À NE PLUS UTILISER)
```typescript
// ❌ Appels directs avec useState/useEffect
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    const result = await travelService.getMyTravels();
    setData(result);
    setLoading(false);
  };
  fetchData();
}, []);
```

#### ✅ NOUVEAU PATTERN (À UTILISER)
```typescript
// ✅ Hooks SWR avec cache et revalidation
import { useMyTravels } from '@/hooks/useTravels';

const { travels, isLoading, isError } = useMyTravels();
```

### 2. Mutations avec Invalidation de Cache

```typescript
import { useTravelMutations } from '@/hooks/useTravels';

const { createTravel, deleteTravel } = useTravelMutations();

// Créer un voyage
const handleCreate = async (data) => {
  await createTravel(data); // ✅ Cache invalidé automatiquement
  message.success('Voyage créé !');
};

// Supprimer un voyage
const handleDelete = async (id) => {
  await deleteTravel(id); // ✅ Cache invalidé automatiquement
  message.success('Voyage supprimé !');
};
```

### 3. Conditional Fetching

```typescript
// Charger uniquement si l'ID existe
const { travel } = useTravel(id ? id : null);

// Charger uniquement si l'utilisateur est connecté
const { packages } = useMyPackages();
```

---

## Data Fetching avec SWR

### Pourquoi SWR ?

| Avantage | Description |
|----------|-------------|
| **Cache automatique** | Pas de refetch inutile |
| **Revalidation** | Données toujours fraîches |
| **Deduplication** | Une seule requête même avec plusieurs composants |
| **Focus tracking** | Recharge au retour sur l'onglet |
| **Network recovery** | Recharge à la reconnexion |
| **Optimistic UI** | Mise à jour avant la réponse serveur |

### Configuration Globale

Dans `app/layout.tsx` :
```typescript
import { SWRConfig } from 'swr';

export default function RootLayout({ children }) {
  return (
    <SWRConfig value={{
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
      errorRetryCount: 3,
    }}>
      {children}
    </SWRConfig>
  );
}
```

### Exemples d'utilisation

#### 📊 Dashboard avec plusieurs sources

```typescript
'use client';
import { useMyTravels } from '@/hooks/useTravels';
import { useMyPackages } from '@/hooks/usePackages';

export default function Dashboard() {
  const { travels, isLoading: loadingTravels } = useMyTravels();
  const { packages, isLoading: loadingPackages } = useMyPackages();
  
  if (loadingTravels || loadingPackages) {
    return <Spinner />;
  }

  const stats = {
    activePackages: packages.filter(p => p.status === 'pending').length,
    activeTravels: travels.filter(t => new Date(t.travel_date) > new Date()).length,
  };

  return (
    <div>
      <Statistic title="Colis actifs" value={stats.activePackages} />
      <Statistic title="Voyages en cours" value={stats.activeTravels} />
    </div>
  );
}
```

#### ✈️ Liste de voyages avec création

```typescript
'use client';
import { useMyTravels, useTravelMutations } from '@/hooks/useTravels';

export default function TripsPage() {
  const { travels, isLoading } = useMyTravels();
  const { createTravel, deleteTravel } = useTravelMutations();

  const handleCreate = async (values) => {
    await createTravel({
      origin: values.departure,
      destination: values.destination,
      travel_date: values.date,
      capacity_kg: values.capacity,
    });
    message.success('Voyage créé !');
  };

  return (
    <div>
      <Table dataSource={travels} loading={isLoading} />
      <CreateTripModal onSubmit={handleCreate} />
    </div>
  );
}
```

#### 📦 Détails d'un colis

```typescript
'use client';
import { usePackage } from '@/hooks/usePackages';
import { useParams } from 'next/navigation';

export default function PackageDetails() {
  const params = useParams();
  const id = Number(params.id);
  const { package: pkg, isLoading, isError } = usePackage(id);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;
  if (!pkg) return <NotFound />;

  return (
    <div>
      <h1>{pkg.description}</h1>
      <p>Poids: {pkg.weight_kg} kg</p>
      <Tag>{pkg.status}</Tag>
    </div>
  );
}
```

---

## Services API

### Structure d'un Service

```typescript
// services/travel.service.ts
import api from '@/lib/api';
import type { Travel, TravelCreate } from '@/types/travel.types';

export const travelService = {
  async getMyTravels(): Promise<Travel[]> {
    const { data } = await api.get('/travels/my');
    return data;
  },

  async createTravel(travel: TravelCreate): Promise<Travel> {
    const { data } = await api.post('/travels/', travel);
    return data;
  },

  async deleteTravel(id: number): Promise<void> {
    await api.delete(`/travels/${id}`);
  },
};
```

### Instance Axios avec Intercepteurs

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rediriger vers login
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## Types TypeScript

### Convention de Nommage

| Type | Convention | Exemple |
|------|-----------|---------|
| Interface | PascalCase | `Travel`, `Package` |
| Type Alias | PascalCase | `PackageStatus` |
| Enum | PascalCase | `enum PackageStatus { ... }` |
| Props | PascalCase + Props suffix | `TravelCardProps` |

### Exemple Complet

```typescript
// types/travel.types.ts

// Interface de base (champs communs)
export interface TravelBase {
  origin: string;
  destination: string;
  travel_date: string;
  capacity_kg: number;
}

// Interface pour création (sans ID)
export interface TravelCreate extends TravelBase {}

// Interface complète (avec ID et relations)
export interface Travel extends TravelBase {
  id: number;
  traveler_id: number;
  traveler: User;
  created_at: string;
  updated_at: string;
  packages?: Package[];
}

// Type pour les filtres
export interface TravelFilters {
  origin?: string;
  destination?: string;
  min_capacity?: number;
  date_from?: string;
  date_to?: string;
}
```

### `/components` - Architecture des Composants

Le projet suit une **architecture modulaire** pour faciliter la maintenance et la réutilisabilité :

```
components/
├── layout/           # Composants de mise en page (Header, Footer)
├── sections/         # Sections de pages (CTASection, StatsSection)
├── shared/           # Composants partagés réutilisables
│   └── LocationInput.tsx  # ⭐ Autocomplete de localisation
└── space/            # 🆕 Composants spécifiques à l'espace utilisateur
    ├── trips/        # Composants des voyages
    │   ├── TripCard.tsx           # Carte d'un voyage
    │   ├── TripsList.tsx          # Liste des voyages
    │   ├── CreateTripDrawer.tsx   # Drawer de création
    │   ├── EditTripDrawer.tsx     # Drawer d'édition
    │   └── ViewTripDrawer.tsx     # Drawer de visualisation
    └── packages/     # Composants des colis
        ├── PackageCard.tsx        # Carte d'un colis
        ├── PackagesList.tsx       # Liste des colis
        ├── CreatePackageDrawer.tsx
        ├── EditPackageDrawer.tsx
        └── ViewPackageDrawer.tsx
```

#### Architecture Pattern : Composants Modulaires

**Principe** : Chaque page complexe est décomposée en **composants réutilisables** :

1. **Card** : Affichage individuel d'un élément (voyage/colis)
2. **List** : Conteneur de liste avec pagination
3. **Drawers** : Formulaires de création, édition, visualisation

**Avantages** :
- ✅ **Maintenance facilitée** : Modification isolée
- ✅ **Réutilisabilité** : Composants portables
- ✅ **Testabilité** : Tests unitaires par composant
- ✅ **Lisibilité** : Pages principales simplifiées (~80 lignes au lieu de 400+)
- ✅ **Séparation des préoccupations** : UI séparée de la logique

**Exemple d'utilisation** dans `trips/page.tsx` :

```typescript
'use client';
import { useState } from 'react';
import { useMyTravels, useTravelMutations } from '@/hooks/useTravels';
import TripsList from '@/components/space/trips/TripsList';
import CreateTripDrawer from '@/components/space/trips/CreateTripDrawer';
import EditTripDrawer from '@/components/space/trips/EditTripDrawer';
import ViewTripDrawer from '@/components/space/trips/ViewTripDrawer';

export default function TripsPage() {
  const { travels, isLoading } = useMyTravels();
  const { createTravel, updateTravel, deleteTravel } = useTravelMutations();
  
  return (
    <div>
      <h3>Mes Voyages</h3>
      
      {/* Liste avec pagination */}
      <TripsList
        travels={travels}
        loading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {/* Drawers pour CRUD */}
      <CreateTripDrawer open={createOpen} onClose={...} onSubmit={createTravel} />
      <EditTripDrawer open={editOpen} onClose={...} onSubmit={updateTravel} />
      <ViewTripDrawer open={viewOpen} onClose={...} travel={selectedTrip} />
    </div>
  );
}
```

---

## Composants UI

### Ant Design Components

Utiliser les composants Ant Design pour une cohérence UI :

```typescript
import { Table, Button, Tag, Modal, Drawer, Form, Input, DatePicker } from 'antd';
```

### 📍 LocationInput - Autocomplete de Localisation

**Composant réutilisable** : `@/components/shared/LocationInput`

Composant d'autocomplete pour saisir des **vraies localisations géographiques** en utilisant l'API OpenStreetMap Nominatim.

#### Utilisation

```typescript
import LocationInput from '@/components/shared/LocationInput';

<Form.Item
  name="destination"
  label="Destination"
  rules={[{ required: true, message: 'Veuillez saisir une destination' }]}
>
  <LocationInput placeholder="Rechercher une destination..." />
</Form.Item>
```

#### Fonctionnalités

- ✅ **Autocomplete en temps réel** : Suggestions pendant la frappe
- ✅ **API gratuite** : OpenStreetMap Nominatim (pas de clé requise)
- ✅ **Debouncing** : Optimisation des appels API (500ms)
- ✅ **Localisation française** : Résultats en français
- ✅ **Sauvegarde du format complet** : "Paris, Île-de-France, France"
- ✅ **Compatible Ant Design Form** : Fonctionne avec `Form.Item`

#### Props

```typescript
interface LocationInputProps {
  value?: string;              // Valeur contrôlée
  onChange?: (value: string) => void;  // Callback de changement
  placeholder?: string;        // Placeholder personnalisé
  disabled?: boolean;          // État désactivé
}
```

#### Exemple complet

```typescript
const [form] = Form.useForm();

const handleSubmit = (values: any) => {
  console.log(values.destination); 
  // => "Paris, Île-de-France, France"
};

<Form form={form} onFinish={handleSubmit}>
  <Form.Item name="origin" label="Départ">
    <LocationInput placeholder="Ville de départ..." />
  </Form.Item>
  
  <Form.Item name="destination" label="Destination">
    <LocationInput placeholder="Ville d'arrivée..." />
  </Form.Item>
</Form>
```

#### Pourquoi LocationInput ?

- ✅ **Cohérence des données** : Format standardisé des localisations
- ✅ **Expérience utilisateur** : Pas de fautes de frappe
- ✅ **Données exploitables** : Coordonnées GPS disponibles si besoin
- ✅ **Recherche facilitée** : Localisations complètes et précises

**❌ Ne JAMAIS utiliser** : `<Input placeholder="Paris" />` pour des localisations

**✅ TOUJOURS utiliser** : `<LocationInput placeholder="Rechercher..." />` pour départ/destination/adresse

---

### Règles pour les Formulaires et Actions

#### 📝 FORMULAIRES : Utiliser des DRAWERS

**✅ À FAIRE** : Les formulaires de création et d'édition doivent s'ouvrir dans des **Drawers** (panneau latéral)

```typescript
import { Drawer, Form, Input, Button } from 'antd';
import LocationInput from '@/components/shared/LocationInput';

export default function TripsPage() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <Button onClick={() => setOpen(true)}>Créer un voyage</Button>
      
      <Drawer
        title="Créer un nouveau voyage"
        open={open}
        onClose={() => setOpen(false)}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="origin" label="Départ" rules={[{ required: true }]}>
            <LocationInput placeholder="Rechercher une ville de départ..." />
          </Form.Item>
          <Form.Item name="destination" label="Destination" rules={[{ required: true }]}>
            <LocationInput placeholder="Rechercher une destination..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Créer
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
```

**Pourquoi des Drawers ?**
- ✅ L'utilisateur garde le contexte de la page
- ✅ Idéal pour les formulaires longs
- ✅ Pas de navigation/perte de scroll
- ✅ UX moderne et fluide

#### ⚠️ ACTIONS DESTRUCTIVES : Utiliser des MODALS

**✅ À FAIRE** : Les actions de confirmation (suppression, annulation) doivent utiliser des **Modals** (dialogue centré)

```typescript
import { Modal, message } from 'antd';

const handleDelete = (id: number) => {
  Modal.confirm({
    title: 'Confirmer la suppression',
    content: 'Êtes-vous sûr de vouloir supprimer ce voyage ?',
    okText: 'Supprimer',
    okType: 'danger',
    cancelText: 'Annuler',
    onOk: async () => {
      await deleteTravel(id);
      message.success('Voyage supprimé !');
    },
  });
};
```

**Pourquoi des Modals ?**
- ✅ Attire l'attention sur l'action critique
- ✅ Force l'utilisateur à confirmer
- ✅ Évite les suppressions accidentelles
- ✅ Standard UX pour les confirmations

#### 📊 DÉTAILS/CONSULTATION : Utiliser des DRAWERS

Pour afficher les détails d'un élément sans quitter la page :

```typescript
const [selectedTrip, setSelectedTrip] = useState<Travel | null>(null);

return (
  <>
    <Table
      dataSource={travels}
      onRow={(record) => ({
        onClick: () => setSelectedTrip(record),
      })}
    />
    
    <Drawer
      title="Détails du voyage"
      open={!!selectedTrip}
      onClose={() => setSelectedTrip(null)}
      width={500}
    >
      {selectedTrip && (
        <div>
          <p><strong>Départ :</strong> {selectedTrip.origin}</p>
          <p><strong>Destination :</strong> {selectedTrip.destination}</p>
          <p><strong>Date :</strong> {selectedTrip.travel_date}</p>
        </div>
      )}
    </Drawer>
  </>
);
```

### Résumé des Règles UI

| Action | Composant | Raison |
|--------|-----------|--------|
| **Créer** (formulaire) | `<Drawer>` | Garde le contexte, formulaire long |
| **Éditer** (formulaire) | `<Drawer>` | Modification sans perdre la page |
| **Supprimer** | `<Modal.confirm>` | Confirmation critique |
| **Annuler** | `<Modal.confirm>` | Action irréversible |
| **Voir détails** | `<Drawer>` | Consultation rapide |
| **Message succès/erreur** | `message.success/error` | Feedback léger |

### Custom Components avec Tailwind

```typescript
// components/TravelCard.tsx
interface TravelCardProps {
  travel: Travel;
  onDelete?: (id: number) => void;
}

export function TravelCard({ travel, onDelete }: TravelCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold">
        {travel.origin} → {travel.destination}
      </h3>
      <p className="text-gray-600">{travel.travel_date}</p>
      <Tag color="blue">{travel.capacity_kg} kg</Tag>
      {onDelete && (
        <Button danger onClick={() => onDelete(travel.id)}>
          Supprimer
        </Button>
      )}
    </div>
  );
}
```

---

## Authentification

### Context Auth

```typescript
// context/AuthContext.tsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import type { User } from '@/types/user.types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { token, user } = await authService.login(email, password);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

### Protected Routes

```typescript
// app/(space)/layout.tsx
'use client';
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';

export default function SpaceLayout({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!user) redirect('/auth/login');

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
```

---

## Bonnes Pratiques

### ✅ À FAIRE

1. **Utiliser les hooks SWR** pour tout data fetching
2. **Typer toutes les props** et fonctions
3. **Utiliser les services** au lieu d'appels directs à axios
4. **Invalider le cache** après les mutations
5. **Gérer les états de chargement** et d'erreur
6. **Utiliser Ant Design** pour les composants UI standards
7. **Suivre la convention de nommage** TypeScript
8. **Créer des hooks personnalisés** pour la logique réutilisable
9. **Utiliser les variables d'environnement** pour les URLs
10. **Documenter les fonctions complexes**
11. **Formulaires dans des Drawers** (`<Drawer>` pour create/edit)
12. **Confirmations dans des Modals** (`<Modal.confirm>` pour delete/cancel)

### ❌ À ÉVITER

1. ❌ Appels API directs dans les composants
2. ❌ `any` comme type par défaut
3. ❌ useState/useEffect pour le data fetching
4. ❌ Code CSS inline (utiliser Tailwind ou classes)
5. ❌ Logique métier dans les composants UI
6. ❌ Hardcoder les URLs d'API
7. ❌ Oublier la gestion d'erreur
8. ❌ Mélanger français et anglais dans le code
9. ❌ Dupliquer la logique de fetching
10. ❌ Ignorer les warnings TypeScript
11. ❌ Formulaires dans des Modals (utiliser Drawer)
12. ❌ Actions destructives sans confirmation
13. ❌ Input texte pour localisations (utiliser LocationInput)
14. ❌ Composants monolithiques (créer Card, List, Drawers séparés)

### Checklist de Code Review

```markdown
- [ ] Les hooks SWR sont utilisés pour le data fetching
- [ ] Tous les types TypeScript sont définis
- [ ] Les mutations invalident le cache correctement
- [ ] Les états de chargement sont gérés
- [ ] Les erreurs sont catchées et affichées
- [ ] Les composants sont réutilisables
- [ ] Le code est lisible et documenté
- [ ] Les variables d'environnement sont utilisées
- [ ] Pas de code mort (console.log, imports inutilisés)
- [ ] Les conventions de nommage sont respectées
- [ ] Formulaires create/edit dans des Drawers
- [ ] Actions delete/cancel avec Modal.confirm
- [ ] LocationInput utilisé pour tous les champs de localisation
- [ ] Yarn utilisé pour l'installation de packages (pas npm)
- [ ] Architecture modulaire : Composants extraits dans `/components/space/`
- [ ] Pattern Card + List + Drawers respecté
- [ ] Props handlers définis (onView, onEdit, onDelete, onSubmit)
- [ ] Logique métier dans les pages, UI dans les composants
```

---

## 🚀 Commandes Utiles

### Développement

```bash
# Installer les dépendances
yarn install

# Démarrer le serveur de développement
yarn dev

# Build de production
yarn build

# Vérifier les erreurs TypeScript
yarn tsc --noEmit

# Linter le code
yarn lint
```

### Installation de packages

```bash
# Ajouter une dépendance
yarn add <package-name>

# Ajouter une dépendance de développement
yarn add -D <package-name>

# Supprimer une dépendance
yarn remove <package-name>

# Mettre à jour les dépendances
yarn upgrade
```

**⚠️ NE JAMAIS UTILISER** : `npm install`, `npm add`, `pnpm install`

**✅ TOUJOURS UTILISER** : `yarn install`, `yarn add`, `yarn remove`

---

## Exemples de Patterns Avancés

### Pattern: Optimistic UI

```typescript
const { mutate } = useMyTravels();
const { deleteTravel } = useTravelMutations();

const handleDelete = async (id: number) => {
  // Mise à jour optimiste du cache
  mutate(
    travels.filter(t => t.id !== id),
    false // Ne pas revalider immédiatement
  );

  try {
    await deleteTravel(id);
  } catch (error) {
    // Rollback en cas d'erreur
    mutate();
    message.error('Erreur');
  }
};
```

### Pattern: Pagination avec SWR

```typescript
function usePaginatedTravels(page: number, pageSize: number) {
  const { data, isLoading } = useSWR(
    `/travels?page=${page}&size=${pageSize}`,
    () => travelService.getAllTravels()
  );

  return {
    travels: data?.items || [],
    total: data?.total || 0,
    isLoading,
  };
}
```

### Pattern: Infinite Scroll

```typescript
import useSWRInfinite from 'swr/infinite';

function useInfiniteTravels() {
  const getKey = (pageIndex: number) => `/travels?page=${pageIndex}`;
  
  const { data, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    (url) => api.get(url).then(res => res.data)
  );

  const travels = data ? data.flat() : [];
  const hasMore = data?.[data.length - 1]?.length === 10;

  return {
    travels,
    loadMore: () => setSize(size + 1),
    hasMore,
    isLoading,
  };
}
```

---

## Variables d'Environnement

### `.env.local`

```bash
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Mode de développement
NEXT_PUBLIC_ENV=development
```

### Utilisation

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

---

## Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build
npm run start

# Linting
npm run lint

# Types check
npm run type-check
```

---

## Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [SWR Documentation](https://swr.vercel.app/)
- [Ant Design Components](https://ant.design/components/overview/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## Support

Pour toute question ou problème :
1. Consulter cette documentation
2. Vérifier les types TypeScript
3. Examiner les exemples de code
4. Contacter l'équipe de développement

---

**Dernière mise à jour:** 26 novembre 2025
**Version:** 1.0.0
