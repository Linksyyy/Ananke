import { createServer } from "http";
import next from "next";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = createServer((req, res) => {
    const start = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - start;
      const { method, url } = req;
      const status = res.statusCode;
      const color = status >= 400 ? "\x1b[31m" : "\x1b[32m";

      console.log(
        `[${method} | ${color}${status}\x1b[0m] ${duration}ms | ${url}`,
      );
    });

    handle(req, res);
  });

  server.listen(3000, () => {
    console.log("Server is now active");
  });
});
