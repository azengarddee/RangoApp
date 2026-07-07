#  RangoApp — Gerador de Receitas com IA

> ⚠️ **AVISO IMPORTANTE SOBRE O VÍDEO DE APRESENTAÇÃO**
> Professor, o vídeo com a apresentação completa do projeto está na pasta `presentation/`. 
> Como o arquivo tem mais de 25 MB, o GitHub exibe a mensagem de erro: _"(Sorry about that, but we can’t show files that are this big right now.)"_
> **Para assistir, por favor, clique no botão "View raw" (ou "Download raw") no canto superior direito da tela do vídeo.**

### 📱 Apresentação da Solução
O **RangoApp** é um aplicativo mobile desenvolvido para combater o desperdício de alimentos. 

**Resumo do Processo:**
- **Front-end:** React Native (Expo).
- **Back-end e IA:** Node.js com Fastify e integração com a API do **Google Gemini 2.5 Flash**.
- **Banco e Auth:** Firebase Authentication e Cloud Firestore (CRUD de receitas).

**A Solução:**
O usuário faz login, seleciona seus ingredientes e escolhe um estilo de refeição. A IA cria uma receita detalhada (apenas com o que o usuário selecionou) que pode ser salva no perfil para consultas futuras.

---

Aplicativo mobile desenvolvido em **React Native (Expo)** que gera receitas personalizadas com Inteligência Artificial a partir dos ingredientes selecionados pelo usuário.

---

##  Funcionalidades

- ✅ **Autenticação** com Firebase (Login / Cadastro / Logout);
- ✅ **Geração de receitas com IA** (Google Gemini) a partir de ingredientes selecionados;
- ✅ **Estilos de receita**: Casa, Restaurante e Dieta;
- ✅ **Vitaminas e Sucos** reconhecidos automaticamente (frutas + leite/água);
- ✅ **Ingredientes controlados**: a IA só usa o que o usuário selecionou + temperos básicos;
- ✅ **Minhas Receitas**: CRUD completo de receitas salvas no Firestore;
- ✅ **Perfil do usuário** com edição de dados e exclusão de conta.

---

##  Tecnologias

| Camada | Tecnologia |
|---|---|
| Mobile | React Native + Expo |
| Autenticação | Firebase Authentication |
| Banco de Dados | Cloud Firestore |
| IA | Google Gemini 2.5 Flash |
| Backend | Node.js + Fastify |
| Validação | Zod |

---

##  Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- Expo Go instalado no celular
- Conta no [Firebase](https://console.firebase.google.com)
- Chave de API do [Google Gemini](https://aistudio.google.com/app/apikey)

---

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/rangoapp.git
cd rangoapp
```

### 2. Instalar dependências do app

```bash
npm install
```

### 3. Configurar o Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edite o arquivo `backend/.env` e coloque sua chave:

```env
GEMINI_API_KEY=SUA_CHAVE_AQUI
PORT=3000
```

### 4. Iniciar o Backend

```bash
# Na pasta backend/
node server.js
```

### 5. Atualizar o IP do Backend no App

Edite o arquivo `src/services/aiService.js` e troque o IP pelo IP do seu computador na rede local:

```js
const API_BASE_URL = "http://SEU_IP_AQUI:3000/api/recipes";
```

> Para descobrir seu IP: rode `ipconfig` no PowerShell e use o **IPv4**.

### 6. Iniciar o App

```bash
# Na pasta raiz do projeto
npx expo start --clear
```

Escaneie o QR Code com o **Expo Go** no celular.

---

##  Estrutura do Projeto

```
rangoapp/
├── src/
│   ├── screens/        # Telas do app (Home, Login, Receitas, Perfil...)
│   ├── services/       # Serviços (IA, Firestore)
│   ├── contexts/       # Context API (AuthContext)
│   ├── config/         # Configuração do Firebase
│   ├── data/           # Dados dos ingredientes
│   └── styles/         # Estilos globais
├── backend/
│   ├── src/
│   │   ├── config/     # Configuração do prompt da IA
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/   # Integração com Gemini API
│   │   └── utils/
│   └── server.js
├── assets/             # Imagens e ícones
├── App.js              # Navegação principal
└── README.md
```

---

##  Autor

Desenvolvido por Gabriel de Araújo Bernardes e Washington Assis Freitas - 2026
