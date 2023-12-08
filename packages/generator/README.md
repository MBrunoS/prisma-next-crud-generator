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

### 2. Add the generator to your Prisma schema and add some models

```prisma
generator client {
  provider = "prisma-client-js"
}

generator next_crud {
  provider = "prisma-next-crud-generator"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id                    String   @id @default(uuid())
  name                  String
  price                 Float
  reallyLongDescription String?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}
```
**Note:** `id`, `createdAt`, `updatedAt` and `deletedAt` fields are ignored by the generator in list pages and form inputs. The `id` is used in the `show` and `edit` pages, supporting Int, BigInt and String types.


### 3. Run `npx prisma generate`

```sh
npx prisma generate
```

### 4. Run `npm run dev`

```sh
npm run dev
```

### 5. Open `http://localhost:3000`

And you should see something like this:

![Demo of the generated app](/assets/demo.gif)

That's it! You can now start playing with the generated app.

## How to contribute?

1. Go to the [repository](https://github.com/MBrunoS/prisma-next-crud-generator) and clone it
2. Enter the generator directory: `cd packages/generator`
3. Run `npm run dev` to start the generator in watch mode
4. Open another terminal and enter the example directory: `cd packages/usage`
5. Run `npm run dev` to start the example in watch mode
6. Open `http://localhost:3000` and start playing with the example
7. Make your changes and run `npx prisma generate` to test your changes
8. Submit a PR