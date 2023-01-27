# Prisma Next CRUD Generator

> This is a Prisma Generator for scaffolding NextJS apps

## Prerequisites

This package assumes you already have a NextJS enviroment and Prisma installed

## Installation

```sh
$ npm i prisma-next-crud-generator -D
```

Or if you prefer using Yarn:

```sh
$ yarn add -D prisma-next-crud-generator
```

## Usage

First, you need to initialize Prisma:

```sh
$ npx prisma init
```

Then, you just need to edit the `prisma/schema.prisma` with the models you want, and the following `generator` block:

```prisma
generator crud {
  provider = "node ../../node_modules/prisma-next-crud-generator"
  output   = "../src" // Optional: the output folder for the generated files
}
```

And that's it! All the API routes and pages will be generated for you. Right now, you can run the development server and you'll have a working app based on the models you specified.
