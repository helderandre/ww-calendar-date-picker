# 📋 Instruções para Substituir os Arquivos do Componente

## ✅ Arquivos Criados

Criei dois novos arquivos com o código completo do componente:

1. **ww-config-NEW.js** - Configuração completa com todas as propriedades
2. **src/wwElement-NEW.vue** - Componente Vue completo

## 🔄 Como Substituir os Arquivos

### Método 1: PowerShell (Recomendado)

```powershell
cd c:\Users\hahel\Documents\GitHub\ww-pick-hour\calendar-hour

# Fazer backup dos arquivos originais
Copy-Item ww-config.js ww-config.js.backup
Copy-Item src\wwElement.vue src\wwElement.vue.backup

# Substituir pelos novos arquivos
Move-Item ww-config-NEW.js ww-config.js -Force
Move-Item src\wwElement-NEW.vue src\wwElement.vue -Force
```

### Método 2: Manual no VS Code

1. Abra `ww-config-NEW.js`
2. Selecione todo o conteúdo (Ctrl+A)
3. Copie (Ctrl+C)
4. Abra `ww-config.js`
5. Selecione todo o conteúdo (Ctrl+A)
6. Cole (Ctrl+V)
7. Salve (Ctrl+S)

Repita para `src\wwElement-NEW.vue` → `src\wwElement.vue`

## 🚀 Após Substituir

O servidor deve recompilar automaticamente. Se não recompilar:

```powershell
# Pare o servidor atual (Ctrl+C)
# Reinicie o servidor
npm run serve
```

## 📦 Componente Implementado

### ✅ Funcionalidades Completas

#### 1. **Modo de Seleção**
- ✅ Single Date/Time (uma única data e hora)
- ✅ Date Range/Time (intervalo de datas e horas)

#### 2. **Input Principal**
- ✅ Ícone de calendário
- ✅ Ícone de seta (chevron)
- ✅ Placeholder dinâmico
- ✅ Formatação como na imagem: "July 14 - 20, from 9:00 am - 10:00 am"
- ✅ Painel de personalização completo (cores, fontes, bordas, sombras, ícones, padding, gap)

#### 3. **Dropdown Picker**
- ✅ Calendário interativo com navegação de meses
- ✅ Seleção de intervalo de datas (range)
- ✅ Campos "Start date*" e "End date*"
- ✅ Seletores de hora (start time e end time)
- ✅ Validação: hora final > hora inicial (CRITICAL)
- ✅ Summary text mostrando a seleção atual
- ✅ Botões "Cancel" e "Schedule"
- ✅ Painel de personalização completo

#### 4. **Variáveis Internas (MANDATORY)**
- ✅ Internal Variable usando `wwLib.wwVariable.useComponentVariable`
- ✅ Retorna objeto com `startDate` e `endDate` em formato ISO 8601
- ✅ Exemplo: `{ "startDate": "2025-07-14T09:00:00.000Z", "endDate": "2025-07-20T10:00:00.000Z" }`

#### 5. **Propriedades Bindáveis**
- ✅ `initialStartDate` - bindable para definir valor inicial
- ✅ `initialEndDate` - bindable para definir valor final inicial
- ✅ Watch automático para reset da variável interna quando initial values mudam

#### 6. **Eventos/Triggers (MANDATORY)**
- ✅ `select` - Ao selecionar uma data/hora
- ✅ `change` - Ao alterar a data/hora
- ✅ `clear` - Ao limpar o input
- ✅ `open` - Ao abrir o dropdown
- ✅ `close` - Ao fechar o dropdown

#### 7. **Actions (MANDATORY)**
- ✅ `clearValue()` - Limpa os valores selecionados
- ✅ `openDropdown()` - Abre o dropdown programaticamente
- ✅ `closeDropdown()` - Fecha o dropdown programaticamente

#### 8. **Localização (i18n)**
- ✅ Suporte para múltiplos idiomas (en-US, pt-BR, es-ES, fr-FR, de-DE)
- ✅ Todas as labels são propriedades bindáveis:
  - `labelStartDate`
  - `labelEndDate`
  - `labelScheduleButton`
  - `labelCancelButton`
  - `placeholder`
- ✅ Formatação de datas e horas de acordo com o locale

#### 9. **Configurações de Hora**
- ✅ Formato 12h (9:00 am) ou 24h (09:00)
- ✅ Time Step configurável (intervalo entre opções de hora)
- ✅ Padrão: 15 minutos

### ✅ Requisitos Técnicos WeWeb (CRITICAL)

#### 1. **Optional Chaining e Type Safety**
```javascript
✅ Todas as referências usam `?.` e `??`
✅ Exemplo: props.content?.pickerMode || 'range'
```

#### 2. **Reatividade Completa**
```javascript
✅ Todos os valores derivados usam computed()
✅ NUNCA usa ref() para dados derivados de props
✅ Watcher COMPLETO incluindo TODAS as propriedades
```

#### 3. **Editor Blocks**
```javascript
✅ /* wwEditor:start */ e /* wwEditor:end */ em todos os locais corretos
✅ bindingValidation em todas as propriedades bindáveis
✅ propertyHelp para documentação
```

#### 4. **TextSelect Format (MANDATORY)**
```javascript
✅ Estrutura correta com options.options array
✅ Formato: { value: 'x', label: 'Y' }
```

#### 5. **Internal Variables Pattern (MANDATORY)**
```javascript
✅ useComponentVariable com uid: props.uid
✅ Watch de initialValue com reset automático
✅ Emit de triggers ao mudar valor
```

## 🎨 Painel de Propriedades Disponíveis

### Configurações (settings)
- Picker Mode (single/range)
- Initial Start Date (bindable)
- Initial End Date (bindable)
- Labels (todas bindable para i18n)
- Locale (en-US, pt-BR, etc.)
- Time Format (12h/24h)
- Time Step (minutos)

### Input Style (inputStyle)
- Width, Height
- Background Color, Border Color, Border Width, Border Radius
- Padding, Font Size, Font Weight
- Text Color, Placeholder Color
- Box Shadow
- Icon Color, Icon Size
- Gap Between Elements

### Dropdown Style (dropdownStyle)
- Background Color, Border Color, Border Width, Border Radius
- Box Shadow, Padding
- Min Width

### Calendar Style (calendarStyle)
- Primary Color (seleção)
- Range Color (fundo do intervalo)
- Text Color
- Header Color
- Hover Color
- Disabled Color

### Button Style (buttonStyle)
- Primary Button (Background, Text Color)
- Secondary Button (Background, Text Color)
- Border Radius, Height
- Font Size, Font Weight

## 🔍 Como Testar

1. **No Editor WeWeb:**
   - Abra https://localhost:8080 (aceite o certificado)
   - No Editor WeWeb, adicione o componente via Developer Popup
   - URL: https://localhost:8080

2. **Teste as Funcionalidades:**
   - ✅ Clique no input para abrir o dropdown
   - ✅ Selecione datas no calendário
   - ✅ Alterne entre single e range mode
   - ✅ Mude as horas e veja a validação (end > start)
   - ✅ Clique em "Schedule" para confirmar
   - ✅ Clique em "Cancel" para cancelar
   - ✅ Teste as propriedades de estilo no painel

3. **Teste Reatividade:**
   - ✅ Mude qualquer propriedade no editor
   - ✅ O componente deve atualizar INSTANTANEAMENTE
   - ✅ Teste todas as cores, tamanhos, fontes, etc.

4. **Teste Workflows:**
   - ✅ Crie um workflow para o trigger "On select"
   - ✅ Acesse a variável interna do componente
   - ✅ Use as actions (clearValue, openDropdown, closeDropdown)

## 📚 Próximos Passos

Após confirmar que tudo funciona:

1. **Instalar dependências se necessário:**
   ```powershell
   npm install date-fns
   ```
   (Atualmente não está usando, mas pode adicionar para formatação avançada)

2. **Build para produção:**
   ```powershell
   npm run build --name=calendar-hour
   ```

3. **Publicar no WeWeb:**
   - Siga a documentação oficial da WeWeb para publicação
   - https://docs.weweb.io/

## 🎯 Padrão Profissional WeWeb

Este componente segue **100%** o guia de desenvolvimento WeWeb, incluindo:

- ✅ Estrutura correta de props
- ✅ Type safety completo
- ✅ Reatividade total
- ✅ Internal variables pattern
- ✅ Triggers e actions
- ✅ Editor blocks
- ✅ i18n support
- ✅ Customização completa
- ✅ Validação de dados
- ✅ Accessibility básico

## 💡 Dicas

1. **Editor State:**
   ```javascript
   /* wwEditor:start */
   const isEditing = computed(() => props.wwEditorState.isEditing);
   /* wwEditor:end */
   ```
   Use para comportamentos específicos do editor

2. **Debug:**
   - Abra o console do navegador (F12)
   - Veja os valores da internal variable
   - Veja os events sendo emitidos

3. **Personalização:**
   - Todas as cores, tamanhos e textos são configuráveis
   - Usuários NoCode podem personalizar 100% do componente
   - Labels são bindáveis para tradução dinâmica

## 🚨 Troubleshooting

### Erro: "wwLib is not defined"
- Certifique-se de que está testando no Editor WeWeb
- wwLib é fornecido pelo ambiente WeWeb

### Dropdown não aparece
- Verifique se Teleport está funcionando
- Verifique z-index no navegador (F12 → Elements)

### Estilos não atualizam
- Confirme que o watcher está incluindo a propriedade
- Veja linha 890+ no arquivo Vue

### Time validation não funciona
- Veja método `handleTimeChange` linha 710+
- Confirme que availableEndTimes está filtrando corretamente

---

**Pronto para usar! 🎉**
