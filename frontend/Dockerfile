FROM node:24.2.0

WORKDIR /app

# Copier les fichiers de configuration en premier (pour le cache Docker)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port
EXPOSE 5173

# Lancer en mode développement (pas de build nécessaire)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
