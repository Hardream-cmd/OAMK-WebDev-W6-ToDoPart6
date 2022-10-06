const express = require("express");
const cors = require("cors");
const todoRouter = require("./routes/todo");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", todoRouter);

const port = 3001;

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ error: err.message });
  return;
});

app.listen(port);

// app.get("/", async function (req, res) {
//   try {
//     const result = await todo.getAllTasks();
//     if (!result) result = [];
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// app.post("/new", async function (req, res) {
//   try {
//     const result = await todo.addTask(req.body);
//     res.status(200).json({ id: result.id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.delete("/delete/:id", async function (req, res) {
//   try {
//     await todo.removeTask(req.params.id);
//     res.status(200).json({ id: req.params.id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
