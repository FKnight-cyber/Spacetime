import fastify from 'fastify';

const app = fastify();

const port = 5000;

app.listen({
    port
}).then(() => {
    console.log(`Server running on http://localhost:${port}`);
})