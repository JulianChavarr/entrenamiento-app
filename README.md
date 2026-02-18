# 🏃 Registro de Entrenamientos

Aplicación web desarrollada con **Vue 3 + TypeScript + Firebase** que permite registrar, visualizar, editar y eliminar entrenamientos deportivos.

---

## 🚀 Funcionalidades

✅ Registrar entrenamientos  
✅ Visualizar historial  
✅ Editar registros  
✅ Eliminar registros  
✅ Sincronización en tiempo real con Firebase Firestore  
✅ Deploy en Firebase Hosting  

---

## 🎨 Diseño UI

- 🌙 Diseño oscuro moderno
- 🧩 Componentes desacoplados (Form, List, Card)
- ✨ Cards interactivas con efectos hover
- 📱 Layout responsive con CSS Grid
- 🎯 Variables CSS para consistencia visual

---

## 🧱 Arquitectura del Proyecto

El proyecto sigue una estructura modular basada en componentes y composables:

- `components/` → UI desacoplada (Form, List, Card)
- `composables/` → lógica reutilizable (`useEntrenamientos`)
- `services/` → conexión con Firebase
- `types/` → tipado fuerte con TypeScript

---

## 🛠️ Tecnologías

- Vue 3
- TypeScript
- Vite
- Firebase Firestore
- Firebase Hosting

---

## 📦 Instalación

Clonar repositorio:

```bash
git clone https://github.com/JulianChavarr/entrenamiento-app.git
cd entrenamiento-app
npm install

Ejecutar en desarrollo:

```bash
npm run dev