# Error recreation for Prisma team

Recreating an error that occurs for SQL Server connections. When using the `include` option on a `findMany()` query, Prisma will attempt to send a second query for the relation including a parameter for each record returned from the initial table. If your query has more than 2100 results, this causes the query to throw an error as SQL Server limits parameter inputs to 2100 at a time. Expectation is that Prisma should chunk out the query and reassemble the results.

Prisma is already doing this for insert statements using `createMany`, seems to be an issue only with queries.

## Running the example
  1. Download repo and `npm i`
  2. Add .env connection for a sql server
  3. `npx prisma migrate deploy` to init the tables
  4. `npm run dev` to run the script which will insert 2200 related records and then attempt to query them
