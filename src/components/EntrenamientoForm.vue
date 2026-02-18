<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { EntrenamientoBase, Entrenamiento } from '@/types/entrenamiento'

const props = defineProps<{
  modelValue: EntrenamientoBase
  editing?: Entrenamiento | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: EntrenamientoBase): void
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const form = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

// Validación simple (requisito: campos obligatorios)
const isValid = computed(() => {
  return (
    form.value.fecha.trim().length > 0 &&
    Number.isFinite(form.value.duracion) &&
    form.value.duracion > 0 &&
    Number.isFinite(form.value.distancia) &&
    form.value.distancia > 0
  )
})

function onSubmit() {
  if (!isValid.value) return
  emit('submit')
}
</script>

<template>
  <form class="card" @submit.prevent="onSubmit">
    <h2>{{ editing !== null ? 'Editar Entrenamiento' : 'Registrar Entrenamiento' }}</h2>

    <label>Fecha</label>
    <input type="date" v-model="form.fecha" required />

    <label>Duración (min)</label>
    <input type="number" min="1" v-model.number="form.duracion" required />

    <label>Distancia (km)</label>
    <input type="number" min="0.01" step="0.01" v-model.number="form.distancia" required />

    <div class="actions">
      <button type="submit" :disabled="!isValid">
        {{ editing ? 'Actualizar' : 'Guardar' }}
      </button>

      <button v-if="editing" type="button" class="secondary" @click="emit('cancel')">
        Cancelar
      </button>
    </div>

    <p v-if="!isValid" class="hint">Completa fecha, duración y distancia (valores &gt; 0).</p>
  </form>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f4f4f4;
  padding: 20px;
  border-radius: 12px;
  max-width: 420px;
}
.actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}
button {
  padding: 10px 14px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.secondary {
  background: #ddd;
}
.hint {
  font-size: 12px;
  opacity: 0.8;
}
</style>