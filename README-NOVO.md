# 🗓️ Date Time Picker - WeWeb Component

**Componente profissional de seleção de data e hora para WeWeb**, seguindo rigorosamente todos os padrões e requisitos críticos do framework.

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![WeWeb](https://img.shields.io/badge/WeWeb-compatible-blue)
![Vue 3](https://img.shields.io/badge/Vue-3-green)

## 📸 Preview

Componente que replica a funcionalidade da imagem de referência:
- Seleção de intervalo de datas
- Seleção de horas com validação
- Interface moderna e customizável
- Formato: "July 14 - 20, from 9:00 am - 10:00 am"

## ✨ Funcionalidades

### 🎯 Principais
- ✅ **Modo Single**: Seleção de uma única data e hora
- ✅ **Modo Range**: Seleção de intervalo de datas e horas
- ✅ **Validação Automática**: Hora final sempre maior que hora inicial
- ✅ **Calendário Interativo**: Navegação por meses, visualização de intervalos
- ✅ **100% Customizável**: Cores, fontes, tamanhos, bordas, sombras

### 🌍 Localização (i18n)
- Suporte para múltiplos idiomas (en-US, pt-BR, es-ES, fr-FR, de-DE)
- Todas as labels são bindáveis para tradução dinâmica
- Formatação de datas/horas de acordo com o locale

### ⚙️ Configurações
- **Formato de Hora**: 12h (9:00 am) ou 24h (09:00)
- **Time Step**: Intervalo personalizável entre opções de hora (padrão: 15min)
- **Valores Iniciais**: Bindáveis para definir data/hora inicial

## 🚀 Instalação

```bash
cd calendar-hour
npm install
npm run serve
```

Acesse https://localhost:8080 no navegador (aceite o certificado SSL).

No Editor WeWeb:
1. Abra o Developer Popup
2. Adicione: `https://localhost:8080`
3. Componente aparecerá na barra lateral

## 📦 Estrutura

```
calendar-hour/
├── src/
│   └── wwElement.vue          # Componente Vue principal
├── ww-config.js               # Configuração de propriedades
├── package.json               # Scripts e dependências
├── INSTRUCOES.md             # Guia de implementação detalhado
└── README.md                  # Este arquivo
```

## 🎨 Propriedades Disponíveis

### Core Settings
| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `pickerMode` | TextSelect | `range` | Modo de seleção (single/range) |
| `initialStartDate` | Text | `null` | Data inicial em ISO 8601 |
| `initialEndDate` | Text | `null` | Data final em ISO 8601 |
| `locale` | TextSelect | `en-US` | Localização do componente |
| `timeFormat` | TextSelect | `12h` | Formato de hora (12h/24h) |
| `timeStep` | Number | `15` | Intervalo entre horas (minutos) |

### Labels (i18n)
| Propriedade | Tipo | Padrão | Bindable |
|------------|------|--------|----------|
| `labelStartDate` | Text | `Start date*` | ✅ |
| `labelEndDate` | Text | `End date*` | ✅ |
| `labelScheduleButton` | Text | `Schedule` | ✅ |
| `labelCancelButton` | Text | `Cancel` | ✅ |
| `placeholder` | Text | `Select date and time` | ✅ |

### Input Style
- Width, Height, Background Color, Border (Color/Width/Radius)
- Padding, Font (Size/Weight), Text Color, Placeholder Color
- Box Shadow, Icon (Color/Size), Gap

### Dropdown Style
- Background Color, Border (Color/Width/Radius)
- Box Shadow, Padding, Min Width

### Calendar Style
- Primary Color, Range Color, Text Color
- Header Color, Hover Color, Disabled Color

### Button Style
- Primary/Secondary Button (Background/Text Color)
- Border Radius, Height, Font (Size/Weight)

## 🔧 Variável Interna

O componente expõe uma **variável interna** acessível em workflows:

```json
{
  "startDate": "2025-07-14T09:00:00.000Z",
  "endDate": "2025-07-20T10:00:00.000Z"
}
```

Valores em formato **ISO 8601** (UTC).

## ⚡ Eventos (Triggers)

| Evento | Quando dispara | Dados |
|--------|---------------|-------|
| `select` | Ao clicar em "Schedule" | `{ startDate, endDate }` |
| `change` | Ao alterar seleção | `{ startDate, endDate }` |
| `clear` | Ao limpar valores | `{}` |
| `open` | Ao abrir dropdown | `{}` |
| `close` | Ao fechar dropdown | `{}` |

## 🎬 Actions (Ações de Componente)

| Ação | Descrição |
|------|-----------|
| `clearValue()` | Limpa a seleção atual |
| `openDropdown()` | Abre o dropdown programaticamente |
| `closeDropdown()` | Fecha o dropdown programaticamente |

## 💻 Exemplo de Uso

### Workflow Exemplo 1: Capturar Seleção
```
Trigger: Date Time Picker > On select
Action: Variable > Set
  Variable: agendamento
  Value: {{component.value}}
```

### Workflow Exemplo 2: Limpar ao Resetar Formulário
```
Trigger: Button > On click
Action: Component Action > Date Time Picker > clearValue
```

### Workflow Exemplo 3: Binding Inicial
```
Initial Start Date: {{userData.meetingStart}}
Initial End Date: {{userData.meetingEnd}}
```

## 🎯 Padrões WeWeb Implementados

### ✅ MANDATORY & CRITICAL Requirements

1. **Type Safety**: Todas as referências usam `?.` e `??`
2. **Reactivity**: `computed()` para valores derivados, watcher completo
3. **Internal Variables**: Pattern completo com `useComponentVariable`
4. **Editor Blocks**: `/* wwEditor:start/end */` em todos os locais
5. **TextSelect Format**: Estrutura correta `options.options`
6. **Actions**: Expostas via `defineExpose`
7. **Triggers**: Todos os eventos emitidos corretamente

## 🧪 Como Testar

1. **Funcionalidade Básica**:
   - Clique no input → Dropdown abre
   - Selecione datas no calendário
   - Altere horas nos selects
   - Clique "Schedule" → Input atualiza

2. **Modo Range**:
   - Selecione data inicial
   - Selecione data final
   - Veja intervalo destacado no calendário
   - Summary mostra: "July 14 - 20, from 9:00 am - 10:00 am"

3. **Validação**:
   - Selecione hora inicial: 9:00 am
   - Tente selecionar hora final: 8:00 am
   - Hora final será ajustada automaticamente para > 9:00 am

4. **Reatividade**:
   - Mude qualquer propriedade no editor
   - Componente atualiza INSTANTANEAMENTE
   - Teste cores, tamanhos, textos, etc.

5. **Workflows**:
   - Crie workflow para "On select"
   - Acesse `{{component.value.startDate}}`
   - Use actions em botões

## 🔍 Troubleshooting

### Dropdown não aparece
- Verifique z-index no DevTools
- Confirme que Teleport está funcionando
- Veja console para erros

### Estilos não atualizam
- Confirme que watcher inclui a propriedade
- Veja linha 890+ em wwElement.vue

### wwLib is not defined
- Componente deve rodar no Editor WeWeb
- wwLib é fornecido pelo ambiente

## 📝 Build para Produção

```bash
npm run build --name=calendar-hour
```

Verifique erros antes de publicar.

## 🤝 Contribuindo

Este componente segue o **WeWeb Component Development Guide** completo.

Ao fazer modificações:
1. Mantenha type safety (`?.` e `??`)
2. Use `computed()` para reatividade
3. Inclua propriedades no watcher
4. Adicione `/* wwEditor:start/end */` quando necessário
5. Teste no Editor WeWeb antes de commitar

## 📄 Licença

MIT

## 🔗 Links Úteis

- [WeWeb Documentation](https://docs.weweb.io/)
- [Vue 3 Documentation](https://vuejs.org/)
- [WeWeb Component Guide](https://docs.weweb.io/getting-started/custom-components/)

---

**Desenvolvido seguindo os padrões profissionais WeWeb** ✨
