<script setup lang="ts">
import type { Entrenamiento } from '@/types/entrenamiento'

const props = defineProps<{ item: Entrenamiento }>()
const emit = defineEmits<{
  (e: 'edit', value: Entrenamiento): void
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <article class="card">
    <div class="info">
      <div class="date">{{ props.item.fecha }}</div>
      <div class="meta">
        <span>⏱ {{ props.item.duracion }} min</span>
        <span>🏃 {{ props.item.distancia }} km</span>
      </div>
    </div>

    <div class="actions">
      <button class="icon" type="button" title="Editar" @click="emit('edit', props.item)">✏️</button>
      <button class="icon" type="button" title="Eliminar" @click="emit('delete', props.item.id)">🗑️</button>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.date {
  font-weight: 700;
}
.meta {
  display: flex;
  gap: 12px;
  font-size: 14px;
  opacity: 0.85;
}
.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.icon {
  border: 0;
  background: #f3f3f3;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
}
</style>