# PAO

PÃO is a mobile application designed to facilitate social connections through curated group dining experiences.

# PÃO Backend

This repository contains the backend implementation for the PÃO mobile application. The backend is built using Node.js, Express, MongoDB, and TypeScript. It handles user authentication, task management, and event management.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Environment Variables](#environment-variables)
4. [Database Configuration](#database-configuration)
5. [API Endpoints](#api-endpoints)
6. [Middleware](#middleware)
7. [Scheduled Tasks](#scheduled-tasks)
8. [Error Handling](#error-handling)
9. [Running Tests](#running-tests)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   git clone https://github.com/ConradPB/PAO-backend.git
   cd PAO-backend

2. Install dependencies:

   npm install
   or
   yarn install

3. Set up environment variables:

   Create a .env file in the root directory and add the following variables:

   NODE_ENV=development
   PORT=7000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   COOKIE_SECRET=your_cookie_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SESSION_SECRET=your_session_secret_key
