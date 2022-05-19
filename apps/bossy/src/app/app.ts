import { sendSpaceliftEventsToSlackRouter } from "@cloudposse/modules/spacelift";
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(
  express.json({
    inflate: true,
    strict: false,
    type: () => {
      return true;
    },
  })
);
app.use(express.urlencoded({ extended: true }));

app.get("/test", async (req, res) => {
  return res.send("Hello World!");
});

app.use("/webhooks/spacelift", sendSpaceliftEventsToSlackRouter);

export { app };
