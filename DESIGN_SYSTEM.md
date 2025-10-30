# LUGGAGE Design System

## 🎨 Philosophie de design

> Fusion entre Airbnb (humanité & confiance) et Stripe (clarté & sérieux)

Notre design system vise à créer une expérience qui inspire confiance tout en restant chaleureuse et accessible. L'utilisateur doit comprendre immédiatement comment utiliser l'application tout en se sentant en sécurité.

## 🎯 Principes clés

1. **Clarté avant tout**
   - Hiérarchie visuelle forte
   - Navigation intuitive
   - Messages et instructions explicites

2. **Confiance par le design**
   - Badges de vérification
   - Indicateurs de statut clairs
   - Retours visuels immédiats

3. **Chaleur humaine**
   - Illustrations personnalisées
   - Photographies authentiques
   - Tons chaleureux dans l'UI

## 🎨 Couleurs

### Principale
- Navy (`#001F3F`) - Confiance et professionnalisme
- Gold (`#FFD700`) - Chaleur et premium

### Secondaire
- Bleu clair (`#7FDBFF`) - Action et interactivité
- Vert (`#2ECC40`) - Succès et validation

### Neutres
- Gris foncé (`#333333`)
- Gris moyen (`#999999`)
- Gris clair (`#EEEEEE`)

## 📝 Typographie

### Titres
- Font: Inter
- Poids: 600 (semi-bold)
- Tailles: 
  - H1: 2.5rem
  - H2: 2rem
  - H3: 1.5rem

### Corps de texte
- Font: Inter
- Poids: 400 (regular)
- Taille: 1rem (16px)

## 🧩 Composants

### Boutons
- Primary: Navy avec texte blanc
- Secondary: Outline navy
- Call-to-action: Gold avec texte navy
- Ghost: Transparent avec texte navy

### Cartes
- Ombre légère
- Coins arrondis (8px)
- Hover effect subtil

### Badges
- Status: Différentes couleurs selon l'état
- Vérification: Gold avec icône
- Niveau: Navy avec gradient

### Animations
- Durée: 200-300ms
- Easing: ease-in-out
- Utilisées pour:
  - Transitions de pages
  - Hovers
  - Loading states
  - Feedback interactions

## 📱 Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Principes
- Mobile-first
- Navigation adaptative
- Grilles fluides
- Typography responsive

## 🛠 Implementation Technique

### CSS
```js
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      navy: '#001F3F',
      gold: '#FFD700',
      blue: '#7FDBFF',
      green: '#2ECC40',
      gray: {
        dark: '#333333',
        medium: '#999999',
        light: '#EEEEEE',
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    borderRadius: {
      DEFAULT: '8px',
    },
    boxShadow: {
      card: '0 2px 4px rgba(0,0,0,0.1)',
    }
  }
}
```

### Composants
Utilisation de shadcn/ui avec personnalisation des thèmes pour correspondre à notre design system.
