<template>
  <div class="datetime-picker-wrapper">
    <!-- INPUT FIELD -->
    <div
      class="datetime-input"
      :style="inputStyle"
      @click="toggleDropdown"
      role="button"
      tabindex="0"
      @keydown.enter="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
    >
      <!-- Calendar Icon -->
      <svg
        class="input-icon"
        :style="iconStyle"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>

      <!-- Display Text -->
      <span class="input-text" :class="{ 'is-placeholder': !displayText }">
        {{ displayText || props.content?.placeholder || 'Select date and time' }}
      </span>

      <!-- Chevron Icon -->
      <svg
        class="input-icon chevron-icon"
        :style="iconStyle"
        :class="{ 'is-open': isDropdownOpen }"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>

    <!-- DROPDOWN PANEL -->
    <div
      v-if="isDropdownOpen"
      class="datetime-dropdown"
      :style="dropdownStyle"
      ref="dropdownRef"
    >
          <!-- CALENDAR -->
          <div class="calendar-section">
            <!-- Calendar Header -->
            <div class="calendar-header">
              <button
                class="calendar-nav-btn"
                @click="previousMonth"
                type="button"
                :style="navButtonStyle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <h3 class="calendar-title" :style="calendarHeaderStyle">
                {{ currentMonthName }} {{ currentYear }}
              </h3>
              <button
                class="calendar-nav-btn"
                @click="nextMonth"
                type="button"
                :style="navButtonStyle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            <!-- Weekday Headers -->
            <div class="calendar-weekdays">
              <div
                v-for="day in weekdayLabels"
                :key="day"
                class="calendar-weekday"
                :style="weekdayStyle"
              >
                {{ day }}
              </div>
            </div>

            <!-- Calendar Days -->
            <div class="calendar-days">
              <button
                v-for="(day, index) in calendarDays"
                :key="index"
                class="calendar-day"
                :class="{
                  'is-today': day.isToday,
                  'is-other-month': day.isOtherMonth,
                  'is-selected': day.isSelected,
                  'is-in-range': day.isInRange,
                  'is-range-start': day.isRangeStart,
                  'is-range-end': day.isRangeEnd,
                }"
                :style="getDayStyle(day)"
                @click="selectDate(day)"
                type="button"
                :disabled="day.isOtherMonth"
              >
                {{ day.day }}
              </button>
            </div>
          </div>

          <!-- DATE/TIME INPUTS -->
          <div class="datetime-inputs">
            <!-- Start Date/Time -->
            <div class="datetime-input-group">
              <div class="datetime-label-row">
                <label class="datetime-label" :style="labelStyle">
                  {{ props.content?.labelStartDate || 'Start date*' }}
                </label>
                <span class="datetime-text" :style="dateTextStyle">
                  {{ formattedStartDate }}
                </span>
              </div>
              
              <!-- Time Input with Dropdown -->
              <div v-if="canShowTimeInputs" class="datetime-input-row">
                <div class="time-input-wrapper full-width">
                  <button
                    type="button"
                    class="time-input-button"
                    :style="fieldStyle"
                    @click="toggleStartTimePicker"
                  >
                    <span>{{ formatTimeDisplay(tempStartTime || startTime) }}</span>
                    <svg class="time-input-chevron" :class="{ 'is-open': isStartTimePickerOpen }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  
                  <!-- Time Picker Dropdown -->
                  <div 
                    v-if="isStartTimePickerOpen"
                    ref="startTimePickerRef"
                    class="time-picker-dropdown"
                    :style="{ ...timeContainerStyle, ...timePickerDropdownStyle }"
                  >
                    <div class="time-column">
                      <label class="time-column-label" :style="spinboxLabelStyle">
                        {{ props.content?.labelHours || 'Hours' }}
                      </label>
                      <div class="time-column-scroll" :style="timeColumnScrollStyle">
                        <button
                          v-for="hour in availableHours"
                          :key="hour.value"
                          type="button"
                          class="time-option"
                          :class="{ 'is-selected': hour.value === tempStartTimeHour }"
                          :style="getTimeOptionStyle(hour.value === tempStartTimeHour)"
                          @click="selectStartTime(hour.value, tempStartTimeMinute)"
                        >
                          {{ hour.label }}
                        </button>
                      </div>
                    </div>
                    
                    <div class="time-column-separator">:</div>
                    
                    <div class="time-column">
                      <label class="time-column-label" :style="spinboxLabelStyle">
                        {{ props.content?.labelMinutes || 'Minutes' }}
                      </label>
                      <div class="time-column-scroll" :style="timeColumnScrollStyle">
                        <button
                          v-for="minute in availableMinutes"
                          :key="minute.value"
                          type="button"
                          class="time-option"
                          :class="{ 'is-selected': minute.value === tempStartTimeMinute }"
                          :style="getTimeOptionStyle(minute.value === tempStartTimeMinute)"
                          @click="selectStartTime(tempStartTimeHour, minute.value)"
                        >
                          {{ minute.label }}
                        </button>
                      </div>
                    </div>
                    
                    <!-- Time Picker Actions -->
                    <div class="time-picker-actions">
                      <button
                        type="button"
                        class="time-picker-btn time-picker-btn-close"
                        :style="timePickerCloseButtonStyle"
                        @click="closeStartTimePicker"
                        :title="props.content?.labelTimePickerClose || 'Close'"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      <button
                        type="button"
                        class="time-picker-btn time-picker-btn-confirm"
                        :style="timePickerConfirmButtonStyle"
                        @click="confirmStartTimePicker"
                        :title="props.content?.labelTimePickerConfirm || 'Confirm'"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- End Date/Time -->
            <div class="datetime-input-group">
              <div class="datetime-label-row">
                <label class="datetime-label" :style="labelStyle">
                  {{ isRangeMode ? (props.content?.labelEndDate || 'End date*') : 'End time*' }}
                </label>
                <span v-if="isRangeMode" class="datetime-text" :style="dateTextStyle">
                  {{ formattedEndDate }}
                </span>
              </div>
              
              <!-- Time Input with Dropdown -->
              <div v-if="canShowTimeInputs" class="datetime-input-row">
                <div class="time-input-wrapper full-width">
                  <button
                    type="button"
                    class="time-input-button"
                    :style="fieldStyle"
                    @click="toggleEndTimePicker"
                  >
                    <span>{{ formatTimeDisplay(tempEndTime || endTime) }}</span>
                    <svg class="time-input-chevron" :class="{ 'is-open': isEndTimePickerOpen }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  
                  <!-- Time Picker Dropdown -->
                  <div 
                    v-if="isEndTimePickerOpen"
                    ref="endTimePickerRef"
                    class="time-picker-dropdown"
                    :style="{ ...timeContainerStyle, ...timePickerDropdownStyle }"
                  >
                    <div class="time-column">
                      <label class="time-column-label" :style="spinboxLabelStyle">
                        {{ props.content?.labelHours || 'Hours' }}
                      </label>
                      <div class="time-column-scroll" :style="timeColumnScrollStyle">
                        <button
                          v-for="hour in availableHours"
                          :key="hour.value"
                          type="button"
                          class="time-option"
                          :class="{ 
                            'is-selected': hour.value === tempEndTimeHour,
                            'is-disabled': isEndTimeDisabled(hour.value, tempEndTimeMinute || '00')
                          }"
                          :style="getTimeOptionStyle(hour.value === tempEndTimeHour, isEndTimeDisabled(hour.value, tempEndTimeMinute || '00'))"
                          :disabled="isEndTimeDisabled(hour.value, tempEndTimeMinute || '00')"
                          @click="selectEndTime(hour.value, tempEndTimeMinute)"
                        >
                          {{ hour.label }}
                        </button>
                      </div>
                    </div>
                    
                    <div class="time-column-separator">:</div>
                    
                    <div class="time-column">
                      <label class="time-column-label" :style="spinboxLabelStyle">
                        {{ props.content?.labelMinutes || 'Minutes' }}
                      </label>
                      <div class="time-column-scroll" :style="timeColumnScrollStyle">
                        <button
                          v-for="minute in availableMinutes"
                          :key="minute.value"
                          type="button"
                          class="time-option"
                          :class="{ 
                            'is-selected': minute.value === tempEndTimeMinute,
                            'is-disabled': isEndTimeDisabled(tempEndTimeHour || '00', minute.value)
                          }"
                          :style="getTimeOptionStyle(minute.value === tempEndTimeMinute, isEndTimeDisabled(tempEndTimeHour || '00', minute.value))"
                          :disabled="isEndTimeDisabled(tempEndTimeHour || '00', minute.value)"
                          @click="selectEndTime(tempEndTimeHour, minute.value)"
                        >
                          {{ minute.label }}
                        </button>
                      </div>
                    </div>
                    
                    <!-- Time Picker Actions -->
                    <div class="time-picker-actions">
                      <button
                        type="button"
                        class="time-picker-btn time-picker-btn-close"
                        :style="timePickerCloseButtonStyle"
                        @click="closeEndTimePicker"
                        :title="props.content?.labelTimePickerClose || 'Close'"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      <button
                        type="button"
                        class="time-picker-btn time-picker-btn-confirm"
                        :style="timePickerConfirmButtonStyle"
                        @click="confirmEndTimePicker"
                        :title="props.content?.labelTimePickerConfirm || 'Confirm'"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ACTION BUTTONS -->
          <div class="datetime-actions">
            <button
              class="datetime-btn datetime-btn-secondary"
              :style="secondaryButtonStyle"
              @click="handleCancel"
              type="button"
            >
              {{ props.content?.labelCancelButton || 'Cancel' }}
            </button>
            <button
              class="datetime-btn datetime-btn-primary"
              :style="primaryButtonStyle"
              :class="{ 'is-disabled': !canSchedule }"
              :disabled="!canSchedule"
              @click="handleSchedule"
              type="button"
            >
              {{ props.content?.labelScheduleButton || 'Schedule' }}
            </button>
          </div>
        </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

// ==================== PROPS ====================
const props = defineProps({
  uid: { type: String, required: true },
  content: { type: Object, required: true },
  /* wwEditor:start */
  wwEditorState: { type: Object, required: true },
  /* wwEditor:end */
});

const emit = defineEmits(['trigger-event', 'update:content']);

// ==================== INTERNAL VARIABLES ====================
const { value: internalValue, setValue: setInternalValue } = wwLib.wwVariable.useComponentVariable({
  uid: props.uid,
  name: 'value',
  type: 'object',
  defaultValue: { startDate: null, endDate: null },
});

// ==================== STATE ====================
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

// Time picker dropdown state
const isStartTimePickerOpen = ref(false);
const isEndTimePickerOpen = ref(false);
const startTimePickerRef = ref(null);
const endTimePickerRef = ref(null);

// Track hour/minute selection (to close only when both are selected)
const startTimeHourSelected = ref(false);
const startTimeMinuteSelected = ref(false);
const endTimeHourSelected = ref(false);
const endTimeMinuteSelected = ref(false);

// Calendar state
const currentDate = ref(new Date());
const selectedStartDate = ref(null);
const selectedEndDate = ref(null);
const startTime = ref('09:00');
const endTime = ref('10:00');

// Temporary selection (before clicking Schedule)
const tempStartDate = ref(null);
const tempEndDate = ref(null);
const tempStartTime = ref('09:00');
const tempEndTime = ref('10:00');

// ==================== COMPUTED - MODE ====================
const isRangeMode = computed(() => {
  return props.content?.pickerMode === 'range';
});

// ==================== COMPUTED - LOCALE ====================
const localeCode = computed(() => {
  return props.content?.locale || 'en-US';
});

const weekdayLabels = computed(() => {
  const date = new Date(2025, 0, 5); // A Sunday
  const labels = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(date);
    day.setDate(date.getDate() + i);
    labels.push(
      day.toLocaleDateString(localeCode.value, { weekday: 'short' })
    );
  }
  return labels;
});

const currentMonthName = computed(() => {
  return currentDate.value.toLocaleDateString(localeCode.value, { month: 'long' });
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});

// ==================== COMPUTED - TIME OPTIONS ====================
const timeFormat = computed(() => props.content?.timeFormat || '12h');

const availableHours = computed(() => {
  const hours = [];
  const format = timeFormat.value;

  for (let hour = 0; hour < 24; hour++) {
    const value = String(hour).padStart(2, '0');
    let label = value;

    if (format === '12h') {
      const period = hour >= 12 ? 'pm' : 'am';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      label = `${displayHour} ${period}`;
    }

    hours.push({ value, label });
  }

  return hours;
});

const availableMinutes = computed(() => {
  const minutes = [];
  const step = props.content?.timeStep || 15;

  for (let minute = 0; minute < 60; minute += step) {
    const value = String(minute).padStart(2, '0');
    minutes.push({ value, label: value });
  }

  return minutes;
});

const timeOptions = computed(() => {
  const options = [];
  const step = props.content?.timeStep || 15;
  const format = props.content?.timeFormat || '12h';

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += step) {
      const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      let label = value;

      if (format === '12h') {
        const period = hour >= 12 ? 'pm' : 'am';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        label = `${displayHour}:${String(minute).padStart(2, '0')} ${period}`;
      }

      options.push({ value, label });
    }
  }

  return options;
});

const availableStartTimes = computed(() => {
  return timeOptions.value;
});

const availableEndTimes = computed(() => {
  // Filter end times to only show times after start time
  if (!isRangeMode.value) return timeOptions.value;

  const startTimeValue = tempStartTime.value || startTime.value;
  const startIndex = timeOptions.value.findIndex(t => t.value === startTimeValue);

  return timeOptions.value.filter((_, index) => index > startIndex);
});

// ==================== COMPUTED - SPINBOX TIME PARTS ====================
const tempStartTimeHour = computed(() => (tempStartTime.value || startTime.value).split(':')[0]);
const tempStartTimeMinute = computed(() => (tempStartTime.value || startTime.value).split(':')[1]);
const tempEndTimeHour = computed(() => (tempEndTime.value || endTime.value).split(':')[0]);
const tempEndTimeMinute = computed(() => (tempEndTime.value || endTime.value).split(':')[1]);

// ==================== COMPUTED - CALENDAR ====================
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const firstDayOfWeek = firstDay.getDay();
  const lastDateOfMonth = lastDay.getDate();
  const lastDateOfPrevMonth = prevLastDay.getDate();

  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = lastDateOfPrevMonth - i;
    days.push({
      day,
      date: new Date(year, month - 1, day),
      isOtherMonth: true,
      isToday: false,
      isSelected: false,
      isInRange: false,
      isRangeStart: false,
      isRangeEnd: false,
    });
  }

  // Current month days
  for (let day = 1; day <= lastDateOfMonth; day++) {
    const date = new Date(year, month, day);
    const isToday = date.getTime() === today.getTime();
    const { isSelected, isInRange, isRangeStart, isRangeEnd } = getDateStatus(date);

    days.push({
      day,
      date,
      isOtherMonth: false,
      isToday,
      isSelected,
      isInRange,
      isRangeStart,
      isRangeEnd,
    });
  }

  // Next month days to fill grid
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      day,
      date: new Date(year, month + 1, day),
      isOtherMonth: true,
      isToday: false,
      isSelected: false,
      isInRange: false,
      isRangeStart: false,
      isRangeEnd: false,
    });
  }

  return days;
});

// ==================== COMPUTED - FORMATTING ====================
const formattedStartDate = computed(() => {
  const date = tempStartDate.value || selectedStartDate.value;
  if (!date) return '';
  return date.toLocaleDateString(localeCode.value, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
});

const formattedEndDate = computed(() => {
  const date = tempEndDate.value || selectedEndDate.value;
  if (!date) return '';
  return date.toLocaleDateString(localeCode.value, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
});

const displayText = computed(() => {
  if (!selectedStartDate.value) return '';

  const format = props.content?.timeFormat || '12h';

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    if (format === '12h') {
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'pm' : 'am';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour}:${minutes} ${period}`;
    }
    return timeStr;
  };

  // Always show both start and end time
  const startTimeFormatted = formatTime(startTime.value);
  const endTimeFormatted = formatTime(endTime.value);
  const fromText = props.content?.labelFromText || 'from';

  if (isRangeMode.value && selectedEndDate.value) {
    const startDate = formatDate(selectedStartDate.value);
    const endDate = selectedEndDate.value.getMonth() === selectedStartDate.value.getMonth()
      ? selectedEndDate.value.getDate()
      : formatDate(selectedEndDate.value);

    return `${startDate} - ${endDate}, ${fromText} ${startTimeFormatted} - ${endTimeFormatted}`;
  } else {
    // Single mode: show single date with time range
    const dateStr = formatDate(selectedStartDate.value);
    return `${dateStr}, ${fromText} ${startTimeFormatted} - ${endTimeFormatted}`;
  }
});

const summaryText = computed(() => {
  if (!tempStartDate.value) return '';

  const format = props.content?.timeFormat || '12h';

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    if (format === '12h') {
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'pm' : 'am';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour}:${minutes} ${period}`;
    }
    return timeStr;
  };

  // Always show both start and end time
  const startTimeFormatted = formatTime(tempStartTime.value);
  const endTimeFormatted = formatTime(tempEndTime.value);
  const fromText = props.content?.labelFromText || 'from';

  if (isRangeMode.value && tempEndDate.value) {
    const startDate = formatDate(tempStartDate.value);
    const endDate = tempEndDate.value.getMonth() === tempStartDate.value.getMonth()
      ? tempEndDate.value.getDate()
      : formatDate(tempEndDate.value);

    return `${startDate} - ${endDate}, ${fromText} ${startTimeFormatted} - ${endTimeFormatted}`;
  } else {
    // Single mode: show single date with time range
    const dateStr = formatDate(tempStartDate.value);
    return `${dateStr}, ${fromText} ${startTimeFormatted} - ${endTimeFormatted}`;
  }
});

// ==================== COMPUTED - VALIDATION ====================
const canShowTimeInputs = computed(() => {
  if (isRangeMode.value) {
    // Range mode: both start and end dates must be selected
    return !!(tempStartDate.value && tempEndDate.value);
  } else {
    // Single mode: only start date needs to be selected
    return !!tempStartDate.value;
  }
});

const canSchedule = computed(() => {
  if (!tempStartTime.value || !tempEndTime.value) return false;
  if (!tempStartDate.value) return false;
  if (isRangeMode.value && !tempEndDate.value) return false;
  return true;
});

// ==================== COMPUTED - STYLES (MANDATORY REACTIVITY) ====================
const inputStyle = computed(() => ({
  width: props.content?.inputWidth || '100%',
  height: props.content?.inputHeight || '48px',
  backgroundColor: props.content?.inputBackgroundColor || '#ffffff',
  borderColor: props.content?.inputBorderColor || '#d1d5db',
  borderWidth: props.content?.inputBorderWidth || '1px',
  borderRadius: props.content?.inputBorderRadius || '8px',
  padding: props.content?.inputPadding || '12px 16px',
  fontSize: props.content?.inputFontSize || '14px',
  fontWeight: props.content?.inputFontWeight || 400,
  color: props.content?.inputTextColor || '#1f2937',
  boxShadow: props.content?.inputBoxShadow || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  gap: props.content?.inputGap || '12px',
  '--placeholder-color': props.content?.inputPlaceholderColor || '#9ca3af',
  '--hover-border-color': props.content?.inputHoverBorderColor || '#4f46e5',
  '--focus-border-color': props.content?.inputFocusBorderColor || '#4f46e5',
  '--focus-box-shadow': props.content?.inputFocusBoxShadow || '0 0 0 3px rgba(79, 70, 229, 0.1)',
}));

const iconStyle = computed(() => ({
  color: props.content?.inputIconColor || '#6b7280',
  width: props.content?.inputIconSize || '20px',
  height: props.content?.inputIconSize || '20px',
}));

const dropdownStyle = computed(() => ({
  backgroundColor: props.content?.dropdownBackgroundColor || '#ffffff',
  borderColor: props.content?.dropdownBorderColor || '#e5e7eb',
  borderWidth: props.content?.dropdownBorderWidth || '1px',
  borderRadius: props.content?.dropdownBorderRadius || '12px',
  boxShadow: props.content?.dropdownBoxShadow || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  padding: props.content?.dropdownPadding || '24px',
  minWidth: props.content?.dropdownMinWidth || '400px',
  width: props.content?.dropdownWidth || 'auto',
  maxWidth: props.content?.dropdownMaxWidth || '600px',
}));

const calendarHeaderStyle = computed(() => ({
  color: props.content?.calendarHeaderColor || '#6b7280',
}));

const weekdayStyle = computed(() => ({
  color: props.content?.calendarHeaderColor || '#6b7280',
}));

const navButtonStyle = computed(() => ({
  color: props.content?.calendarTextColor || '#1f2937',
}));

const labelStyle = computed(() => ({
  color: props.content?.calendarTextColor || '#1f2937',
}));

const fieldStyle = computed(() => ({
  borderColor: props.content?.timePickerInputBorderColor || '#d1d5db',
  borderRadius: props.content?.inputBorderRadius || '8px',
  fontSize: props.content?.inputFontSize || '14px',
  backgroundColor: props.content?.timePickerInputBgColor || '#ffffff',
  color: props.content?.timePickerInputTextColor || '#1f2937',
  '--icon-color': props.content?.timePickerInputIconColor || '#6b7280',
  '--hover-border-color': props.content?.inputHoverBorderColor || '#4f46e5',
  '--focus-border-color': props.content?.inputFocusBorderColor || '#4f46e5',
  '--focus-box-shadow': props.content?.inputFocusBoxShadow || '0 0 0 3px rgba(79, 70, 229, 0.1)',
}));

const dateTextStyle = computed(() => ({
  color: props.content?.dateTextColor || '#1f2937',
  backgroundColor: props.content?.dateTextBgColor || '#ffffff',
  borderColor: props.content?.dateTextBorderColor || '#d1d5db',
  borderRadius: props.content?.dateTextBorderRadius || '6px',
  fontSize: props.content?.inputFontSize || '14px',
}));

const summaryStyle = computed(() => ({
  color: props.content?.calendarTextColor || '#1f2937',
  fontSize: props.content?.inputFontSize || '14px',
}));

const primaryButtonStyle = computed(() => ({
  backgroundColor: props.content?.buttonPrimaryBgColor || '#4f46e5',
  color: props.content?.buttonPrimaryTextColor || '#ffffff',
  borderRadius: props.content?.buttonBorderRadius || '8px',
  height: props.content?.buttonHeight || '40px',
  fontSize: props.content?.buttonFontSize || '14px',
  fontWeight: props.content?.buttonFontWeight || 500,
}));

const secondaryButtonStyle = computed(() => ({
  backgroundColor: props.content?.buttonSecondaryBgColor || 'transparent',
  color: props.content?.buttonSecondaryTextColor || '#6b7280',
  borderRadius: props.content?.buttonBorderRadius || '8px',
  height: props.content?.buttonHeight || '40px',
  fontSize: props.content?.buttonFontSize || '14px',
  fontWeight: props.content?.buttonFontWeight || 500,
  borderColor: props.content?.buttonSecondaryBorderColor || '#d1d5db',
}));

// ==================== COMPUTED - SPINBOX STYLES (MANDATORY REACTIVITY) ====================
const spinboxWrapperStyle = computed(() => ({
  gap: props.content?.spinboxGap || '8px',
}));

const spinboxLabelStyle = computed(() => ({
  color: props.content?.spinboxLabelColor || '#6b7280',
  fontSize: props.content?.spinboxLabelFontSize || '12px',
}));

const spinboxValueStyle = computed(() => ({
  '--spinbox-bg-color': props.content?.spinboxBgColor || '#f3f4f6',
  '--spinbox-border-color': props.content?.spinboxBorderColor || '#d1d5db',
  '--spinbox-border-radius': props.content?.spinboxBorderRadius || '8px',
  '--spinbox-text-color': props.content?.spinboxTextColor || '#1f2937',
  '--spinbox-value-font-size': props.content?.spinboxValueFontSize || '16px',
  '--spinbox-value-font-weight': props.content?.spinboxValueFontWeight || 600,
}));

const spinboxButtonStyle = computed(() => ({
  '--spinbox-icon-color': props.content?.spinboxIconColor || '#6b7280',
}));

const timeContainerStyle = computed(() => ({
  '--time-container-bg': props.content?.spinboxBgColor || '#f9fafb',
  '--time-container-border': props.content?.spinboxBorderColor || '#e5e7eb',
  '--time-container-radius': props.content?.spinboxBorderRadius || '8px',
  gap: props.content?.spinboxGap || '8px',
}));

const timeColumnScrollStyle = computed(() => ({
  backgroundColor: props.content?.spinboxBgColor || '#ffffff',
  borderColor: props.content?.spinboxBorderColor || '#e5e7eb',
  borderRadius: props.content?.spinboxBorderRadius || '8px',
}));

const timePickerConfirmButtonStyle = computed(() => ({
  backgroundColor: props.content?.buttonPrimaryBgColor || '#4f46e5',
  color: props.content?.buttonPrimaryTextColor || '#ffffff',
  borderRadius: props.content?.buttonBorderRadius || '6px',
}));

const timePickerCloseButtonStyle = computed(() => ({
  backgroundColor: props.content?.buttonSecondaryBgColor || 'transparent',
  color: props.content?.buttonSecondaryTextColor || '#6b7280',
  borderColor: props.content?.buttonSecondaryBorderColor || '#d1d5db',
  borderRadius: props.content?.buttonBorderRadius || '6px',
}));

const timePickerDropdownStyle = computed(() => {
  // Use the same padding as dropdown to align properly
  const dropdownPadding = props.content?.dropdownPadding || '24px';
  
  return {
    left: dropdownPadding,
    right: dropdownPadding,
    width: `calc(100% - ${dropdownPadding} - ${dropdownPadding})`,
    minWidth: `calc(100% - ${dropdownPadding} - ${dropdownPadding})`,
  };
});

const getTimeOptionStyle = (isSelected, isDisabled = false) => {
  if (isDisabled) {
    return {
      color: props.content?.timePickerDisabledColor || '#d1d5db',
      cursor: 'not-allowed',
      opacity: 0.5,
      fontSize: props.content?.spinboxValueFontSize || '14px',
    };
  }
  if (isSelected) {
    return {
      backgroundColor: props.content?.calendarPrimaryColor || '#4f46e5',
      color: '#ffffff',
      fontWeight: props.content?.spinboxValueFontWeight || 600,
    };
  }
  return {
    color: props.content?.spinboxTextColor || '#1f2937',
    fontSize: props.content?.spinboxValueFontSize || '14px',
  };
};

// Check if end time is disabled (before or equal to start time) - ONLY ON SAME DAY
const isEndTimeDisabled = (hour, minute) => {
  if (!isRangeMode.value) return false;
  
  const startTimeValue = tempStartTime.value || startTime.value;
  if (!startTimeValue) return false;
  
  // Get the selected dates
  const startDate = tempStartDate.value || selectedStartDate.value;
  const endDate = tempEndDate.value || selectedEndDate.value;
  
  // If no dates selected, no restrictions
  if (!startDate || !endDate) return false;
  
  // Only restrict times if both dates are on the same day
  const isSameDay = 
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate();
  
  if (!isSameDay) {
    // Different days - all times are available
    return false;
  }
  
  // Same day - end time must be after start time
  const [startHour, startMinute] = startTimeValue.split(':').map(Number);
  const startTimeInMinutes = startHour * 60 + startMinute;
  const checkTimeInMinutes = parseInt(hour) * 60 + parseInt(minute);
  
  return checkTimeInMinutes <= startTimeInMinutes;
};

// ==================== METHODS ====================
const getDateStatus = (date) => {
  const tempStart = tempStartDate.value;
  const tempEnd = tempEndDate.value;

  if (!tempStart) {
    return {
      isSelected: false,
      isInRange: false,
      isRangeStart: false,
      isRangeEnd: false,
    };
  }

  const dateTime = date.getTime();
  const startTime = tempStart.getTime();
  const endTime = tempEnd?.getTime();

  const isRangeStart = dateTime === startTime;
  const isRangeEnd = endTime ? dateTime === endTime : false;
  const isInRange =
    isRangeMode.value && endTime
      ? dateTime > startTime && dateTime < endTime
      : false;
  const isSelected = isRangeStart || isRangeEnd;

  return { isSelected, isInRange, isRangeStart, isRangeEnd };
};

const getDayStyle = (day) => {
  const baseStyle = {
    color: props.content?.calendarTextColor || '#1f2937',
  };

  if (day.isOtherMonth) {
    return {
      ...baseStyle,
      color: props.content?.calendarDisabledColor || '#d1d5db',
    };
  }

  if (day.isSelected) {
    return {
      ...baseStyle,
      backgroundColor: props.content?.calendarPrimaryColor || '#4f46e5',
      color: '#ffffff',
    };
  }

  if (day.isInRange) {
    return {
      ...baseStyle,
      backgroundColor: props.content?.calendarRangeColor || '#e0e7ff',
    };
  }

  return baseStyle;
};

const selectDate = (day) => {
  if (day.isOtherMonth) return;

  if (!isRangeMode.value) {
    // Single mode
    tempStartDate.value = new Date(day.date);
    tempEndDate.value = null;
  } else {
    // Range mode
    if (!tempStartDate.value || (tempStartDate.value && tempEndDate.value)) {
      // Start new selection
      tempStartDate.value = new Date(day.date);
      tempEndDate.value = null;
    } else {
      // Complete selection
      if (day.date >= tempStartDate.value) {
        tempEndDate.value = new Date(day.date);
      } else {
        // If selected date is before start, swap them
        tempEndDate.value = new Date(tempStartDate.value);
        tempStartDate.value = new Date(day.date);
      }
    }
  }
};

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

const handleTimeChange = (type) => {
  if (type === 'start') {
    tempStartTime.value = startTime.value;
    
    // Validate end time is after start time
    if (isRangeMode.value) {
      const startIndex = timeOptions.value.findIndex(t => t.value === startTime.value);
      const endIndex = timeOptions.value.findIndex(t => t.value === endTime.value);
      
      if (endIndex <= startIndex) {
        // Set end time to next available slot
        const nextIndex = startIndex + 1;
        if (nextIndex < timeOptions.value.length) {
          endTime.value = timeOptions.value[nextIndex].value;
          tempEndTime.value = endTime.value;
        }
      }
    }
  } else {
    tempEndTime.value = endTime.value;
  }
};

// ==================== SPINBOX TIME CHANGE METHOD ====================
const changeTime = (type, unit, direction) => {
  const timeRef = type === 'start' ? tempStartTime : tempEndTime;
  const mainTimeRef = type === 'start' ? startTime : endTime;
  let [hours, minutes] = (timeRef.value || mainTimeRef.value).split(':').map(Number);
  const step = props.content?.timeStep || 15;

  if (unit === 'hour') {
    hours = (hours + direction + 24) % 24;
  } else {
    minutes = minutes + direction * step;
    if (minutes >= 60) {
      minutes -= 60;
      hours = (hours + 1) % 24;
    } else if (minutes < 0) {
      minutes += 60;
      hours = (hours - 1 + 24) % 24;
    }
  }

  const newTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  
  // Check validation only for End Time in Range Mode
  if (type === 'end' && isRangeMode.value) {
    const startTimeValue = tempStartTime.value || startTime.value;
    const startTimeInMinutes = parseInt(startTimeValue.split(':')[0]) * 60 + parseInt(startTimeValue.split(':')[1]);
    const newTimeInMinutes = hours * 60 + minutes;

    // Prevent setting End Time before Start Time
    if (newTimeInMinutes <= startTimeInMinutes) {
      // Find the next available slot after start time
      const startIndex = timeOptions.value.findIndex(t => t.value === startTimeValue);
      const nextTime = timeOptions.value[startIndex + 1]?.value;
      if (nextTime) {
        timeRef.value = nextTime;
        mainTimeRef.value = nextTime;
      }
      return;
    }
  }
  
  // Update both temp and main refs
  timeRef.value = newTime;
  mainTimeRef.value = newTime;
  
  // Trigger change validation
  handleTimeChange(type);
};

// ==================== TIME PICKER DROPDOWN METHODS ====================
const formatTimeDisplay = (timeStr) => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  const format = props.content?.timeFormat || '12h';
  
  if (format === '12h') {
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  }
  return timeStr;
};

const toggleStartTimePicker = () => {
  isStartTimePickerOpen.value = !isStartTimePickerOpen.value;
  if (isStartTimePickerOpen.value) {
    isEndTimePickerOpen.value = false;
    // Reset selection tracking when opening
    startTimeHourSelected.value = false;
    startTimeMinuteSelected.value = false;
  }
};

const toggleEndTimePicker = () => {
  isEndTimePickerOpen.value = !isEndTimePickerOpen.value;
  if (isEndTimePickerOpen.value) {
    isStartTimePickerOpen.value = false;
    // Reset selection tracking when opening
    endTimeHourSelected.value = false;
    endTimeMinuteSelected.value = false;
  }
};

const closeStartTimePicker = () => {
  isStartTimePickerOpen.value = false;
  startTimeHourSelected.value = false;
  startTimeMinuteSelected.value = false;
};

const closeEndTimePicker = () => {
  isEndTimePickerOpen.value = false;
  endTimeHourSelected.value = false;
  endTimeMinuteSelected.value = false;
};

const confirmStartTimePicker = () => {
  // Force close regardless of selection state
  isStartTimePickerOpen.value = false;
  startTimeHourSelected.value = false;
  startTimeMinuteSelected.value = false;
};

const confirmEndTimePicker = () => {
  // Force close regardless of selection state
  isEndTimePickerOpen.value = false;
  endTimeHourSelected.value = false;
  endTimeMinuteSelected.value = false;
};

const selectStartTime = (hour, minute) => {
  const currentHour = tempStartTime.value?.split(':')[0] || startTime.value.split(':')[0];
  const currentMinute = tempStartTime.value?.split(':')[1] || startTime.value.split(':')[1];
  
  // Track what was selected
  if (hour !== currentHour) {
    startTimeHourSelected.value = true;
  }
  if (minute !== currentMinute) {
    startTimeMinuteSelected.value = true;
  }
  
  const newTime = `${hour}:${minute}`;
  tempStartTime.value = newTime;
  startTime.value = newTime;
  
  // Validate end time is after start time (only on same day)
  if (isRangeMode.value) {
    const startDate = tempStartDate.value || selectedStartDate.value;
    const endDate = tempEndDate.value || selectedEndDate.value;
    
    // Only validate if same day
    if (startDate && endDate) {
      const isSameDay = 
        startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate();
      
      if (isSameDay) {
        const startTimeInMinutes = parseInt(hour) * 60 + parseInt(minute);
        const [endHour, endMinute] = (tempEndTime.value || endTime.value).split(':').map(Number);
        const endTimeInMinutes = endHour * 60 + endMinute;
        
        if (endTimeInMinutes <= startTimeInMinutes) {
          // Set end time to next available slot
          const startIndex = timeOptions.value.findIndex(t => t.value === newTime);
          const nextTime = timeOptions.value[startIndex + 1]?.value;
          if (nextTime) {
            endTime.value = nextTime;
            tempEndTime.value = nextTime;
          }
        }
      }
    }
  }
  
  handleTimeChange('start');
  
  // Close time picker only if BOTH hour and minute were selected
  if (startTimeHourSelected.value && startTimeMinuteSelected.value) {
    isStartTimePickerOpen.value = false;
    // Reset tracking
    startTimeHourSelected.value = false;
    startTimeMinuteSelected.value = false;
  }
};

const selectEndTime = (hour, minute) => {
  const currentHour = tempEndTime.value?.split(':')[0] || endTime.value.split(':')[0];
  const currentMinute = tempEndTime.value?.split(':')[1] || endTime.value.split(':')[1];
  
  // Track what was selected
  if (hour !== currentHour) {
    endTimeHourSelected.value = true;
  }
  if (minute !== currentMinute) {
    endTimeMinuteSelected.value = true;
  }
  
  const newTime = `${hour}:${minute}`;
  
  // Validate end time is after start time in Range Mode (only on same day)
  if (isRangeMode.value) {
    const startDate = tempStartDate.value || selectedStartDate.value;
    const endDate = tempEndDate.value || selectedEndDate.value;
    
    // Only validate if same day
    if (startDate && endDate) {
      const isSameDay = 
        startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate();
      
      if (isSameDay) {
        const startTimeValue = tempStartTime.value || startTime.value;
        const [startHour, startMinute] = startTimeValue.split(':').map(Number);
        const startTimeInMinutes = startHour * 60 + startMinute;
        const newTimeInMinutes = parseInt(hour) * 60 + parseInt(minute);
        
        if (newTimeInMinutes <= startTimeInMinutes) {
          // Don't allow selecting time before or equal to start time on same day
          return;
        }
      }
    }
  }
  
  tempEndTime.value = newTime;
  endTime.value = newTime;
  handleTimeChange('end');
  
  // Close time picker only if BOTH hour and minute were selected
  if (endTimeHourSelected.value && endTimeMinuteSelected.value) {
    isEndTimePickerOpen.value = false;
    // Reset tracking
    endTimeHourSelected.value = false;
    endTimeMinuteSelected.value = false;
  }
};

const toggleDropdown = () => {
  if (isDropdownOpen.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
};

const openDropdown = async () => {
  isDropdownOpen.value = true;
  
  // Initialize temp values with current selection
  tempStartDate.value = selectedStartDate.value;
  tempEndDate.value = selectedEndDate.value;
  tempStartTime.value = startTime.value;
  tempEndTime.value = endTime.value;

  emit('trigger-event', { name: 'open', event: {} });
};

const closeDropdown = async () => {
  isDropdownOpen.value = false;
  emit('trigger-event', { name: 'close', event: {} });
};

const handleCancel = () => {
  // Reset temp values
  tempStartDate.value = selectedStartDate.value;
  tempEndDate.value = selectedEndDate.value;
  tempStartTime.value = startTime.value;
  tempEndTime.value = endTime.value;
  
  closeDropdown();
};

const handleSchedule = () => {
  // Apply temp values to actual selection
  selectedStartDate.value = tempStartDate.value;
  selectedEndDate.value = tempEndDate.value;
  startTime.value = tempStartTime.value;
  endTime.value = tempEndTime.value;

  // Create ISO strings
  const startDateTime = createDateTime(selectedStartDate.value, startTime.value);
  const endDateTime = isRangeMode.value
    ? createDateTime(selectedEndDate.value || selectedStartDate.value, endTime.value)
    : createDateTime(selectedStartDate.value, endTime.value);

  const value = {
    startDate: startDateTime.toISOString(),
    endDate: endDateTime.toISOString(),
  };

  // Update internal variable
  setInternalValue(value);

  // Emit events
  emit('trigger-event', {
    name: 'select',
    event: value,
  });

  emit('trigger-event', {
    name: 'change',
    event: value,
  });

  closeDropdown();
};

const createDateTime = (date, timeStr) => {
  if (!date || !timeStr) return new Date();
  
  const [hours, minutes] = timeStr.split(':').map(Number);
  const dateTime = new Date(date);
  dateTime.setHours(hours, minutes, 0, 0);
  return dateTime;
};

const clearValue = async () => {
  selectedStartDate.value = null;
  selectedEndDate.value = null;
  tempStartDate.value = null;
  tempEndDate.value = null;
  startTime.value = '09:00';
  endTime.value = '10:00';
  tempStartTime.value = '09:00';
  tempEndTime.value = '10:00';

  setInternalValue({ startDate: null, endDate: null });

  emit('trigger-event', {
    name: 'clear',
    event: {},
  });
};

// ==================== ACTIONS (MANDATORY) ====================
defineExpose({
  clearValue,
  openDropdown,
  closeDropdown,
});

// ==================== WATCHERS (MANDATORY COMPLETE REACTIVITY) ====================

// Watch for initial values changes
watch(
  () => props.content?.initialStartDate,
  (newValue) => {
    if (newValue) {
      try {
        const date = new Date(newValue);
        if (!isNaN(date.getTime())) {
          selectedStartDate.value = date;
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          startTime.value = `${hours}:${minutes}`;
        }
      } catch (error) {
        console.error('Invalid initialStartDate:', error);
      }
    }
  },
  { immediate: true }
);

watch(
  () => props.content?.initialEndDate,
  (newValue) => {
    if (newValue && isRangeMode.value) {
      try {
        const date = new Date(newValue);
        if (!isNaN(date.getTime())) {
          selectedEndDate.value = date;
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          endTime.value = `${hours}:${minutes}`;
        }
      } catch (error) {
        console.error('Invalid initialEndDate:', error);
      }
    }
  },
  { immediate: true }
);

// Watch ALL properties for complete reactivity (MANDATORY)
watch(
  () => [
    props.content?.pickerMode,
    props.content?.locale,
    props.content?.timeFormat,
    props.content?.timeStep,
    props.content?.labelStartDate,
    props.content?.labelEndDate,
    props.content?.labelScheduleButton,
    props.content?.labelCancelButton,
    props.content?.labelFromText,
    props.content?.labelTimePickerConfirm,
    props.content?.labelTimePickerClose,
    props.content?.placeholder,
    props.content?.labelHours,
    props.content?.labelMinutes,
    // All style properties
    props.content?.inputWidth,
    props.content?.inputHeight,
    props.content?.inputBackgroundColor,
    props.content?.inputBorderColor,
    props.content?.inputBorderWidth,
    props.content?.inputBorderRadius,
    props.content?.inputPadding,
    props.content?.inputFontSize,
    props.content?.inputFontWeight,
    props.content?.inputTextColor,
    props.content?.inputPlaceholderColor,
    props.content?.inputBoxShadow,
    props.content?.inputIconColor,
    props.content?.inputIconSize,
    props.content?.inputGap,
    props.content?.inputHoverBorderColor,
    props.content?.inputFocusBorderColor,
    props.content?.inputFocusBoxShadow,
    props.content?.dateTextColor,
    props.content?.dateTextBgColor,
    props.content?.dateTextBorderColor,
    props.content?.dateTextBorderRadius,
    // TIME PICKER properties (CRITICAL: Must watch for reactivity)
    props.content?.spinboxGap,
    props.content?.spinboxLabelColor,
    props.content?.spinboxLabelFontSize,
    props.content?.spinboxBgColor,
    props.content?.spinboxBorderColor,
    props.content?.spinboxBorderRadius,
    props.content?.spinboxTextColor,
    props.content?.spinboxValueFontSize,
    props.content?.spinboxValueFontWeight,
    props.content?.spinboxIconColor,
    props.content?.timePickerDisabledColor,
    props.content?.timePickerInputBgColor,
    props.content?.timePickerInputBorderColor,
    props.content?.timePickerInputTextColor,
    props.content?.timePickerInputIconColor,
    props.content?.labelHours,
    props.content?.labelMinutes,
    props.content?.dropdownBackgroundColor,
    props.content?.dropdownBorderColor,
    props.content?.dropdownBorderWidth,
    props.content?.dropdownBorderRadius,
    props.content?.dropdownBoxShadow,
    props.content?.dropdownPadding,
    props.content?.dropdownMinWidth,
    props.content?.dropdownWidth,
    props.content?.dropdownMaxWidth,
    props.content?.calendarPrimaryColor,
    props.content?.calendarRangeColor,
    props.content?.calendarTextColor,
    props.content?.calendarHeaderColor,
    props.content?.calendarHoverColor,
    props.content?.calendarDisabledColor,
    props.content?.buttonPrimaryBgColor,
    props.content?.buttonPrimaryTextColor,
    props.content?.buttonSecondaryBgColor,
    props.content?.buttonSecondaryTextColor,
    props.content?.buttonSecondaryBorderColor,
    props.content?.buttonBorderRadius,
    props.content?.buttonHeight,
    props.content?.buttonFontSize,
    props.content?.buttonFontWeight,
  ],
  () => {
    // All reactivity handled by computed properties
    // This watcher ensures visual updates happen immediately
  },
  { deep: true }
);

// ==================== LIFECYCLE ====================
onMounted(() => {
  // Initialize with current date if no initial value
  if (!selectedStartDate.value) {
    const now = new Date();
    currentDate.value = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  // Handle clicks - dropdown only closes on Cancel/Schedule buttons or main input
  const handleClickOutside = (event) => {
    if (!dropdownRef.value) return;
    
    // Check if click is on main input (to toggle)
    const mainInput = event.target.closest('.datetime-input');
    if (mainInput) {
      // Let toggleDropdown handle this
      return;
    }
    
    // Check if click is on Cancel or Schedule buttons
    const isCancelButton = event.target.closest('.datetime-btn-secondary');
    const isScheduleButton = event.target.closest('.datetime-btn-primary');
    if (isCancelButton || isScheduleButton) {
      // Let button handlers handle this
      return;
    }
    
    // Check if click is inside dropdown - if yes, DON'T close main dropdown
    const pickerWrapper = dropdownRef.value.closest('.datetime-picker-wrapper');
    if (pickerWrapper && pickerWrapper.contains(event.target)) {
      // Click inside dropdown - don't close main dropdown
      
      // But close time pickers when clicking outside their specific areas
      if (startTimePickerRef.value && !startTimePickerRef.value.contains(event.target)) {
        const startButton = event.target.closest('.time-input-wrapper .time-input-button');
        if (!startButton || !startButton.parentElement?.contains(startTimePickerRef.value)) {
          isStartTimePickerOpen.value = false;
        }
      }
      
      if (endTimePickerRef.value && !endTimePickerRef.value.contains(event.target)) {
        const endButton = event.target.closest('.time-input-wrapper .time-input-button');
        if (!endButton || !endButton.parentElement?.contains(endTimePickerRef.value)) {
          isEndTimePickerOpen.value = false;
        }
      }
      
      return;
    }
    
    // Click outside entire component - close main dropdown
    closeDropdown();
  };

  document.addEventListener('click', handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});
</script>

<style lang="scss" scoped>
.datetime-picker-wrapper {
  display: inline-block;
  position: relative;
}

.datetime-input {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-style: solid;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    border-color: var(--hover-border-color) !important;
  }

  &:focus {
    border-color: var(--focus-border-color) !important;
    box-shadow: var(--focus-box-shadow) !important;
    outline: none;
  }
}

.input-icon {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.chevron-icon {
  margin-left: auto;
  
  &.is-open {
    transform: rotate(180deg);
  }
}

.input-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.is-placeholder {
    color: var(--placeholder-color);
  }
}

.datetime-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: white;
  border-style: solid;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 100%;
  max-width: max(100%, 450px);
  max-height: 600px;
  overflow: auto;
  animation: slideDown 0.2s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);

  // Mobile styles now handled in comprehensive mobile section below
}

.calendar-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.calendar-nav-btn {
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.calendar-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-weekday {
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  padding: 8px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:disabled):hover {
    background-color: var(--hover-color, #f3f4f6);
  }

  &.is-today {
    font-weight: 600;
    border: 2px solid currentColor;
  }

  &.is-other-month {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &.is-selected {
    font-weight: 600;
  }

  &.is-range-start {
    border-radius: 8px 0 0 8px;
  }

  &.is-range-end {
    border-radius: 0 8px 8px 0;
  }

  &.is-range-start.is-range-end {
    border-radius: 8px;
  }
}

.datetime-inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.datetime-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.datetime-label-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.datetime-label {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.datetime-input-row {
  display: flex;
  width: 100%;
  gap: 12px;
  
  // When time-input-wrapper has full-width class, it should take 100%
  .time-input-wrapper.full-width {
    width: 100%;
    flex: 1 1 100%;
  }
}

.datetime-text {
  padding: 6px 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: 500;
  border: 1px solid;
  border-style: solid;
  border-radius: 6px;
  white-space: nowrap;
}

.datetime-field {
  padding: 10px 12px;
  border: 1px solid;
  border-style: solid;
  font-size: 14px;
  background-color: white;
  border-radius: 6px;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: var(--primary-color, #4f46e5);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &.time-select {
    min-width: 120px;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 16px;
    padding-right: 32px;

    &:hover {
      border-color: var(--primary-color, #4f46e5);
    }

    &.full-width {
      grid-column: 1 / -1;
    }
  }
}

// ==================== TIME INPUT & PICKER DROPDOWN STYLES ====================
.time-input-wrapper {
  position: relative;
  display: flex;
  
  &.full-width {
    grid-column: 1 / -1;
  }
}

.time-input-button {
  width: 100%;
  min-width: 120px;
  padding: 10px 12px;
  border: 1px solid;
  border-style: solid;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s ease;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  &:hover {
    border-color: var(--hover-border-color) !important;
  }

  &:focus {
    border-color: var(--focus-border-color) !important;
    box-shadow: var(--focus-box-shadow) !important;
  }
  
  span {
    flex: 1;
    text-align: left;
  }
}

.time-input-chevron {
  flex-shrink: 0;
  color: var(--icon-color, #6b7280);
  transition: transform 0.2s ease;
  
  &.is-open {
    transform: rotate(180deg);
  }
}

.time-picker-dropdown {
  position: absolute;
  bottom: 24px;
  left: auto;
  right: auto;
  z-index: 10001;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 36px 12px 12px 12px;
  background-color: var(--time-container-bg, #ffffff);
  border: 1px solid var(--time-container-border, #e5e7eb);
  border-radius: var(--time-container-radius, 8px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  animation: timePickerFadeIn 0.2s ease;
}

@keyframes timePickerFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.time-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.time-column-label {
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
  text-transform: uppercase;
  text-align: center;
}

.time-column-scroll {
  width: 100%;
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid;
  border-radius: 6px;
  background-color: white;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
}

.time-option {
  width: 100%;
  padding: 8px 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s ease;
  font-size: 13px;
  
  &:hover:not(.is-selected):not(.is-disabled) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &.is-selected {
    font-weight: 600;
  }
  
  &.is-disabled {
    pointer-events: none;
  }
  
  &:first-child {
    border-radius: 6px 6px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 6px 6px;
  }
}

.time-column-separator {
  align-self: center;
  margin: 0 4px;
  margin-top: 28px; // Aligns with time options
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

// ==================== TIME PICKER ACTION BUTTONS ====================
.time-picker-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: flex-end;
  z-index: 10;
}

.time-picker-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: rgba(255, 255, 255, 0.9);
  opacity: 0.7;
  
  svg {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
  }
  
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

// ==================== SPINBOX STYLES ====================
.time-spinbox-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  grid-column: 2 / -1; // Ocupies the time picker column
  
  &.full-width {
    grid-column: 1 / -1;
  }
}

.spinbox-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 100px;
  flex-grow: 1;
}

.spinbox-label {
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.spinbox-value {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  border: 1px solid var(--spinbox-border-color, #d1d5db);
  background-color: var(--spinbox-bg-color, #f3f4f6);
  border-radius: var(--spinbox-border-radius, 8px);
  color: var(--spinbox-text-color, #1f2937);
  font-size: var(--spinbox-value-font-size, 16px);
  font-weight: var(--spinbox-value-font-weight, 600);
  transition: all 0.15s ease;
}

.spinbox-btn {
  position: absolute;
  left: 0;
  right: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  color: var(--spinbox-icon-color, #6b7280);
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.8;
  }

  svg {
    display: block;
    margin: 0 auto;
  }
}

.spinbox-btn-up {
  top: -16px; /* Positioned above the label */
}

.spinbox-btn-down {
  bottom: -16px; /* Positioned below the value */
}

.spinbox-separator {
  align-self: flex-end;
  margin-bottom: 24px; /* Aligns ':' with center of value field */
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

// Mobile styles now handled in comprehensive mobile section below

.datetime-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.datetime-btn {
  padding: 0 20px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s ease;
  flex: 1;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled,
  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

.datetime-btn-secondary {
  border: 1px solid;
  border-style: solid;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ==================== MOBILE OPTIMIZATIONS ====================
@media (max-width: 768px) {
  .datetime-picker-wrapper {
    width: 100%;
  }

  .datetime-input {
    font-size: 14px;
    padding: 12px 14px;
    touch-action: manipulation;
  }

  .datetime-dropdown {
    position: fixed;
    top: auto !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0;
    max-width: 100vw;
    max-height: 90vh;
    border-radius: 16px 16px 0 0;
    animation: slideUp 0.3s ease;
    padding: 16px;
    gap: 20px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .calendar-section {
    gap: 12px;
  }

  .calendar-header {
    padding: 8px 0;
  }

  .calendar-title {
    font-size: 18px;
  }

  .calendar-nav-btn {
    padding: 10px;
    min-width: 44px;
    min-height: 44px;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }

  .calendar-weekday {
    font-size: 11px;
    padding: 6px 2px;
  }

  .calendar-day {
    font-size: 15px;
    min-height: 44px;
    padding: 8px;
    
    &:not(:disabled) {
      min-width: 44px; // Better touch target
    }
  }

  .datetime-inputs {
    gap: 20px;
  }

  .datetime-input-group {
    gap: 10px;
  }

  .datetime-label-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .datetime-label {
    font-size: 15px;
    font-weight: 600;
  }

  .datetime-input-row {
    flex-direction: column;
    gap: 10px;
  }

  .datetime-text {
    padding: 10px 12px;
    font-size: 15px;
    width: auto;
  }

  .time-input-wrapper {
    width: 100%;
    
    &.full-width {
      grid-column: 1;
    }
  }

  .time-input-button {
    min-width: 100%;
    width: 100%;
    padding: 14px 16px;
    font-size: 15px;
    min-height: 48px;
    touch-action: manipulation;
  }

  .time-picker-dropdown {
    padding: 40px 12px 12px 12px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .time-column-label {
    font-size: 12px;
    padding: 8px 4px;
  }

  .time-column-scroll {
    max-height: 180px;
  }

  .time-option {
    padding: 12px 8px;
    font-size: 15px;
    min-height: 44px;
    touch-action: manipulation;
  }

  .time-column-separator {
    font-size: 20px;
    padding: 0 8px;
  }

  .time-picker-actions {
    top: 10px;
    right: 10px;
  }

  .time-picker-btn {
    width: 32px;
    height: 32px;
    touch-action: manipulation;
    
    svg {
      width: 16px;
      height: 16px;
    }
    
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .datetime-actions {
    flex-direction: row;
    gap: 12px;
    padding-top: 8px;
  }

  .datetime-btn {
    min-height: 48px;
    font-size: 16px;
    border-radius: 10px;
    touch-action: manipulation;
  }
}

// ==================== SMALL MOBILE (< 380px) ====================
@media (max-width: 380px) {
  .datetime-dropdown {
    padding: 12px;
    gap: 16px;
  }

  .calendar-day {
    font-size: 14px;
    min-height: 40px;
  }

  .calendar-weekday {
    font-size: 10px;
  }

  .time-picker-dropdown {
    left: 12px !important;
    right: 12px !important;
    width: calc(100% - 24px);
  }

  .datetime-btn {
    min-height: 44px;
    font-size: 15px;
  }
}

// Animation for mobile slide up
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
