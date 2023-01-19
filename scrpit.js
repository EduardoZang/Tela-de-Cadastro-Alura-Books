async function buscaEndereco(cep){
    var msgErro = document.getElementById('erro');
    msgErro.innerHTML = "";
    try{
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var conversao = await consultaCep.json();
    if(conversao.erro){
        throw Error('CEP não existente...');
    }
    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');

    cidade.value = conversao.localidade;
    logradouro.value = conversao.logradouro;
    estado.value = conversao.uf;

    return conversao;
    }catch(erro){
        msgErro.innerHTML = `<p>CEP inválido!</p>`;
        console.log(erro);
    }
}

var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));