export default {
  editor: {
    label: {
      en: "Date Range & Time",
      pt: "Seletor de Data e Hora",
    },
    icon: "fontawesome/regular/calendar-alt",
  },
  sections: {
    settings: { label: { en: 'Settings' } },
    inputStyle: { label: { en: 'Input Style' } },
    dropdownStyle: { label: { en: 'Dropdown Style' } },
    calendarStyle: { label: { en: 'Calendar Style' } },
    timePickerStyle: { label: { en: 'Time Picker Style' } },
    buttonStyle: { label: { en: 'Button Style' } },
  },
  properties: {
    // ==================== CORE SETTINGS ====================
    pickerMode: {
      label: {
        en: "Picker Mode",
        pt: "Modo de Seleção",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "range", label: { en: "Date Range & Time", pt: "Intervalo de Datas e Horas" } },
          { value: "single", label: { en: "Single Date & Time", pt: "Data e Hora Única" } },
        ],
      },
      defaultValue: "range",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Valid values: range | single",
      },
      /* wwEditor:end */
    },

    initialStartDate: {
      label: {
        en: "Initial Start Date",
        pt: "Data Inicial",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: null,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "ISO 8601 date string (e.g., 2025-07-14T09:00:00.000Z)",
      },
      propertyHelp: {
        en: "Initial start date/time in ISO 8601 format",
        pt: "Data/hora inicial no formato ISO 8601",
      },
      /* wwEditor:end */
    },

    initialEndDate: {
      label: {
        en: "Initial End Date",
        pt: "Data Final",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: null,
      hidden: (content) => content?.pickerMode === "single",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "ISO 8601 date string (e.g., 2025-07-20T10:00:00.000Z)",
      },
      propertyHelp: {
        en: "Initial end date/time in ISO 8601 format",
        pt: "Data/hora final no formato ISO 8601",
      },
      /* wwEditor:end */
    },

    // ==================== LABELS (i18n) ====================
    labelStartDate: {
      label: {
        en: "Start Date Label",
        pt: "Label Data Inicial",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Start date*",
      bindable: true,
    },

    labelEndDate: {
      label: {
        en: "End Date Label",
        pt: "Label Data Final",
      },
      type: "Text",
      section: "settings",
      defaultValue: "End date*",
      bindable: true,
      hidden: (content) => content?.pickerMode === "single",
    },

    labelScheduleButton: {
      label: {
        en: "Schedule Button Label",
        pt: "Label Botão Agendar",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Schedule",
      bindable: true,
    },

    labelCancelButton: {
      label: {
        en: "Cancel Button Label",
        pt: "Label Botão Cancelar",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Cancel",
      bindable: true,
    },

    placeholder: {
      label: {
        en: "Placeholder Text",
        pt: "Texto Placeholder",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Select date and time",
      bindable: true,
    },

    // ==================== LOCALE ====================
    locale: {
      label: {
        en: "Locale",
        pt: "Localização",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "en-US", label: "English (US)" },
          { value: "pt-BR", label: "Português (BR)" },
          { value: "es-ES", label: "Español" },
          { value: "fr-FR", label: "Français" },
          { value: "de-DE", label: "Deutsch" },
        ],
      },
      defaultValue: "en-US",
      bindable: true,
    },

    // ==================== TIME SETTINGS ====================
    timePickerType: {
      label: {
        en: "Time Picker Type",
        pt: "Tipo de Seletor de Hora",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "dropdown", label: { en: "Dropdown (Select)", pt: "Dropdown (Select)" } },
          { value: "spinbox", label: { en: "Spinbox (Up/Down)", pt: "Spinbox (Up/Down)" } },
        ],
      },
      defaultValue: "dropdown",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Valid values: dropdown | spinbox",
      },
      propertyHelp: {
        en: "Choose between dropdown select or spinbox with up/down buttons",
        pt: "Escolha entre dropdown select ou spinbox com botões de incremento/decremento",
      },
      /* wwEditor:end */
    },

    timeFormat: {
      label: {
        en: "Time Format",
        pt: "Formato de Hora",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "12h", label: "12-hour (9:00 am)" },
          { value: "24h", label: "24-hour (09:00)" },
        ],
      },
      defaultValue: "12h",
      bindable: true,
    },

    timeStep: {
      label: {
        en: "Time Step (minutes)",
        pt: "Intervalo de Tempo (minutos)",
      },
      type: "Number",
      section: "settings",
      min: 1,
      max: 60,
      step: 1,
      defaultValue: 15,
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        en: "Interval between time options (e.g., 15 = 9:00, 9:15, 9:30...)",
        pt: "Intervalo entre opções de hora (ex: 15 = 9:00, 9:15, 9:30...)",
      },
      /* wwEditor:end */
    },

    labelHours: {
      label: {
        en: "Hours Label",
        pt: "Label de Horas",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Hours",
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        en: "Label displayed above hours column in time picker",
        pt: "Label exibido acima da coluna de horas no seletor de tempo",
      },
      /* wwEditor:end */
    },

    labelMinutes: {
      label: {
        en: "Minutes Label",
        pt: "Label de Minutos",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Minutes",
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        en: "Label displayed above minutes column in time picker",
        pt: "Label exibido acima da coluna de minutos no seletor de tempo",
      },
      /* wwEditor:end */
    },

    // ==================== INPUT STYLE ====================
    inputWidth: {
      label: {
        en: "Width",
        pt: "Largura",
      },
      type: "Length",
      section: "inputStyle",
      defaultValue: "100%",
      bindable: true,
    },

    inputHeight: {
      label: {
        en: "Height",
        pt: "Altura",
      },
      type: "Length",
      section: "inputStyle",
      defaultValue: "48px",
      bindable: true,
    },

    inputBackgroundColor: {
      label: {
        en: "Background Color",
        pt: "Cor de Fundo",
      },
      type: "Color",
      section: "inputStyle",
      defaultValue: "#ffffff",
      bindable: true,
    },

    inputBorderColor: {
      label: {
        en: "Border Color",
        pt: "Cor da Borda",
      },
      type: "Color",
      section: "inputStyle",
      defaultValue: "#d1d5db",
      bindable: true,
    },

    inputBorderWidth: {
      label: {
        en: "Border Width",
        pt: "Largura da Borda",
      },
      type: "Length",
      section: "inputStyle",
      defaultValue: "1px",
      bindable: true,
    },

    inputBorderRadius: {
      label: {
        en: "Border Radius",
        pt: "Arredondamento",
      },
      type: "Length",
      section: "inputStyle",
      defaultValue: "8px",
      bindable: true,
    },

    inputHoverBorderColor: {
      label: {
        en: "Border Color (Hover)",
        pt: "Cor da Borda (Hover)",
      },
      type: "Color",
      section: "inputStyle",
      defaultValue: "#4f46e5",
      bindable: true,
    },

    inputFocusBorderColor: {
      label: {
        en: "Border Color (Focus)",
        pt: "Cor da Borda (Focus)",
      },
      type: "Color",
      section: "inputStyle",
      defaultValue: "#4f46e5",
      bindable: true,
    },

    inputFocusBoxShadow: {
      label: {
        en: "Box Shadow (Focus)",
        pt: "Sombra (Focus)",
      },
      type: "Text",
      section: "inputStyle",
      defaultValue: "0 0 0 3px rgba(79, 70, 229, 0.1)",
      bindable: true,
    },

    inputPadding: {
      label: {
        en: "Padding",
        pt: "Espaçamento Interno",
      },
      type: "Length",
      section: "inputStyle",
      defaultValue: "12px 16px",
      bindable: true,
    },

    inputFontSize: {
      label: {
        en: "Font Size",
        pt: "Tamanho da Fonte",
      },
      type: "Length",
      section: "inputStyle",
      defaultValue: "14px",
      bindable: true,
    },

    inputFontWeight: {
      label: {
        en: "Font Weight",
        pt: "Peso da Fonte",
      },
      type: "Number",
      section: "inputStyle",
      min: 100,
      max: 900,
      step: 100,
      defaultValue: 400,
      bindable: true,
    },

    inputTextColor: {
      label: {
        en: "Text Color",
        pt: "Cor do Texto",
      },
      type: "Color",
      section: "inputStyle",
      defaultValue: "#1f2937",
      bindable: true,
    },

    inputPlaceholderColor: {
      label: {
        en: "Placeholder Color",
        pt: "Cor do Placeholder",
      },
      type: "Color",
      section: "inputStyle",
      defaultValue: "#9ca3af",
      bindable: true,
    },

    inputBoxShadow: {
      label: {
        en: "Box Shadow",
        pt: "Sombra",
      },
      type: "Text",
      section: "inputStyle",
      defaultValue: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      bindable: true,
    },

    inputIconColor: {
      label: {
        en: "Icon Color",
        pt: "Cor dos Ícones",
      },
      type: "Color",
      section: "inputStyle",
      defaultValue: "#6b7280",
      bindable: true,
    },

    inputIconSize: {
      label: {
        en: "Icon Size",
        pt: "Tamanho dos Ícones",
      },
      type: "Length",
      section: "inputStyle",
      defaultValue: "20px",
      bindable: true,
    },

    inputGap: {
      label: {
        en: "Gap Between Elements",
        pt: "Espaçamento Entre Elementos",
      },
      type: "Length",
      section: "inputStyle",
      defaultValue: "12px",
      bindable: true,
    },

    // ==================== DROPDOWN STYLE ====================
    dropdownBackgroundColor: {
      label: {
        en: "Background Color",
        pt: "Cor de Fundo",
      },
      type: "Color",
      section: "dropdownStyle",
      defaultValue: "#ffffff",
      bindable: true,
    },

    dropdownBorderColor: {
      label: {
        en: "Border Color",
        pt: "Cor da Borda",
      },
      type: "Color",
      section: "dropdownStyle",
      defaultValue: "#e5e7eb",
      bindable: true,
    },

    dropdownBorderWidth: {
      label: {
        en: "Border Width",
        pt: "Largura da Borda",
      },
      type: "Length",
      section: "dropdownStyle",
      defaultValue: "1px",
      bindable: true,
    },

    dropdownBorderRadius: {
      label: {
        en: "Border Radius",
        pt: "Arredondamento",
      },
      type: "Length",
      section: "dropdownStyle",
      defaultValue: "12px",
      bindable: true,
    },

    dropdownBoxShadow: {
      label: {
        en: "Box Shadow",
        pt: "Sombra",
      },
      type: "Text",
      section: "dropdownStyle",
      defaultValue: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      bindable: true,
    },

    dropdownPadding: {
      label: {
        en: "Padding",
        pt: "Espaçamento Interno",
      },
      type: "Length",
      section: "dropdownStyle",
      defaultValue: "24px",
      bindable: true,
    },

    dropdownMinWidth: {
      label: {
        en: "Min Width",
        pt: "Largura Mínima",
      },
      type: "Length",
      section: "dropdownStyle",
      defaultValue: "400px",
      bindable: true,
    },

    dropdownWidth: {
      label: {
        en: "Width",
        pt: "Largura",
      },
      type: "Length",
      section: "dropdownStyle",
      defaultValue: "auto",
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        en: "Fixed width for the dropdown (use 'auto' for automatic sizing)",
        pt: "Largura fixa do dropdown (use 'auto' para dimensionamento automático)",
      },
      /* wwEditor:end */
    },

    dropdownMaxWidth: {
      label: {
        en: "Max Width",
        pt: "Largura Máxima",
      },
      type: "Length",
      section: "dropdownStyle",
      defaultValue: "600px",
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        en: "Maximum width for the dropdown",
        pt: "Largura máxima do dropdown",
      },
      /* wwEditor:end */
    },

    // ==================== CALENDAR STYLE ====================
    calendarPrimaryColor: {
      label: {
        en: "Primary Color",
        pt: "Cor Primária",
      },
      type: "Color",
      section: "calendarStyle",
      defaultValue: "#4f46e5",
      bindable: true,
    },

    calendarRangeColor: {
      label: {
        en: "Range Background Color",
        pt: "Cor de Fundo do Intervalo",
      },
      type: "Color",
      section: "calendarStyle",
      defaultValue: "#e0e7ff",
      bindable: true,
    },

    calendarTextColor: {
      label: {
        en: "Text Color",
        pt: "Cor do Texto",
      },
      type: "Color",
      section: "calendarStyle",
      defaultValue: "#1f2937",
      bindable: true,
    },

    calendarHeaderColor: {
      label: {
        en: "Header Color",
        pt: "Cor do Cabeçalho",
      },
      type: "Color",
      section: "calendarStyle",
      defaultValue: "#6b7280",
      bindable: true,
    },

    calendarHoverColor: {
      label: {
        en: "Hover Color",
        pt: "Cor de Hover",
      },
      type: "Color",
      section: "calendarStyle",
      defaultValue: "#f3f4f6",
      bindable: true,
    },

    calendarDisabledColor: {
      label: {
        en: "Disabled Color",
        pt: "Cor Desabilitado",
      },
      type: "Color",
      section: "calendarStyle",
      defaultValue: "#d1d5db",
      bindable: true,
    },

    // ==================== TIME PICKER STYLE ====================
    spinboxGap: {
      label: {
        en: "Gap Between Fields",
        pt: "Espaçamento Entre Campos",
      },
      type: "Length",
      section: "timePickerStyle",
      defaultValue: "8px",
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        en: "Space between hours and minutes columns",
        pt: "Espaço entre as colunas de horas e minutos",
      },
      /* wwEditor:end */
    },

    spinboxLabelColor: {
      label: {
        en: "Label Color",
        pt: "Cor do Label",
      },
      type: "Color",
      section: "timePickerStyle",
      defaultValue: "#6b7280",
      bindable: true,
    },

    spinboxLabelFontSize: {
      label: {
        en: "Label Font Size",
        pt: "Tamanho da Fonte do Label",
      },
      type: "Length",
      section: "timePickerStyle",
      defaultValue: "12px",
      bindable: true,
    },

    spinboxBgColor: {
      label: {
        en: "Background Color",
        pt: "Cor de Fundo",
      },
      type: "Color",
      section: "timePickerStyle",
      defaultValue: "#ffffff",
      bindable: true,
    },

    spinboxBorderColor: {
      label: {
        en: "Border Color",
        pt: "Cor da Borda",
      },
      type: "Color",
      section: "timePickerStyle",
      defaultValue: "#e5e7eb",
      bindable: true,
    },

    spinboxBorderRadius: {
      label: {
        en: "Border Radius",
        pt: "Arredondamento",
      },
      type: "Length",
      section: "timePickerStyle",
      defaultValue: "8px",
      bindable: true,
    },

    spinboxTextColor: {
      label: {
        en: "Text Color",
        pt: "Cor do Texto",
      },
      type: "Color",
      section: "timePickerStyle",
      defaultValue: "#1f2937",
      bindable: true,
    },

    spinboxValueFontSize: {
      label: {
        en: "Value Font Size",
        pt: "Tamanho da Fonte do Valor",
      },
      type: "Length",
      section: "timePickerStyle",
      defaultValue: "14px",
      bindable: true,
    },

    spinboxValueFontWeight: {
      label: {
        en: "Value Font Weight",
        pt: "Peso da Fonte do Valor",
      },
      type: "Number",
      section: "timePickerStyle",
      min: 100,
      max: 900,
      step: 100,
      defaultValue: 400,
      bindable: true,
    },

    spinboxIconColor: {
      label: {
        en: "Icon Color",
        pt: "Cor do Ícone",
      },
      type: "Color",
      section: "timePickerStyle",
      defaultValue: "#6b7280",
      bindable: true,
    },

    timePickerDisabledColor: {
      label: {
        en: "Disabled Time Color",
        pt: "Cor de Horários Indisponíveis",
      },
      type: "Color",
      section: "timePickerStyle",
      defaultValue: "#d1d5db",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Color for unavailable time slots",
      },
      propertyHelp: {
        en: "Color used for time slots that cannot be selected (e.g., end times before start time)",
        pt: "Cor usada para horários que não podem ser selecionados (ex: horários de término antes do horário de início)",
      },
      /* wwEditor:end */
    },

    timePickerInputBgColor: {
      label: {
        en: "Input Background Color",
        pt: "Cor de Fundo do Input",
      },
      type: "Color",
      section: "timePickerStyle",
      defaultValue: "#ffffff",
      bindable: true,
    },

    timePickerInputBorderColor: {
      label: {
        en: "Input Border Color",
        pt: "Cor da Borda do Input",
      },
      type: "Color",
      section: "timePickerStyle",
      defaultValue: "#d1d5db",
      bindable: true,
    },

    timePickerInputTextColor: {
      label: {
        en: "Input Text Color",
        pt: "Cor do Texto do Input",
      },
      type: "Color",
      section: "timePickerStyle",
      defaultValue: "#1f2937",
      bindable: true,
    },

    timePickerInputIconColor: {
      label: {
        en: "Input Icon Color",
        pt: "Cor do Ícone do Input",
      },
      type: "Color",
      section: "timePickerStyle",
      defaultValue: "#6b7280",
      bindable: true,
    },

    // ==================== DATE TEXT STYLE ====================
    dateTextColor: {
      label: {
        en: "Date Text Color",
        pt: "Cor do Texto da Data",
      },
      type: "Color",
      section: "inputStyle",
      defaultValue: "#1f2937",
      bindable: true,
    },

    dateTextBgColor: {
      label: {
        en: "Date Text Background",
        pt: "Fundo do Texto da Data",
      },
      type: "Color",
      section: "inputStyle",
      defaultValue: "#ffffff",
      bindable: true,
    },

    dateTextBorderColor: {
      label: {
        en: "Date Text Border Color",
        pt: "Cor da Borda do Texto da Data",
      },
      type: "Color",
      section: "inputStyle",
      defaultValue: "#d1d5db",
      bindable: true,
    },

    dateTextBorderRadius: {
      label: {
        en: "Date Text Border Radius",
        pt: "Arredondamento do Texto da Data",
      },
      type: "Length",
      section: "inputStyle",
      defaultValue: "6px",
      bindable: true,
    },

    // ==================== BUTTON STYLE ====================
    buttonPrimaryBgColor: {
      label: {
        en: "Primary Button Background",
        pt: "Fundo Botão Primário",
      },
      type: "Color",
      section: "buttonStyle",
      defaultValue: "#4f46e5",
      bindable: true,
    },

    buttonPrimaryTextColor: {
      label: {
        en: "Primary Button Text",
        pt: "Texto Botão Primário",
      },
      type: "Color",
      section: "buttonStyle",
      defaultValue: "#ffffff",
      bindable: true,
    },

    buttonSecondaryBgColor: {
      label: {
        en: "Secondary Button Background",
        pt: "Fundo Botão Secundário",
      },
      type: "Color",
      section: "buttonStyle",
      defaultValue: "transparent",
      bindable: true,
    },

    buttonSecondaryTextColor: {
      label: {
        en: "Secondary Button Text",
        pt: "Texto Botão Secundário",
      },
      type: "Color",
      section: "buttonStyle",
      defaultValue: "#6b7280",
      bindable: true,
    },

    buttonSecondaryBorderColor: {
      label: {
        en: "Secondary Button Border",
        pt: "Borda Botão Secundário",
      },
      type: "Color",
      section: "buttonStyle",
      defaultValue: "#d1d5db",
      bindable: true,
    },

    buttonBorderRadius: {
      label: {
        en: "Border Radius",
        pt: "Arredondamento",
      },
      type: "Length",
      section: "buttonStyle",
      defaultValue: "8px",
      bindable: true,
    },

    buttonHeight: {
      label: {
        en: "Button Height",
        pt: "Altura do Botão",
      },
      type: "Length",
      section: "buttonStyle",
      defaultValue: "40px",
      bindable: true,
    },

    buttonFontSize: {
      label: {
        en: "Font Size",
        pt: "Tamanho da Fonte",
      },
      type: "Length",
      section: "buttonStyle",
      defaultValue: "14px",
      bindable: true,
    },

    buttonFontWeight: {
      label: {
        en: "Font Weight",
        pt: "Peso da Fonte",
      },
      type: "Number",
      section: "buttonStyle",
      min: 100,
      max: 900,
      step: 100,
      defaultValue: 500,
      bindable: true,
    },
  },

  // ==================== TRIGGER EVENTS ====================
  triggerEvents: [
    {
      name: "select",
      label: { en: "On select", pt: "Ao selecionar" },
      event: {
        startDate: "",
        endDate: "",
      },
      /* wwEditor:start */
      default: true,
      /* wwEditor:end */
    },
    {
      name: "change",
      label: { en: "On change", pt: "Ao alterar" },
      event: {
        startDate: "",
        endDate: "",
      },
    },
    {
      name: "clear",
      label: { en: "On clear", pt: "Ao limpar" },
      event: {},
    },
    {
      name: "open",
      label: { en: "On open dropdown", pt: "Ao abrir dropdown" },
      event: {},
    },
    {
      name: "close",
      label: { en: "On close dropdown", pt: "Ao fechar dropdown" },
      event: {},
    },
  ],

  // ==================== ACTIONS ====================
  actions: [
    {
      name: "clearValue",
      label: { en: "Clear value", pt: "Limpar valor" },
      code: "await element.clearValue()",
      /* wwEditor:start */
      propertyHelp: {
        en: "Clears the selected date and time",
        pt: "Limpa a data e hora selecionadas",
      },
      /* wwEditor:end */
    },
    {
      name: "openDropdown",
      label: { en: "Open dropdown", pt: "Abrir dropdown" },
      code: "await element.openDropdown()",
      /* wwEditor:start */
      propertyHelp: {
        en: "Opens the date/time picker dropdown",
        pt: "Abre o dropdown de seleção de data/hora",
      },
      /* wwEditor:end */
    },
    {
      name: "closeDropdown",
      label: { en: "Close dropdown", pt: "Fechar dropdown" },
      code: "await element.closeDropdown()",
      /* wwEditor:start */
      propertyHelp: {
        en: "Closes the date/time picker dropdown",
        pt: "Fecha o dropdown de seleção de data/hora",
      },
      /* wwEditor:end */
    },
  ],
};
