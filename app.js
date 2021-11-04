var Person = require("./public/javascript/user")
var fs = require("fs");
var mysql = require("mysql");
var formidable = require("formidable");
var connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "nYsmY8Rh9G",
  password: "pnRmpx4872",
  database: "nYsmY8Rh9G",
});

const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => {
  fs.readFile("index.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});
app.post("/formulario", (req, res) => {
  // Pega os dados do formulário e salva no banco
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) console.error("Erro ao receber os dados");
    let person = new Person(fields);
    console.log(fields.sexo);
    let query = `INSERT INTO Usuários (nome, sobrenome, telefone, email, senha, sexo, newsletter) VALUES ('${person.nome}', '${person.sobrenome}', '${person.telefone}', '${person.email}', '${person.senha}', '${person.sexo}', ${person.newsletter})`;
    connection.connect();
    connection.query(query, (err, result) => {
      if (err) console.error("Error whent it is saving data on database");
    });
    connection.end();
    res.send(`Novo usuário cadastrado: ${person}`);
  });

  // Buscar pessoas
  connection.connect();
  connection.query("SELECT * FROM Usuários", (error, results, fields) => {
    if (error) console.error("Error on quering process");
    console.log("Person: ", new Person(results[0]));
  });
  connection.end();
});
app.listen(3000, () => console.log("Aplicação executando na porta 3000!"));
