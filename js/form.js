var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona"); // variável form recebe o id form-adiciona do index.html

    var paciente = obtemPacienteDoFormulario(form); 

    var erros = validaPaciente(paciente);

    if (erros.length > 0) {
        exibeMensagensDeErro(erros);
        return;
    }

    adicionaPacienteNaTabela(paciente);

    form.reset(); // limpara os campos após adicionar 

    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";

});

function obtemPacienteDoFormulario(form) {  // cria uma função para obter o paciente do formulario form 
    var paciente = { // cria um objeto paciente com "características dentro"
        nome: form.nome.value,  // pega o valor da variável nome dentro do form 
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value) // calcula o imc usando o valor de peso e altura de dentro do form
    }

    return paciente;
}

function montaTr(paciente) { 
    var pacienteTr = document.createElement("tr"); // Cria a Tr  
    pacienteTr.classList.add("paciente"); // Adiciona a classe paciente ao objeto pacienteTr
    //Cria as TD's e a adiciona dentro da TR
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    //retorna a TR
    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td"); // Cria uma Td
    td.classList.add(classe);
    td.textContent = dado;
    return td; 
}

function validaPaciente(paciente) {
    
    var erros = [];

    if(paciente.nome.length == 0) {
        erros.push("O nome não pode ser em branco.");
    }

    if(paciente.gordura.length == 0) {
        erros.push("A gordura não pode ser em branco.");
    }

    if(paciente.peso.length == 0) {
        erros.push("O peso não pode ser em branco.");
    }

    if(paciente.altura.length == 0) {
        erros.push("A altura não pode ser em branco.");
    }

    if(!validaPeso(paciente.peso)) {
        erros.push("Peso é inválido.");
    }

    if(!validaAltura(paciente.altura)) {
        erros.push("Altura é inválida.");
    }

    return erros;
}

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}