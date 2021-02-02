# Orphan Record Management System for CDA

## depOrph - Orphan Department

### Project Setup

```bash
git clone https://github.com/5H4LYNx0n3/depOrph.git
 
cd depOrph

npm install
```

### Connect your database

To connect your database, you need to set the `url` field of the `datasource` block in your Prisma schema to your database [connection URL](https://www.prisma.io/docs/reference/database-reference/connection-urls/):



```prisma file=prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

In this case, the `url` is [set via an environment variable](https://www.prisma.io/docs/concepts/components/prisma-schema/#using-environment-variables) which is defined in `.env`:

```js file=.env
DATABASE_URL = 'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public'
```

You now need to adjust the connection URL to point to your own database.

The format of the connection URL for your database depends on the database you use. For PostgreSQL, it looks as follows (the parts spelled all-uppercased are _placeholders_ for your specific connection details):

```no-lines
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

Here's a short explanation of each component:

- `USER`: The name of your database user
- `PASSWORD`: The password for your database user
- `PORT`: The port where your database server is running (typically `5432` for PostgreSQL)
- `DATABASE`: The name of the [database](https://www.postgresql.org/docs/12/manage-ag-overview.html)
- `SCHEMA`: The name of the [schema](https://www.postgresql.org/docs/12/ddl-schemas.html) inside the database

If you're unsure what to provide for the `schema` parameter for a PostgreSQL connection URL, you can probably omit it. In that case, the default schema name `public` will be used.

As an example, for a PostgreSQL database hosted on Heroku, the [connection URL](https://www.prisma.io/docs/reference/database-reference/connection-urls/) might look similar to this:

```js file=.env
DATABASE_URL =
  'postgresql://opnmyfngbknppm:XXX@ec2-46-137-91-216.eu-west-1.compute.amazonaws.com:5432/d50rgmkqi2ipus?schema=hello-prisma'
```

### Create database tables with Prisma Migrate
First add the Prisma CLI as a development dependency:

```bash
npm install @prisma/cli -D
```

Then to map the data model to the database schema, you need to use the `prisma migrate` CLI commands:

```bash
npx prisma migrate dev --name init --preview-feature
```

This command does two things:

1. It creates a new SQL migration file for this migration
1. It runs the SQL migration file against the database

Great! Now you have all the tables setup in your database.

### Install and generate Prisma Client

To get started with Prisma Client, you need to install the `@prisma/client` package:

```terminal copy
npm install @prisma/client
```

Notice that the install command automatically invokes `prisma generate` for you which reads your Prisma schema and generates a version of Prisma Client that is _tailored_ to your models.

![Install and generate Prisma Client](https://imgur.com/FensWfo.png)

Whenever you make changes to your Prisma schema in the future, you manually need to invoke `prisma generate` in order to accomodate the changes in your Prisma Client API. Like so:

```bash
npx prisma generate
```

Now run the development servewith this command:

```bash
npm start
```

### Explore the data in Prisma Studio

Prisma Studio is a visual editor for the data in your database.  
You can run it with two ways:

1. Run `$ npx prisma studio` in your terminal.
2. Install [the desktop app](https://github.com/prisma/studio/releases) from the installers.  Windows, macOS and Linux are supported.

For more information visit [Prisma Docs](https://www.prisma.io/docs/getting-started/)