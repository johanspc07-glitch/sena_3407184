# 💼 Gestor de Freelancers – Plataformas Freelancers

## 📋 Información General
- **Nombre del aprendiz**: Johan Prato  
- **Fecha**: 15/02/2026  
- **Dominio Asignado**: Plataformas Freelancers  
- **Entidad Principal**: Freelancer  

---

## 🎯 Descripción del Proyecto

Esta aplicación web permite **gestionar freelancers registrados en una plataforma digital**, simulando el funcionamiento básico de una **plataforma de trabajo freelance**.

El sistema permite:

- Registrar freelancers con información relevante
- Clasificarlos por categoría profesional
- Asignar nivel/prioridad
- Marcar freelancers como disponibles o no disponibles
- Filtrar, buscar y gestionar la colección de freelancers
- Visualizar estadísticas generales de la plataforma

El proyecto fue desarrollado utilizando **JavaScript moderno (ES2023)** sin frameworks, aplicando programación funcional e inmutabilidad.

---

## 🧱 Modelo de Datos del Dominio

Cada freelancer se representa mediante el siguiente modelo:

```js
{
  id: Number,                 // Identificador único (Date.now())
  name: String,               // Nombre del freelancer
  description: String,        // Descripción o habilidades
  active: Boolean,            // Disponible para trabajar
  category: String,           // Tipo de freelancer (Frontend, Backend, etc.)
  priority: String,           // Nivel (low, medium, high)
  createdAt: String           // Fecha de creación
}
