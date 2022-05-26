
//Questão 1
function ordenarNum() {
    let numAleatorio = $("#numAleatorio").val();
    let numOrdenado = numAleatorio.split(",");
    numOrdenado.sort((a, b) => parseInt(a) - parseInt(b));
    let resultado = "";
    for (var i = 0; i < numOrdenado.length; i++) {
        resultado += "," + numOrdenado[i];
    }
    $("#numOrdenado").val(resultado.substring(1));
    $("#btnArquivo").attr("disabled", false);
}

//Questão 2
function gravarArquivo() {
    let numero = $("#numOrdenado").val().split(",");
    let objeto = JSON.stringify({ numeros: numero });

    arquivo = new Blob([objeto], {
        type: 'application/json'
    });

    let nomeArquivo = "Infortronics";

    let aElemento = document.createElement("a");
    aElemento.download = nomeArquivo;
    aElemento.innerHTML = "Download File";
    if (window.webkitURL != null) {
        aElemento.href = window.webkitURL.createObjectURL(arquivo);
    } else {
        aElemento.href = window.URL.createObjectURL(arquivo);
        aElemento.onclick = destroyClickedElement;
        aElemento.style.display = "none";
        document.body.appendChild(aElemento);
    }
    aElemento.click();
}

//Questão 3
function buscaEndereco() {
    let destino = "https://cors-anywhere.herokuapp.com/https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl/consultaCEP";
    console.log(destino);
    let soapMessage = '<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/"><x:Header/><x:Body><cli:consultaCEP><cep>' + $("#buscaEndereco").val() + '</cep></cli:consultaCEP></x:Body></x:Envelope>';
    $.ajax({
        url: destino,
        crossOrigin: null,
        type: "POST",
        dataType: "xml",
        data: soapMessage,
        contentType: "text/xml",
        success: function (data) {
            let texto = data.documentElement.innerHTML;
            $("#uf").val(texto.split('<uf>')[1].split('</uf>', 1));
            $("#cidade").val(texto.split('<cidade>')[1].split('</cidade>', 1));
            $("#bairro").val(texto.split('<bairro>')[1].split('</bairro>', 1));
            $("#rua").val(texto.split('<end>')[1].split('</end>', 1));
        },
        error: function (data) {
            alert("CEP Inválido");
        }
    });
}

//Questão 4
function verificaNum() {
    let numero = $("#numPerfeito").val();
    let soma = 0;
    for (var i = 0; i < numero; i++) {
        if (numero % [i] == 0) {
            soma = soma + parseInt([i]);
        }
    }
    $("#numResultado").val((soma == numero ? "O Número é Perfeito" : "O Número Não é Perfeito"));
}

//Questão 5
function gerarTabuada() {
    $("#tabela").remove(); 3
    $("#geraTabela").append("<table class='table text-center' id='tabela'><thead><th scope='col-3'>Multiplicação</th><th scope='col-3'>Resultado</th></thead><tbody></tbody></table>");
    for (var i = 1; i <= 10; i++) {
        $("#tabela>tbody").append("<tr id='linha'><td>" + $("#numero").val() + " * " + [i] + "</td><td>" + $("#numero").val() * [i] + "</td></tr>");
    }
    $("#tabela").show();
}
