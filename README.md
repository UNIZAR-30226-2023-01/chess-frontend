# next-template [![Production CI](https://github.com/hec7orci7o/next-template/actions/workflows/production.yml/badge.svg)](https://github.com/hec7orci7o/next-template/actions/workflows/production.yml)

![node](https://img.shields.io/badge/node-16.x-blue)
![npm](https://img.shields.io/badge/npm-8.15.0-blue)

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)

## Folder structure

> **Note** 
> **_document.js vs. _app.js -- [What is the difference?](https://github.com/vercel/next.js/discussions/39821)**

- `_app.js`: Core of the application, everything is assembled from here at runtime.
- `_document.js`: Where side effects are possible.
- `components`: Contains the reusable layouts of the application.
- `context`: Encapsulates a global state that can be accessed from anywhere in the application.
- `hooks`: Encapsulates small pieces of code that represent a certain type of logic.
- `lib`: Chaos property, stores here functionalities that do not have to do with the rest of the mentioned sections. 
- `pages/api`: Endpoints for creating an api rest.
- `pages`: pages accessible from the browser via `.../page`
- `public`: Static content.
- `styles`: Contains the styles of the application. Override or new styles in `tailwind.config.js`.
- `nginx`: Contains the nginx server configuration.

## Getting Started

### Run for a development environment
> **Warning** 
> This version does not include `nginx` redirectión.<br>Server will be available in: `localhost:3000`

```bash
npm run dev
```

### Run for a production environment
> **Warning** 
> This version does not include `nginx` redirectión.<br>Server will be available in: `localhost:3000`

```bash
npm run build
npm run start
```

### Run for a production environment with [`pm2`](https://pm2.keymetrics.io/)
> **Warning** 
> This version does not include `nginx` redirectión.<br>Server will be available in: `localhost:3000`
```bash
pm2 start pm2-deploy.json
```

### Compile for docker
> **Note** 
> This version includes `nginx` redirectión.<br>Server will be available in: `localhost:80`

```bash
docker-compose up -d
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)
