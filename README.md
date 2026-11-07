# 🎮 GamesVote — Angular + Node.js

**GamesVote** es una aplicación web desarrollada con **Angular** en el frontend y **Node.js** en el backend que permite consultar un catálogo de videojuegos, puntuarlos del 1 al 10 y escribir reseñas con imágenes, que cada usuario reúne en su sección «Mis reseñas».

La aplicación utiliza la API de **IGDB** para obtener información sobre videojuegos y **MySQL** para almacenar los datos propios de la aplicación.

---

## 🚀 Demo en vivo

**https://vanerb.github.io/gamesvote-angular-node/**

La demo funciona sin servidor: el build `demo` (`ng build --configuration demo`) incluye un interceptor (`frontend/src/app/demo/`) que simula toda la API en el navegador con un catálogo de muestra y guarda los cambios en `localStorage`. Cuentas de prueba: `laura@gamesvote.demo`, `carlos@gamesvote.demo` y `marta@gamesvote.demo`, todas con la contraseña `demo1234`. El aviso de la demo tiene un botón para restablecer los datos.

Se despliega con GitHub Actions (`.github/workflows/deploy-demo.yml`) en cada push a `master` que toque `frontend/`.

---

## ✨ Funcionalidades

### 🎮 Catálogo de videojuegos

La aplicación permite consultar un catálogo de videojuegos utilizando información obtenida mediante la API de **IGDB**.

Los usuarios pueden consultar información sobre diferentes títulos y acceder a sus detalles.

### ⭐ Valoraciones y reseñas

Con una cuenta puedes puntuar cada juego del 1 al 10, escribir una reseña y añadirle imágenes. En la ficha del juego se ven las reseñas de todos los usuarios y puedes editar o borrar la tuya; «Mis reseñas» reúne todas las que has escrito. Solo quien escribe una reseña puede modificarla.

### 🔎 Búsqueda y filtrado

Puedes buscar por nombre, filtrar por plataforma y ordenar los resultados.

### 👤 Perfil

Cada usuario puede editar sus datos, su contraseña y su foto de perfil.

### 💾 Gestión de datos

La información propia de la aplicación se almacena en una base de datos **MySQL**, permitiendo conservar los datos de los usuarios, valoraciones y reseñas.

---

## 🛠️ Tecnologías utilizadas

### Frontend

* **Angular**
* **TypeScript**
* **HTML5**
* **CSS**
* **Tailwind CSS**

### Backend

* **Node.js**
* **JavaScript**
* **MySQL**
* **REST API**

### APIs y herramientas

* **IGDB API**
* **Git**
* **GitHub**
* **npm**

---

## 📂 Estructura del proyecto

```text
gamesvote-angular-node/
│
├── frontend/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── index.js
│   ├── server.js
│   ├── ...
│   └── package.json
│
└── README.md
```

---

## 🏗️ Arquitectura

El proyecto está dividido en dos partes principales:

```text
                 ┌───────────────────┐
                 │      Usuario      │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │      Angular     │
                 │     Frontend     │
                 └─────────┬─────────┘
                           │
                      HTTP / REST
                           │
                           ▼
                 ┌───────────────────┐
                 │      Node.js      │
                 │      Backend      │
                 └───────┬─────┬─────┘
                         │     │
                ┌────────┘     └─────────┐
                ▼                        ▼
        ┌──────────────┐         ┌──────────────┐
        │    MySQL     │         │   IGDB API   │
        │   Database   │         │ Video Games  │
        └──────────────┘         └──────────────┘
```

---

## 🌐 Integración con IGDB

GamesVote utiliza la **IGDB API (Internet Games Database)** para obtener información sobre videojuegos.

Esta integración permite consultar información sobre diferentes títulos sin tener que almacenar todo el catálogo de videojuegos en la base de datos propia.

La aplicación combina la información obtenida de IGDB con los datos gestionados por el backend, como las valoraciones y reseñas.

---

## 🗄️ Base de datos

El proyecto utiliza **MySQL** para almacenar la información propia de la aplicación.

Guarda tres tablas:

* **Users**: cuentas, con la contraseña cifrada con bcrypt. La API nunca devuelve la contraseña ni el token.
* **Valoration**: puntuación y reseña de cada usuario, enlazada al juego por su identificador de IGDB.
* **Images**: fotos de perfil e imágenes de las reseñas.

Los datos de los videojuegos (nombre, portada, plataformas...) no se guardan: se piden a la API de IGDB.

---

## 🛠️ Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

* **Node.js**
* **npm**
* **Angular CLI**
* **MySQL**
* **Git**

Para utilizar la integración con IGDB también es necesario disponer de las credenciales correspondientes de la API.

---

## 📥 Clonar el repositorio

```bash
git clone https://github.com/vanerb/gamesvote-angular-node.git
cd gamesvote-angular-node
```

---

# 🖥️ Instalación y ejecución

## 1️⃣ Backend — Node.js

Accede al directorio del backend:

```bash
cd backend
```

Instala las dependencias:

```bash
npm install
```

### 🗄️ Configurar MySQL

Crea una base de datos MySQL para el proyecto y configura los datos de conexión en el archivo correspondiente del backend.

Por ejemplo:

```text
Host: localhost
Puerto: 3306
Base de datos: TU_BASE_DE_DATOS
Usuario: TU_USUARIO
Contraseña: TU_CONTRASEÑA
```

Asegúrate también de configurar las credenciales necesarias para utilizar la API de IGDB. En [`backend/.env-sheet`](backend/.env-sheet) tienes la lista de variables, que van en `backend/.env`: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`, `PORT` e IGDB.

### 🧪 Datos de prueba (opcional)

[`database/gamesvote_prueba.sql`](database/gamesvote_prueba.sql) crea la base de datos, sus tablas y datos inventados. No borra nada: si las tablas ya existen, la importación se detiene con un error. Desde la raíz del repositorio:

```bash
mysql -u root -p --default-character-set=utf8mb4 -e "source database/gamesvote_prueba.sql"
```

Cuentas: `nuria@gamesvote.test`, `diego@gamesvote.test` y `elena@gamesvote.test`.

La contraseña de todas es `Usuario123*`. Es pública, así que no uses estas cuentas fuera de un entorno local. El SQL usa la base `gamesvote`, así que pon `DB_NAME=gamesvote`.

### 🔑 Clave de las sesiones

La API firma las sesiones con la variable de entorno `JWT_SECRET`. Sin ella usa una clave de desarrollo, válida solo en local: si despliegas el proyecto, define una propia y larga.

Una vez configurado todo, inicia el servidor:

```bash
node server.js
```

El backend estará disponible por defecto en:

```text
http://localhost:3000
```

---

## 2️⃣ Frontend — Angular

Abre otra terminal y accede al frontend:

```bash
cd frontend
```

Instala las dependencias:

```bash
npm install
```

Ejecuta la aplicación:

```bash
ng serve
```

El frontend estará disponible normalmente en:

```text
http://localhost:4200
```

Si el backend no está en `http://localhost:3000`, cambia `apiUrl` en [`frontend/src/environments/environment.ts`](frontend/src/environments/environment.ts).

---

## 🔄 Flujo de funcionamiento

```text
                         Usuario
                            │
                            ▼
                     ┌─────────────┐
                     │   Angular   │
                     │  Frontend   │
                     └──────┬──────┘
                            │
                         REST API
                            │
                            ▼
                     ┌─────────────┐
                     │   Node.js   │
                     │   Backend   │
                     └──────┬──────┘
                            │
                 ┌──────────┴──────────┐
                 ▼                     ▼
          ┌─────────────┐       ┌─────────────┐
          │    MySQL    │       │   IGDB API  │
          │  Datos app  │       │ Videojuegos │
          └─────────────┘       └─────────────┘
```

---

## 🎯 Objetivo del proyecto

El objetivo de **GamesVote** es desarrollar una aplicación web que permita **descubrir, consultar y valorar videojuegos**, combinando información procedente de una API externa con datos gestionados por la propia aplicación.

El proyecto permite poner en práctica diferentes conceptos de desarrollo web:

* Desarrollo de aplicaciones SPA con Angular.
* Creación de APIs REST con Node.js.
* Consumo e integración de APIs externas.
* Integración con IGDB.
* Persistencia de datos mediante MySQL.
* Gestión de usuarios.
* Búsqueda y filtrado de videojuegos.
* Sistema de valoraciones.
* Sistema de reseñas.
* Comunicación entre frontend y backend.

---

## 📌 Estado del proyecto

**En desarrollo.**

Actualmente el proyecto está planteado como una **aplicación web** desarrollada con Angular y Node.js.

Entre las posibles ampliaciones futuras se encuentran:

* 📊 Estadísticas personales.
* 🏆 Logros y objetivos.
* 📚 Historial de videojuegos jugados.
* 🎮 Seguimiento del estado de cada videojuego.
* 👥 Perfiles de usuario.
* 💬 Interacción entre usuarios.
* 📱 Adaptación futura a dispositivos móviles.

---

## 👩‍💻 Autora

**Vanesa Ribera Bautista**

Proyecto desarrollado utilizando **Angular + Node.js + MySQL + IGDB API**.
