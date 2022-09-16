## Getting started with BarTab

---

### Download dependencies

bash `npm i` on terminal

### Create .env file

* PORT = *port to run your server on*
* POSTGRES_USERNAME = *postgres username on your machine, default is* `postgres`
* POSTGRES_PASSWORD = *postgres password on your machine, default is* `postgres`
* POSTGRES_HOST = `localhost` (*if running locally*)
* POSTGRES_PORT = *postgres port on your machine, default is* `5432`
* POSTGRES_DATABASE = *database name*
* JWT_SECRET` = *random string of your choosing*
* DATABASE_URL = `postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public`

### Generate Database

1. bash `npx prisma generate` on terminal
2. bash `npx prisma migrate dev` on terminal

### Run on develpoment

bash `npm run dev` on terminal