# Instalação de ferramentas de desenvolvimento

# Iniciar o Yarn - Gestão de pacotes
yarn init -y

# Adicionar o Express - Framework que fornece feature rebusto para desenvolvimento de aplicações (middleware request to HTTP)

yarn add express --save

# add Type/express - Fornece métodos para especificar qual funcção é chamado para o verbo HTTP (GET, POST,SET) e Routes
yarn add @types/express -D

# Instalar typeScript
npm install ts-node --save-dev

# Gerar Arquivo de configuração Typescript (typeorm)

typeorm init

# Especificar Base de dados pg - Postgres
typeorm init --database pg

# Mapa lista, ect
npm install lodash @types/lodash --save-dev

# Adicionar refelct metadata pg - postgres
yarn add typeorm reflect-metadata pg

# Definir data-source

# Add script in package json
"scripts": {
     "start": "nodemon --watch src/**/* --exec ts-node src/index.ts",
     "typeorm": "typeorm-ts-node-commonjs",
     "migration:generate":"typeorm-ts-node-commonjs -d ./src/data-source.ts migration:generate ./src/migration/default",
     "migration:run": "typeorm-ts-node-commonjs -d ./src/datasource.ts migration:run"
     
  }

# Create Migration
typeorm migration:create .src/migration/table-updated

# Generate Migration - Só funciona quando há alterações nas colunas existentes. Para novas colunas, não há generate
typeorm migration:generate -d ./src/data-source.ts  ./src/migration/table_updated 

# Add inversify for DI - Dependene injection
yarn add inversify

# Add cors
yarn add cors

# add async error
yarn add  express-async-errors

# Ferramenta de teste TDD
npm i -D jest ts-jest @types/jest

# Install stream
npm install stream --save 

# Install stream array
npm install stream-array --save
# Install chai for jest test
npm install chai --save

# intsall mocha for jest test 
npm install mocha --save

# Run test
npm test -- -w

# Intsal axios to be use in jest test
npm install axios @types/axios axios-mock-adapter @types/axios-mock-adapter -D

# Semaphore for access control
npm install semaphore-async-await

# install Typescript Paginator
npm install paginator

# install dn-fn - is a popular lightweight JavaScript library for working with dates and times
npm install date-fns

# query to refresh privileges: - Allow user authentication in mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Nantoi01*';