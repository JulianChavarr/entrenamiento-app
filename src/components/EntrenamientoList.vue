<script setup lang="ts">
import type { Entrenamiento } from '@/types/entrenamiento'
import EntrenamientoCard from './EntrenamientoCard.vue'

const props = defineProps<{
  items: Entrenamiento[]
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'edit', value: Entrenamiento): void
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <section class="list">
    <h2>Historial</h2>

    <p v-if="props.loading">Cargando...</p>
    <p v-else-if="props.items.length === 0">Aún no hay entrenamientos registrados.</p>

    <div class="cards" v-else>
      <EntrenamientoCard
        v-for="it in props.items"
        :key="it.id"
        :item="it"
        @edit="emit('edit', $event)"
        @delete="emit('delete', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>