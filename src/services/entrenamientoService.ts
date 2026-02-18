import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from './firebase'
import type { EntrenamientoBase } from '@/types/entrenamiento'

const ref = collection(db, 'entrenamientos')

export function escucharEntrenamientos(callback: any) {
  const q = query(ref, orderBy('fecha', 'desc'))

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }))
    callback(data)
  })
}

export function crearEntrenamiento(data: EntrenamientoBase) {
  return addDoc(ref, {
    ...data,
    createdAt: Date.now()
  } as any)
}

export function actualizarEntrenamiento(id: string, data: EntrenamientoBase) {
  return updateDoc(doc(db, 'entrenamientos', id), data as any)
}

export function eliminarEntrenamiento(id: string) {
  return deleteDoc(doc(db, 'entrenamientos', id))
}