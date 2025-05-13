<template>
  <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
    class="px-4 py-3 border border-gray-300 rounded-lg" aria-label="Filter by cuisine">
    <option value="">All cuisines</option>
    <option v-for="c in cuisines" :key="c" :value="c">
      {{ c }}
    </option>
  </select>
</template>

<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const cuisines = [
  'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese',
  'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian',
  'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American',
  'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern',
  'Spanish', 'Thai', 'Vietnamese'
]
</script>