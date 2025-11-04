# Calendar Hour - WeWeb Custom Component

Este é um componente customizado de calendário de horas para [weweb.io](https://www.weweb.io/).

## Instalação

Para rodar localmente, primeiro instale todas as dependências com `npm install`

## Desenvolvimento

Para servir localmente, execute `npm run serve --port=[PORT]` (porta padrão: 8080), e então vá ao Editor WeWeb, abra o popup de desenvolvedor e adicione seu elemento customizado.

Exemplo:
```bash
npm run serve --port=8080
```

Depois, acesse https://localhost:8080 no seu navegador e autorize o certificado.

## Build

Antes de fazer o release, você pode checar erros de build executando `npm run build --name=calendar-hour`

## Estrutura do Projeto

- `src/wwElement.vue` - Componente Vue principal
- `ww-config.js` - Configuração das propriedades do componente
- `package.json` - Dependências e scripts
