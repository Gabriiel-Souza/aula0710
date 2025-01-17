function validar() {
  var nome = document.getElementById("nome");
  var sobrenome = document.getElementById("sobrenome");
  var email = document.getElementById("email");
  var senha = document.getElementById("senha");
  var confirmarSenha = document.getElementById("confirmarSenha");
  var telefone = document.getElementById("telefone");
  var sexo = document.getElementById("sexo");
  var newsletter = document.getElementById("newsletter").checked;
  var formulario = document.getElementById("formulario");
  var campos = new Array(
    nome,
    sobrenome,
    email,
    senha,
    confirmarSenha,
    telefone,
    sexo
  );

  var dict = [
    "Nome",
    "Sobrenome",
    "Email",
    "Senha",
    "Confirmar Senha",
    "Telefone",
    "Sexo"
  ];

  var i = 0;
  var error = false;
  var camposErrados = new Array();
  campos.forEach((campo) => {
    if (campo.value == "") {
      error = true;
      camposErrados.push(dict[i]);
      campo.focus();
    }
    i += 1;
  });

  var qtdCamposErrados = camposErrados.length;
  var nomesCampos = "";
  for (let index = 0; index < qtdCamposErrados; index++) {
    if (index != 0 && index != qtdCamposErrados - 1) {
      nomesCampos += `, ${camposErrados[index]}`;
    } else if (index == 0) {
      nomesCampos = `${camposErrados[index]}`;
    } else {
      nomesCampos += ` e ${camposErrados[index]}`;
    }
  }
  if (error) {
    if (qtdCamposErrados > 1) {
      alert(`${nomesCampos} não informados`);
    } else {
      alert(`${nomesCampos} não informado`);
    }
  } else {
    formulario.submit();
  }
}
