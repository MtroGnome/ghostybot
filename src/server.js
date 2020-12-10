const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const {
  dashboard: { port },
} = require("../config.json");

module.exports = (bot) => {
  const dev = process.env.NODE_ENV !== "production";
  const app = next({ dev: dev });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);

      req.bot = bot;

      handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) throw err;
      bot.logger.log(
        "dashboard",
        `Dashboard was started at: http://localhost:${port}`
      );
    });
  });
};