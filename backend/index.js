console.log("BACKEND INICIANDO");

const express = require("express");
const cors = require("cors");
const path = require("path");

const alunoRoutes = require("./src/routes/alunoRoutes");
const professorRoutes = require("./src/routes/professorRoutes");
const postRoutes = require("./src/routes/postRoutes");

const app = express();

// Servir uploads como estático
app.use("/uploads", express.static(path.join(__dirname, "./src/uploads")));

// Configuração do CORS
app.use(
  cors({
    origin: "*",
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ["Content-Type"],
  })
);

// Body parser
app.use(express.json());

// Rotas
app.use("/acessoaluno", alunoRoutes);
app.use("/acessoprofessor", professorRoutes);
app.use("/posts", postRoutes);

// Start server
app.listen(3001, "0.0.0.0", () => {
  console.log("Server is running");
});

module.exports = app;
