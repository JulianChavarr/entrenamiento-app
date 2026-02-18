<script setup lang="ts">
import { ref } from 'vue'
import EntrenamientoForm from './components/EntrenamientoForm.vue'
import EntrenamientoList from './components/EntrenamientoList.vue'
import type { Entrenamiento, EntrenamientoBase } from '@/types/entrenamiento'
import { useEntrenamientos } from '@/composables/useEntrenamientos'

const form = ref<EntrenamientoBase>({
  fecha: '',
  duracion: 0,
  distancia: 0,
})

const editing = ref<Entrenamiento | null>(null)

const { entrenamientos, loading, save, remove } = useEntrenamientos()

function resetForm() {
  form.value = { fecha: '', duracion: 0, distancia: 0 }
  editing.value = null
}

async function handleSubmit() {
  await save(editing.value, form.value)
  resetForm()
}

function handleCancel() {
  resetForm()
}

function handleEdit(item: Entrenamiento) {
  editing.value = item
  form.value = {
    fecha: item.fecha,
    duracion: item.duracion,
    distancia: item.distancia,
  }
}

async function handleDelete(id: string) {
  const ok = confirm('¿Eliminar este entrenamiento?')
  if (!ok) return
  await remove(id)
  if (editing.value?.id === id) resetForm()
}
</script>

<template>
  <main class="container">
    <h1>Registro de Entrenamientos</h1>

    <section class="grid">
      <EntrenamientoForm v-model="form" :editing="editing" @submit="handleSubmit" @cancel="handleCancel" />

      <EntrenamientoList :items="entrenamientos" :loading="loading" @edit="handleEdit" @delete="handleDelete" />
    </section>
  </main>
</template>

<style>
.container {
  max-width: 980px;
  margin: 40px auto;
  font-family: system-ui, Arial, Helvetica, sans-serif;
  padding: 0 16px;
}
.grid {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 18px;
  align-items: start;
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>