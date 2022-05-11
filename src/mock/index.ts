const env = process.env.NODE_ENV;
if (env === "development" || env === "test") {
  if (typeof window === "undefined" || env === "test") {
    const { server } = require("./server");
    server.listen();
  } else {
    const { worker } = require("./browser");
    worker.start();
  }
}
export {};
