# Usando uma imagem leve do Node
FROM node:20-slim

# Cria o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o Express usa
EXPOSE 3000

# Comando para rodar em modo de desenvolvimento
CMD ["npm", "run", "dev"]