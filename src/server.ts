import chalk from "chalk";

import app from "./app.js";

app.listen(process.env.PORT, () => {
    console.log(chalk.bold.blue(`Server is running on port ${process.env.PORT}`));
});