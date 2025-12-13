const express = require("express");
const client = require("prom-client");

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const counter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests"
});

app.get("/", (req, res) => {
  counter.inc();
  res.send("Hello DevOps 🚀");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, () => console.log("Running on port 3000"));
