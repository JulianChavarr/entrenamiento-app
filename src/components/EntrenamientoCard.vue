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
  <span class="chip">⏱ {{ props.item.duracion }} min</span>
  <span class="chip">🏃 {{ props.item.distancia }} km</span>
</div>
    </div>

    <div class="actions">
  <button class="icon edit" type="button" title="Editar" @click="emit('edit', props.item)">✏️</button>
  <button class="icon danger" type="button" title="Eliminar" @click="emit('delete', props.item.id)">🗑️</button>
</div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;

  padding: 14px 16px;
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.55);

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);

  transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease;
}

.card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.75);
  box-shadow:
    0 18px 42px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.date {
  font-weight: 900;
  font-size: 16px;
  color: #0f172a;
  letter-spacing: 0.2px;
}

.meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  font-size: 13px;
  font-weight: 750;
  color: #334155;

  background: rgba(15, 23, 42, 0.05);
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 6px 10px;
  border-radius: 999px;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-shrink: 0;
}

.icon {
  height: 38px;
  width: 44px;
  border-radius: 12px;
  cursor: pointer;

  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(15, 23, 42, 0.04);

  transition: transform 140ms ease, filter 140ms ease, background 140ms ease, border-color 140ms ease;
}

.icon:hover {
  transform: translateY(-1px);
  filter: brightness(0.98);
  border-color: rgba(15, 23, 42, 0.14);
}

.icon:active {
  transform: translateY(0px);
}

.icon.edit {
  background: rgba(59, 130, 246, 0.10);
  border-color: rgba(59, 130, 246, 0.18);
}

.icon.danger {
  background: rgba(239, 68, 68, 0.10);
  border-color: rgba(239, 68, 68, 0.18);
}
</style>