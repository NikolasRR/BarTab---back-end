import bcrypt from "bcrypt";

import { prisma } from "../src/database.js";

// create admin user
async function main() {
    const SALT = 10;
    const hashedPassword = bcrypt.hashSync("admin", SALT);

    await prisma.user.upsert({
        where: { email: "admin@admin.com" },
        update: {},
        create: {
            name: "admin",
            email: "admin@admin.com",
            password: hashedPassword
        }
    });
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})