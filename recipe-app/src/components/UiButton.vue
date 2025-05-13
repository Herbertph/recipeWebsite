<!-- src/components/UiButton.vue -->
<template>
    <button
      :aria-label="ariaLabel"
      :class="[
        'px-5 py-2 rounded text-white font-medium transition',
        variant === 'primary' ? 'bg-[#B46F57] hover:brightness-110' :
        variant === 'gray' ? 'bg-gray-500 hover:brightness-110' :
        'bg-blue-500 hover:brightness-110',
        'disabled:opacity-40'
      ]"
      :disabled="disabled"
      @click="$emit('click')"
    >
      <slot />
    </button>
  </template>
  
  <script setup>
  defineProps({
    variant: { type: String, default: 'primary' },
    disabled: Boolean,
    ariaLabel: String
  })
  defineEmits(['click'])
  </script>
  