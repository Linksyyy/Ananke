import { createServer } from "http";
import next from "next";

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = createServer((req, res) => handle(req, res));

  server.listen(3000, () => {
    console.log("Server is now active");
  });
});