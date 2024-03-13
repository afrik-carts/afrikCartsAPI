import app, { PORT } from "./express.config.js";
import prisma from "./prisma.config.js";

try {
    app.listen(PORT, () => {
        console.log('Connection has been established successfully.');
        console.log(`API is listening on port ${PORT}`)
    })

} catch (error) {
    console.error('Unable to connect to the database:', error);
}

process.on('beforeExit', () => {
    prisma.$disconnect();
});
