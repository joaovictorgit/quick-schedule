<p align="center">
  <a href="#" target="blank"><img src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png" width="120" alt="Logo" /></a>
</p>

<h3 align="center"><strong>Reserva rápida (teste Ktech)</strong></h3>

<p align="center">
  <img src="https://img.shields.io/badge/node-v24.2.0-green?style=for-the-badge&logo=node.js" alt="Node Version" />
</p>

## Descrição

Criar uma API REST usando utilizando Node.js com Express e MongoDB, contemplando:

Requisitos técnicos:
Implementação dos métodos HTTP:
- GET
- POST
- PUT ou PATCH
- DELETE
- Uso adequado de status codes HTTP
- Organização do projeto (camadas como routes, controllers, services, models, etc.)
- Boas práticas de código (clean code, legibilidade, padronização)
- Validações básicas de dados

## Setup

<h3 style="font-size: 18px;">🧬 Clonando repositório</h3>

```bash
git clone https://github.com/joaovictorgit/quick-schedule.git
```

<h3 style="font-size: 18px;">📂 Instalar dependências</h3>

```bash
cd quick-schedule
npm install
```

## Adicionando variáveis de ambiente

<h3 style="font-size: 18px">⚙ Crie um arquivo <strong>.env</strong> na raiz da pasta</h3>

```bash
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/schedule-dev
SECRET=schedule-secret
```

## Rodar Mongo via Docker

<h3>Antes de iniciar o projeto, você precisa rodar o comando via <strong>Docker</strong>. Copie o comando abaixo</h3>

```bash
docker compose up -d
```

## Rodar aplicação

```bash
npm run dev
```