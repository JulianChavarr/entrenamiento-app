import { onMounted, onUnmounted, ref } from 'vue'
import type { Entrenamiento, EntrenamientoBase } from '@/types/entrenamiento'
import {
  escucharEntrenamientos,
  crearEntrenamiento,
  actualizarEntrenamiento,
  eliminarEntrenamiento,
} from '@/services/entrenamientoService'

export function useEntrenamientos() {
  const entrenamientos = ref<Entrenamiento[]>([])
  const loading = ref(true)

  let unsubscribe: null | (() => void) = null

  onMounted(() => {
    unsubscribe = escucharEntrenamientos((data: any[]) => {
      entrenamientos.value = data as Entrenamiento[]
      loading.value = false
    })
  })

  onUnmounted(() => {
    if (unsubscribe) unsubscribe()
  })

  async function save(editing: Entrenamiento | null, data: EntrenamientoBase) {
    if (editing) {
      await actualizarEntrenamiento(editing.id, data)
    } else {
      await crearEntrenamiento(data)
    }
  }

  async function remove(id: string) {
    await eliminarEntrenamiento(id)
  }

  return { entrenamientos, loading, save, remove }
}