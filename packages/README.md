# Prisma Next CRUD Generator

> This generator was bootstraped using [create-prisma-generator](https://github.com/YassinEldeeb/create-prisma-generator)

[Prisma](https://www.prisma.io/) generator that generates CRUD operations based on your models, using [Next.js](https://nextjs.org/).

## Requirements

- Prisma
- Next.js with [Server Actions enabled](https://nextjs.org/docs/app/api-reference/next-config-js/serverActions#enabling-server-actions-v13)
- [Tailwind CSS Forms plugin](https://github.com/tailwindlabs/tailwindcss-forms)
- [Tailwind Merge](https://github.com/dcastil/tailwind-merge) for handling class merging

## How to use it?

### 1. Install the generator

```sh
npm i -D prisma-next-crud-generator
```

### 2. Add the generator to your Prisma schema

```prisma
generator client {
  provider = "prisma-client-js"
}

generator next-crud {
  provider = "prisma-next-crud-generator"
}
```

### 3. Run `npx prisma generate`

```sh
npx prisma generate
```

### 4. Run `npm run dev`

```sh
npm run dev
```

### 5. Open `http://localhost:3000`

## How to contribute?

1. Go to the [repository](https://github.com/MBrunoS/prisma-next-crud-generator) and clone it
2. Enter the generator directory: `cd packages/generator`
3. Run `npm run dev` to start the generator in watch mode
4. Open another terminal and enter the example directory: `cd packages/usage`
5. Run `npm run dev` to start the example in watch mode
6. Open `http://localhost:3000` and start playing with the example
7. Make your changes and run `npx prisma generate` to test your changes
8. Submit a PR