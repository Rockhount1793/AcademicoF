FROM node:18-alpine

# Directorio donde estara nuestra aplicacion en el contenedor
WORKDIR /code

COPY package.json yarn.lock ./

RUN npm install --frozen-lockfile

COPY . .


EXPOSE $APP_PORT

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev", "--host"]