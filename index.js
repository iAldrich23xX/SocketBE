const { Server } = require("./src");

const server = new Server({ port: 8000 });

server.events.on("serverOpen", () => {
  server.logger.log("open");
  server.logger.info("open");
  server.logger.warn("open");
  server.logger.error("open");
  server.logger.debug("open");
});

server.events.on("worldAdd", (ev) => {
  const { world } = ev;
  server.logger.info("connection opened: " + world.id);
});

server.events.on("worldRemove", (ev) => {
  const { world } = ev;
  server.logger.info("connection closed: " + world.id);
});

server.events.on("playerJoin", (ev) => {
  const { players } = ev;
  server.logger.info(`Joined: ${players}`);
});

server.events.on("playerLeave", (ev) => {
  const { players } = ev;
  server.logger.info(`Left: ${players}`);
});

server.events.on("playerChat", async (ev) => {
  const { sender, message } = ev;
  server.logger.info(`<${sender}> ${message}`);
});

server.events.on('error', e => {
  server.logger.error(e);
})