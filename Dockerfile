FROM node:18-alpine

# Directorio donde estara nuestra aplicacion en el contenedor
WORKDIR /code

COPY package.json ./

RUN npm install --frozen-lockfile

COPY . .


ENV PORT=$PORT

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev", "--host"]