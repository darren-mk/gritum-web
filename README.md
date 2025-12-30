# Astro Starter Kit: Minimal

```sh
pnpm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

# 🐳 Docker Build & Test Guide (Grita)

This document outlines the process for containerizing the grita service and verifying it in a local environment for Bitem Labs LLC.

---

## 1. Prerequisites
* **Docker Desktop**: Must be running, and the engine status should be 'running'.
* **Dockerfile**: Must be located in the project root directory.

## 2. Build Image
We use the **BuildKit (buildx)** method, which is the current standard for Docker, to create the image. This method offers faster build speeds and better cache management.

# Command to build:
docker buildx build -t grita-app .

> **Note**: While the legacy 'docker build -t grita-app .' still works, it is deprecated. Using buildx is highly recommended for future-proofing.

## 3. Run & Test Container (Local)
Verify that the built image runs correctly in a simulated server environment.

# Command to run:
docker run -p 8080:8080 grita-app

* **Access URL**: http://localhost:8080
* **To Stop**: Press Ctrl + C in your terminal.

## 4. Command Summary

| Purpose | Command |
| :--- | :--- |
| **Build Image** | docker buildx build -t grita-app . |
| **Run Container** | docker run -p 8080:8080 grita-app |
| **List Images** | docker images |
| **Check Running Containers** | docker ps |