document.addEventListener("DOMContentLoaded", function() {
    const produtosLista = document.getElementById("produtos-lista");

    function carregarProdutos() {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

        produtosLista.innerHTML = ""; // Limpa a lista de produtos

        produtos.forEach((produto, index) => {
            const produtoDiv = document.createElement("div");
            produtoDiv.classList.add("produto");

            const img = document.createElement("img");
            img.src = produto.imagem;
            img.alt = produto.nome;

            const h3 = document.createElement("h3");
            h3.textContent = produto.nome;

            const p = document.createElement("p");
            p.textContent = produto.descricao;

            const span = document.createElement("span");
            span.textContent = produto.preco;

            const button = document.createElement("button");
            button.classList.add("adicionar");
            button.dataset.id = produto.id;
            button.dataset.nome = produto.nome;
            button.dataset.preco = produto.preco;
            button.textContent = "Adicionar ao Carrinho";

            button.addEventListener('click', function() {
                adicionarAoCarrinho(produto);
            });

            produtoDiv.appendChild(img);
            produtoDiv.appendChild(h3);
            produtoDiv.appendChild(p);
            produtoDiv.appendChild(span);
            produtoDiv.appendChild(button);

            produtosLista.appendChild(produtoDiv);
        });
    }

    function adicionarAoCarrinho(produto) {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinho.push(produto);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarContadorCarrinho();
    }

    function atualizarContadorCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        document.getElementById("item-count").textContent = carrinho.length;
    }

    carregarProdutos();
    atualizarContadorCarrinho();
});
