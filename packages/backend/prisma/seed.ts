import { PrismaClient } from '@prisma/client';
import { employees } from './employees';


const prisma = new PrismaClient();

async function main() {
    for(let employee of employees) {
        await prisma.employee.create({
            data: employee,
        });
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})
