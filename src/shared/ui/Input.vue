<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  type?: string;
  placeholder?: string;
}>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

function onInput(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<template>
  <input
    :value="props.modelValue"
    @input="onInput"
    class="base-input"
    :type="props.type ?? 'text'"
    :placeholder="props.placeholder"
  />
</template>

<style scoped>
.base-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text);
}
.base-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(161, 139, 255, 0.25);
}
</style>
