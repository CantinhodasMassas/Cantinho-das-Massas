// Elementos

const tamanho = document.getElementById("tamanho");
const proteinaExtra = document.getElementById("proteinaExtra");
const valorTotal = document.getElementById("valorTotal");

// Atualiza o valor da marmita

function atualizarValor(){

    let total = 17.90;

    if(tamanho.value === "750 ml"){
        total = 24.90;
    }

    if(proteinaExtra.value !== "Nenhuma"){
        total += 3;
    }

    valorTotal.innerHTML =
        "R$ " + total.toFixed(2).replace(".", ",");

}

// Eventos

tamanho.addEventListener("change", atualizarValor);

proteinaExtra.addEventListener("change", atualizarValor);

// Inicia

atualizarValor();
