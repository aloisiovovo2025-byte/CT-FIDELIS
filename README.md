# CT Fidelis - Landing Page

Landing page profissional para o centro de treinamento de Taekwondo CT Fidelis.

## Deploy no Render

### Opção 1: Deploy Automático (Blueprint)

1. Faça fork/clone deste repositório
2. No Render Dashboard, clique em **New** > **Blueprint**
3. Conecte seu repositório GitHub
4. O Render detectará automaticamente o `render.yaml` e configurará o deploy

### Opção 2: Deploy Manual (Static Site)

1. No Render Dashboard, clique em **New** > **Static Site**
2. Conecte seu repositório GitHub
3. Configure:
   - **Name**: ct-fidelis-landing
   - **Build Command**: `cd frontend && yarn install && yarn build`
   - **Publish Directory**: `frontend/build`
4. Clique em **Create Static Site**

## Configurações

- **Build Command**: `cd frontend && yarn install && yarn build`
- **Publish Directory**: `frontend/build`
- **Node Version**: 18+ (automático)

## Variáveis de Ambiente

Não são necessárias variáveis de ambiente para este projeto estático.

## Estrutura

```
/app
├── frontend/          # React App
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── build/         # Gerado após build
└── render.yaml        # Configuração Render Blueprint
```

## Contato

- WhatsApp: +55 31 9490-4574
- Instagram: @equipefidelistkd
- Email: williamf.silva157@gmail.com
