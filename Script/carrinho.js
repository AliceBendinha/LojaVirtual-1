document.addEventListener("DOMContentLoaded", function() {
    const listaCarrinho = document.getElementById("lista-carrinho");
    const totalPreco = document.getElementById("total-preco");
    const carrinhoVazio = document.getElementById("carrinho-vazio");
    const botaoPagar = document.getElementById("botao-pagar");

    function carregarCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        listaCarrinho.innerHTML = ""; // Limpa a lista do carrinho
        let total = 0;

        carrinho.forEach((produto, index) => {
            const item = document.createElement("li");
            item.classList.add("item-carrinho");

            const img = document.createElement("img");
            img.src = produto.imagem;
            img.alt = produto.nome;
            img.style.width = "100px"; // Define a largura das imagens
            img.style.height = "auto"; // Mantém a proporção das imagens

            const h3 = document.createElement("h3");
            h3.textContent = produto.nome;

            const span = document.createElement("span");
            span.textContent = `OA ${produto.preco}`;

            const button = document.createElement("button");
            button.classList.add("remover");
            button.dataset.index = index;
            button.textContent = "Remover";

            button.addEventListener('click', function() {
                removerDoCarrinho(index);
            });

            item.appendChild(img);
            item.appendChild(h3);
            item.appendChild(span);
            item.appendChild(button);

            listaCarrinho.appendChild(item);

            total += parseFloat(produto.preco);
        });

        totalPreco.textContent = total.toFixed(2);

        if (carrinho.length === 0) {
            carrinhoVazio.style.display = "block";
        } else {
            carrinhoVazio.style.display = "none";
        }
    }

    function removerDoCarrinho(index) {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        carregarCarrinho();
    }

    botaoPagar.addEventListener('click', function() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        const pagos = JSON.parse(localStorage.getItem("pagos")) || [];

        pagos.push(...carrinho);
        localStorage.setItem("pagos", JSON.stringify(pagos));

        localStorage.removeItem("carrinho");
        carregarCarrinho();
        window.location.href = "produtos-pagos.html"; // Redireciona para a subpágina dos produtos pagos
    });

    carregarCarrinho();
});
