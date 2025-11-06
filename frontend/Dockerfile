FROM node:24.2.0

WORKDIR /app

# Copier les fichiers de configuration en premier (pour le cache Docker)
COPY package*.json ./

# Installer les dépendances
RUN yarn install

# Copier le reste des fichiers
COPY . .

# Exposer le port Next.js
EXPOSE 3000

# Variables d environnement pour Next.js
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Lancer en mode développement
CMD ["npm", "run", "dev"]
