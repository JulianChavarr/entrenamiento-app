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

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 20px 80px;
}

h1 {
  text-align: center;
  margin: 0 0 34px;
  font-size: 34px;
  letter-spacing: 0.2px;
  color: #fff;
  font-weight: 900;
  text-shadow: 0 12px 35px rgba(0, 0, 0, 0.55);
}

.grid {
  display: grid;
  grid-template-columns: 420px minmax(420px, 520px);
  gap: 28px;
  align-items: start;
  justify-content: center; /* centra el bloque como la demo */
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
    justify-content: stretch;
  }
}
</style>