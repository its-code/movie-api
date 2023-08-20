# 🎬 NestJS Movie API

A robust and scalable RESTful API built with NestJS for managing movies and genres. Perfect for movie enthusiasts and developers looking for a starting point in NestJS application development.

## 🚀 Technologies

- 🌐 **NestJS** - A progressive Node.js framework for building efficient and scalable server-side applications.
- 🍃 **Mongoose** - Elegant MongoDB object modeling for Node.js.
- 🔷 **TypeScript** - Superset of JavaScript that adds static typing.

## 🛠 Setup & Installation

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/its-code/movie-api.git

2. **Navigate into the directory**:

   ```bash
   cd movie-api

3. **Install the dependencies**:

   ```bash
   npm install

## 🛠 Prerequisites

### MongoDB Installation Using Docker

4. **Install Docker**: If you haven't installed Docker, you can download and install it from [Docker's official website](https://www.docker.com/products/docker-desktop).

5. **Run MongoDB in a Docker Container**:
   
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo

6. **Run the application**:

   ```bash
   npm start

🌍 The API will be available at [http://localhost:3000](http://localhost:3000).

## ✨ Features

- 📜 **Comprehensive CRUD** - Full CRUD operations for managing movies and genres.
- 🔍 **Search Functionality** - Search movies by title or genre.
- 📄 **Pagination** - Built-in pagination support for movie listings, ensuring scalability.

## 📌 API Endpoints

### 🎥 Movies

- **List movies**: `GET /movies`
- **Add a movie**: `POST /movies`
- **Update a movie**: `PUT /movies/:id`
- **Delete a movie**: `DELETE /movies/:id`
- **Search for movies**: `GET /movies/search?title=TITLE&genre=GENRE`

### 🏷 Genres

- **List genres**: `GET /genres`
- **Add a genre**: `POST /genres`
- **Delete a genre**: `DELETE /genres/:id`


