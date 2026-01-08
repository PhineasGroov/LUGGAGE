FROM python:3.12

WORKDIR /app

# Copier d'abord requirements.txt pour profiter du cache Docker
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code
COPY . .

# Create uploads directory
RUN mkdir -p /app/uploads/travel_documents && chmod 755 /app/uploads

# Mode développement avec reload automatique
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]
