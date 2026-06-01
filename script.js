let carrinho = [];

function adicionarAoCarrinho(item) {
    carrinho.push(item);

    atualizarCarrinho();
}

function atualizarCarrinho() {

    let lista = document.getElementById("lista-carrinho");

    lista.innerHTML = "";

    carrinho.forEach(function(item){
        lista.innerHTML += "<p>✓ " + item + "</p>";
    });

    document.getElementById("total").innerHTML =
        "Itens no carrinho: " + carrinho.length;
}
