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
    <header class="head">
      <h2>Historial</h2>
      <span class="count" v-if="!props.loading">{{ props.items.length }}</span>
    </header>

    <div class="panel">
      <p class="state" v-if="props.loading">Cargando...</p>
      <p class="state" v-else-if="props.items.length === 0">Aún no hay entrenamientos registrados.</p>

      <div class="cards" v-else>
        <EntrenamientoCard
          v-for="it in props.items"
          :key="it.id"
          :item="it"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.head h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 900;
  color: #fff;
}

.count {
  min-width: 34px;
  height: 28px;
  padding: 0 10px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 800;
  font-size: 13px;
}

.panel {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 18px;
  padding: 14px;

  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
}

.state {
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>