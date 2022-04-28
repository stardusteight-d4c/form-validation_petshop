export function validar(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagemDeErro = {
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'Insira um email.',
        typeMismatch: 'Insira um email válido.'
    },
    senha: {
        valueMissing: 'Insira uma senha.',
        patternMismatch: 'A senha deve conter no mínimo 6 caracteres, ser alfanumérica e não conter caracteres especiais.'
    },
    dataNascimento: {
        valueMissing: 'O campo está vazio.',
        customError: 'Você deve ter mais que 18 anos.'
    },
    cpf: {
        valueMissing: 'O campo de CPF está vazio',
        customError: 'O CPF inserido não é válido.'
    },
    cep: {
        valueMissing: 'O campo de CEP está vazio.',
        patternMismatch: 'O CEP inserido não é válido.',
        customError: 'CEP inválido.'
    },
    logradouro: {
        valueMissing: 'O campo logradouro não pode estar vazio.'
    },
    cidade: {
        valueMissing: 'O campo cidade não pode estar vazio.'
    },
    estado: {
        valueMissing: 'O campo estado não pode estar vazio.'
    },
    preco: {
        valueMissing: 'O campo de preço não pode estar vazio.'
    }
}

const validadores = {
    dataNascimento:input => validarDataNascimento(input),
    cpf:input => validarCPF(input),
    cep:input => recuperarCEP(input)
} 

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = '';
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagemDeErro[tipoDeInput][erro];
        }
    })
    return mensagem;
}

function validarDataNascimento(input) {
    const dataRecebida = new Date(input.value);
    maiorQue18(dataRecebida);
    let mensagem = '';
    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ter mais que 18 anos.';
    }
    input.setCustomValidity(mensagem);
}

function maiorQue18(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
    return dataMais18 <= dataAtual;
}

function validarCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, '');
    let mensagem = '';
    if(!checarCPFrepetido(cpfFormatado) || !checarEstruturaCPF(cpfFormatado)) {
        mensagem = 'O cpf inserido não é válido.';
    }
    input.setCustomValidity(mensagem);
}

function checarCPFrepetido(cpf) {
    let numCPF = 0;
    let valoresRepetidos = [];
    let result = '';
    while(numCPF < 10) {
        result = String(numCPF).repeat(11);
        valoresRepetidos.push(result);
        numCPF++;
    }
    let cpfValido = true;
    valoresRepetidos.forEach(valor => {
        if(valor == cpf) {
            cpfValido = false;
        }
    })
    return cpfValido;
}

function checarEstruturaCPF(cpf) {
    const multiplicador = 10;
    return checarDigitoVerificador(cpf, multiplicador);
}

function checarDigitoVerificador(cpf, multiplicador) {
    if(multiplicador >= 12) {
        return true;
    }
    let multiplicadorInicial = multiplicador;
    let soma = 0;
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
    const digitoVerificador = cpf.charAt(multiplicador - 1);
    for(let cont = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
        soma = soma + cpfSemDigitos[cont] * multiplicadorInicial;
        cont++;
    }
    if(digitoVerificador == confirmarDigito(soma)) {
        return checarDigitoVerificador(cpf, multiplicador + 1);
    }
    return false;
}

function confirmarDigito(soma) {
    return 11 - (soma % 11);
}

function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }

    if(!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url,options).then(
            response => response.json()
        ).then(
            data => {
                if(data.erro) {
                    input.setCustomValidity('CEP inválido.');
                    return;
                }
                input.setCustomValidity('');
                preencheCamposComCEP(data);
                return;
            }
        )
    }
}

function preencheCamposComCEP(data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]');
    const cidade = document.querySelector('[data-tipo="cidade"]');
    const estado = document.querySelector('[data-tipo="estado"]');
    logradouro.value = data.logradouro;
    cidade.value = data.localidade;
    estado.value = data.uf;
}