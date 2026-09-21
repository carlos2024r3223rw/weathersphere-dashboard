# 🌤️ WeatherSphere Dashboard — Panel Meteorológico en Tiempo Real

> Dashboard interactivo para monitoreo del clima con geolocalización automática. Consume APIs externas en tiempo real para mostrar condiciones actuales y pronósticos con una interfaz limpia y responsiva.

[![Demo en vivo](https://img.shields.io/badge/Demo-Live-brightgreen?style=for-the-badge)](https://carlos2024r3223rw.github.io/weathersphere-dashboard/)
[![Stack](https://img.shields.io/badge/Stack-JavaScript%20%7C%20REST%20APIs-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)

---

## 🔴 El Problema

Se necesitaba demostrar integración profesional de APIs externas con una UI intuitiva, sin depender de librerías pesadas que inflen el bundle:

- ❌ La mayoría de dashboards similares usan React/Vue solo para leer una API
- ❌ Bundle sizes innecesariamente grandes para funcionalidad simple
- ❌ Interfaces genéricas sin atención al detalle en UX

## ✅ La Solución

Dashboard vanilla de alto rendimiento que integra múltiples fuentes de datos:

- 📍 **Geolocalización automática** — detecta tu ubicación al cargar
- 🔍 **Búsqueda por ciudad** — cualquier ubicación del mundo
- 🌡️ **Datos en tiempo real** — temperatura, humedad, viento, UV index
- 📅 **Pronóstico extendido** — condiciones para los próximos días
- ⚡ **< 50KB total** — sin dependencias pesadas

## 🧠 Reto Técnico Resuelto

El reto principal fue manejar las **llamadas asíncronas a múltiples endpoints** (geolocalización del browser + API de clima + API de pronóstico) de forma eficiente. Se usó `Promise.allSettled()` para hacer las llamadas en paralelo sin que el fallo de una endpoint bloquee el resto, con estados de carga y error granulares por sección del dashboard.

---

## 🛠️ Stack Tecnológico

| Área | Tecnología |
|---|---|
| Lenguaje | JavaScript ES2022+ (Async/Await, Promise.allSettled) |
| APIs | Open-Meteo, Nominatim Geocoding API |
| Geolocalización | Browser Geolocation API |
| Layout | CSS Grid + Flexbox |
| Deploy | GitHub Pages |

---

## 🚀 Instalación Local

```bash
git clone https://github.com/carlos2024r3223rw/weathersphere-dashboard.git
cd weathersphere-dashboard
# Abrir directamente — no requiere build
start index.html
```

> Las APIs usadas (Open-Meteo y Nominatim) son gratuitas y no requieren API key.

---

## 📁 Estructura del Proyecto

```
weathersphere-dashboard/
├── index.html             # Estructura y layout principal
├── css/
│   └── styles.css         # Diseño responsive y temas
├── js/
│   ├── api.js             # Capa de integración con APIs externas
│   ├── geolocation.js     # Manejo de Geolocation API
│   ├── render.js          # Funciones de renderizado del DOM
│   └── main.js            # Orquestación principal
└── assets/
    └── icons/             # Iconos meteorológicos SVG
```

---

## 👤 Autor

**Carlos Manuel Martínez Lima** — Full Stack Developer · Especialista SaaS & eCommerce

[![Portfolio](https://img.shields.io/badge/Portfolio-webcarlos--jet.vercel.app-blue?style=flat-square)](https://webcarlos-jet.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/carlos-manuel-martinez-lima-ba238a1a9/)
[![Email](https://img.shields.io/badge/Email-cm7887575%40gmail.com-red?style=flat-square&logo=gmail)](mailto:cm7887575@gmail.com)
