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
  gap: 12px;

  background: #ffffff;
  padding: 26px;
  border-radius: 16px;
  border: 1px solid #e9e9e9;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);

  max-width: 420px;
}

.card h2 {
  margin: 0 0 10px;
  font-size: 22px;
  font-weight: 800;
  color: #111;
}

label {
  font-weight: 700;
  font-size: 13px;
  color: #111;
  margin-top: 8px;
}

input {
  width: 100%;
  height: 44px;
  border-radius: 10px;
  border: 1px solid #d7d7d7;
  padding: 0 12px;

  background: #f5f5f5;
  color: #111;
  outline: none;
}

input:focus {
  border-color: #1877f2;
  box-shadow: 0 0 0 3px rgba(24, 119, 242, 0.18);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

button {
  height: 44px;
  border: 0;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
}

button[type='submit'] {
  background: #1877f2;
  color: #fff;
}

button.secondary {
  background: #d1d5db;
  color: #111;
}

button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.hint {
  margin: 6px 0 0;
  font-size: 12px;
  color: #444;
  opacity: 0.9;
}
</style>