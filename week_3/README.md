# Plataforma de Freelancers

## 📌 Descripción General

La **Plataforma de Freelancers** es una aplicación web desarrollada con tecnologías frontend (HTML, CSS y JavaScript puro) cuyo objetivo es simular el funcionamiento básico de una plataforma de intermediación entre **clientes** y **freelancers**, permitiendo la gestión de proyectos, usuarios y estados operativos desde una interfaz clara e intuitiva.

Este proyecto está orientado a demostrar competencias en:
- Manipulación del DOM
- Organización modular del código
- Separación de responsabilidades (estructura, estilo y lógica)
- Persistencia de datos en el navegador
- Diseño de interfaces centradas en el usuario


## 🎯 Objetivos del Proyecto

### Objetivo General
Diseñar e implementar una plataforma web que permita administrar proyectos freelance y usuarios, simulando los procesos esenciales de contratación y seguimiento de proyectos.

### Objetivos Específicos
- Gestionar proyectos (creación, visualización y estado).
- Administrar usuarios (freelancers y clientes).
- Implementar interacción dinámica mediante JavaScript.
- Aplicar estilos responsivos y temáticos con CSS moderno.
- Integrar persistencia de datos utilizando `localStorage`.



## 🧠 Alcance del Sistema

El sistema cubre las siguientes funcionalidades:

- Registro y visualización de proyectos freelance.
- Clasificación de proyectos según su estado (disponible / en progreso).
- Gestión de usuarios dentro de la plataforma.
- Interfaz con navegación por pestañas.
- Cambio de tema visual (modo claro / oscuro).
- Visualización de estadísticas generales del sistema.

⚠️ **Nota:**  
El proyecto es una simulación académica y **no incluye procesamiento de pagos ni autenticación real**.



## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura frontend simple, basada en la separación de archivos:

```text
📁 proyecto/
│
├── index.html        # Estructura principal del sistema
├── styles.css        # Estilos globales y diseño visual
├── script.js         # Lógica de negocio e interacción DOM
└── README.md         # Documentación del proyecto