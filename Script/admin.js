 document.addEventListener("DOMContentLoaded", function() {
        const formInicio = document.getElementById("inicio-form");
        const inicioTitulo = document.getElementById("inicio-titulo");
        const inicioSubtitulo = document.getElementById("inicio-subtitulo");
        const inicioDescricao = document.getElementById("inicio-descricao");
        const inicioImagem = document.getElementById("inicio-imagem");

        const limparButtonInicio = document.getElementById("limpar-form-inicio");

        let inicioEditando = null; // Armazenar o índice do conteúdo da página inicial que está sendo editado

        // Função para carregar conteúdos da página inicial do localStorage
        function carregarInicio() {
            const inicioLista = document.getElementById("inicio-lista");
            const inicios = JSON.parse(localStorage.getItem("inicio")) || [];

            inicioLista.innerHTML = ""; // Limpa a lista de conteúdos

            inicios.forEach((inicio, index) => {
                const inicioDiv = document.createElement("div");
                inicioDiv.classList.add("produto");

                const img = document.createElement("img");
                img.src = inicio.imagem;
                img.alt = inicio.titulo;

                const h3Titulo = document.createElement("h3");
                h3Titulo.textContent = inicio.titulo;

                const h3Subtitulo = document.createElement("h3");
                h3Subtitulo.classList.add("com");
                h3Subtitulo.textContent = inicio.subtitulo;

                const p = document.createElement("p");
                p.textContent = inicio.descricao;

                const editarButton = document.createElement("button");
                editarButton.classList.add("editar");
                editarButton.dataset.index = index;
                editarButton.textContent = "Editar";

                const apagarButton = document.createElement("button");
                apagarButton.classList.add("apagar");
                apagarButton.dataset.index = index;
                apagarButton.textContent = "Apagar";

                inicioDiv.appendChild(img);
                inicioDiv.appendChild(h3Titulo);
                inicioDiv.appendChild(h3Subtitulo);
                inicioDiv.appendChild(p);
                inicioDiv.appendChild(editarButton);
                inicioDiv.appendChild(apagarButton);

                inicioLista.appendChild(inicioDiv);

                // Event listener para botão de editar
                editarButton.addEventListener('click', function() {
                    carregarFormularioInicio(index);
                });

                // Event listener para botão de apagar
                apagarButton.addEventListener('click', function() {
                    apagarInicio(index);
                });
            });
        }

        // Função para carregar os dados do conteúdo da página inicial no formulário para edição
        function carregarFormularioInicio(index) {
            const inicios = JSON.parse(localStorage.getItem("inicio")) || [];
            const inicio = inicios[index];

            inicioTitulo.value = inicio.titulo;
            inicioSubtitulo.value = inicio.subtitulo;
            inicioDescricao.value = inicio.descricao;
            inicioEditando = index; // Armazenar o índice do conteúdo que está sendo editado
        }

        // Função para apagar um conteúdo da página inicial
        function apagarInicio(index) {
            const inicios = JSON.parse(localStorage.getItem("inicio")) || [];
            inicios.splice(index, 1);
            localStorage.setItem("inicio", JSON.stringify(inicios));
            carregarInicio();
        }

        // Função para armazenar os conteúdos da página inicial no localStorage
        function salvarInicio(inicios) {
            localStorage.setItem("inicio", JSON.stringify(inicios));
        }

        // Salvar Conteúdo
        formInicio.addEventListener("submit", function(event) {
            event.preventDefault();

            const reader = new FileReader();
            reader.onload = function(e) {
                const inicios = JSON.parse(localStorage.getItem("inicio")) || [];

                const inicio = {
                    titulo: inicioTitulo.value,
                    subtitulo: inicioSubtitulo.value,
                    descricao: inicioDescricao.value,
                    imagem: inicioImagem.files[0] ? e.target.result : inicios[inicioEditando]?.imagem
                };

                if (inicioEditando !== null) {
                    // Atualizar conteúdo existente
                    inicios[inicioEditando] = inicio;
                    inicioEditando = null; // Resetar inícioEditando
                } else {
                    // Adicionar novo conteúdo
                    inicios.push(inicio);
                }

                salvarInicio(inicios);
                alert("Conteúdo salvo com sucesso!");
                formInicio.reset();
                carregarInicio();
            };

            if (inicioImagem.files[0]) {
                reader.readAsDataURL(inicioImagem.files[0]);
            } else {
                reader.onload(); // Carregar imagem existente se nenhuma nova imagem for selecionada
            }
        });

        // Limpar Formulário
        limparButtonInicio.addEventListener("click", function() {
            formInicio.reset();
            inicioEditando = null; // Resetar inícioEditando
        });

        // Carregar conteúdos ao iniciar a página
        carregarInicio();
    });

    document.addEventListener("DOMContentLoaded", function() {
        const form = document.getElementById("admin-form");
        const produtoId = document.getElementById("produto-id");
        const produtoNome = document.getElementById("produto-nome");
        const produtoDescricao = document.getElementById("produto-descricao");
        const produtoPreco = document.getElementById("produto-preco");
        const produtoImagem = document.getElementById("produto-imagem");
        const paginaDestino = document.getElementById("pagina-destino");

        const limparButton = document.getElementById("limpar-form");

        let produtoEditando = null; // Armazenar o índice do produto que está sendo editado

        // Função para carregar produtos do localStorage
        function carregarProdutos() {
            const produtosLista = document.getElementById("produtos-lista");
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

                const editarButton = document.createElement("button");
                editarButton.classList.add("editar");
                editarButton.dataset.index = index;
                editarButton.textContent = "Editar";

                const apagarButton = document.createElement("button");
                apagarButton.classList.add("apagar");
                apagarButton.dataset.index = index;
                apagarButton.textContent = "Apagar";

                produtoDiv.appendChild(img);
                produtoDiv.appendChild(h3);
                produtoDiv.appendChild(p);
                produtoDiv.appendChild(span);
                produtoDiv.appendChild(editarButton);
                produtoDiv.appendChild(apagarButton);

                produtosLista.appendChild(produtoDiv);

                // Event listener para botão de editar
                editarButton.addEventListener('click', function() {
                    carregarFormulario(index);
                });

                // Event listener para botão de apagar
                apagarButton.addEventListener('click', function() {
                    apagarProduto(index);
                });
            });
        }

        // Função para carregar os dados do produto no formulário para edição
        function carregarFormulario(index) {
            const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
            const produto = produtos[index];

            produtoId.value = produto.id;
            produtoNome.value = produto.nome;
            produtoDescricao.value = produto.descricao;
            produtoPreco.value = produto.preco;
            produtoEditando = index; // Armazenar o índice do produto que está sendo editado
        }

        // Função para apagar um produto
        function apagarProduto(index) {
            const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
            produtos.splice(index, 1);
            localStorage.setItem("produtos", JSON.stringify(produtos));
            carregarProdutos();
        }

        // Função para armazenar os produtos no localStorage
        function salvarProdutos(produtos, pagina) {
            localStorage.setItem(pagina, JSON.stringify(produtos));
        }

        // Função para obter os produtos do localStorage
        function obterProdutos(pagina) {
            return JSON.parse(localStorage.getItem(pagina)) || [];
        }

        // Salvar Produto
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const pagina = paginaDestino.value; // Página de destino selecionada

            const reader = new FileReader();
            reader.onload = function(e) {
                const produtos = obterProdutos(pagina);

                const produto = {
                    id: produtoId.value,
                    nome: produtoNome.value,
                    descricao: produtoDescricao.value,
                    preco: produtoPreco.value,
                    imagem: produtoImagem.files[0] ? e.target.result : produtos[produtoEditando]?.imagem
                };

                if (produtoEditando !== null) {
                    // Atualizar produto existente
                    produtos[produtoEditando] = produto;
                    produtoEditando = null; // Resetar produtoEditando
                } else {
                    // Adicionar novo produto
                    produtos.push(produto);
                }

                salvarProdutos(produtos, pagina);
                alert("Produto salvo com sucesso!");
                form.reset();
                carregarProdutos();
            };

            if (produtoImagem.files[0]) {
                reader.readAsDataURL(produtoImagem.files[0]);
            } else {
                reader.onload(); // Carregar imagem existente se nenhuma nova imagem for selecionada
            }
        });

        // Limpar Formulário
        limparButton.addEventListener("click", function() {
            form.reset();
            produtoEditando = null; // Resetar produtoEditando
        });

        // Carregar produtos ao iniciar a página
        carregarProdutos();
    });
