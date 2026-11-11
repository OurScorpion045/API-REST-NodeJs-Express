import { app } from "./app.js";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on port 127.0.0.1:${PORT}`);
});