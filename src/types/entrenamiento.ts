export interface EntrenamientoBase {
  fecha: string
  duracion: number
  distancia: number
}

export interface Entrenamiento extends EntrenamientoBase {
  id: string
  createdAt?: number
}