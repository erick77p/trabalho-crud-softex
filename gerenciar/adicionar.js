   let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        
        // Elementos DOM
        const listaProdutos = document.getElementById('lista-produtos');
        const modal = document.getElementById('modal-produto');
        const formulario = document.getElementById('formulario-produto');
        const botaoAdicionar = document.getElementById('botao-adicionar');
        const botaoCancelar = document.getElementById('botao-cancelar');
        const modalFechar = document.getElementById('modal-fechar');
        const campoBusca = document.getElementById('campo-busca');
        
        // Função para exibir produtos na tabela
        function exibirProdutos(produtosParaExibir = produtos) {
            listaProdutos.innerHTML = '';
            
            if (produtosParaExibir.length === 0) {
                listaProdutos.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align: center; padding: 30px;">
                            Nenhum produto cadastrado. Clique em "Adicionar Produto" para começar.
                        </td>
                    </tr>
                `;
                return;
            }
            
            produtosParaExibir.forEach((produto, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${produto.nome}</td>
                    <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
                    <td>${produto.categoria}</td>
                    <td>${produto.origem}</td>
                    <td>${produto.lote}</td>
                    <td>${formatarData(produto.validade)}</td>
                    <td class="acoes-produto">
                        <button class="botao-editar" data-index="${index}">Editar</button>
                        <button class="botao-excluir" data-index="${index}">Excluir</button>
                    </td>
                `;
                listaProdutos.appendChild(tr);
            });
            
            // Adicionar eventos aos botões de editar e excluir
            document.querySelectorAll('.botao-editar').forEach(botao => {
                botao.addEventListener('click', (e) => {
                    const index = e.target.getAttribute('data-index');
                    abrirModalEdicao(index);
                });
            });
            
            document.querySelectorAll('.botao-excluir').forEach(botao => {
                botao.addEventListener('click', (e) => {
                    const index = e.target.getAttribute('data-index');
                    excluirProduto(index);
                });
            });
        }
        
        // Função para formatar data
        function formatarData(dataString) {
            const data = new Date(dataString);
            return data.toLocaleDateString('pt-BR');
        }
        
        // Função para abrir modal de edição
        function abrirModalEdicao(index) {
            const produto = produtos[index];
            document.getElementById('modal-titulo').textContent = 'Editar Produto';
            document.getElementById('produto-id').value = index;
            document.getElementById('produto-nome').value = produto.nome;
            document.getElementById('produto-preco').value = produto.preco;
            document.getElementById('produto-categoria').value = produto.categoria;
            document.getElementById('produto-origem').value = produto.origem;
            document.getElementById('produto-lote').value = produto.lote;
            document.getElementById('produto-validade').value = produto.validade;
            
            modal.style.display = 'flex';
        }
        
        // Função para abrir modal de adição
        function abrirModalAdicao() {
            document.getElementById('modal-titulo').textContent = 'Adicionar Produto';
            formulario.reset();
            modal.style.display = 'flex';
        }
        
        // Função para fechar modal
        function fecharModal() {
            modal.style.display = 'none';
        }
        
        // Função para salvar produto (tanto adição quanto edição)
        function salvarProduto(e) {
            e.preventDefault();
            
            const id = document.getElementById('produto-id').value;
            const nome = document.getElementById('produto-nome').value;
            const preco = document.getElementById('produto-preco').value;
            const categoria = document.getElementById('produto-categoria').value;
            const origem = document.getElementById('produto-origem').value;
            const lote = document.getElementById('produto-lote').value;
            const validade = document.getElementById('produto-validade').value;
            
            const produto = {
                nome,
                preco,
                categoria,
                origem,
                lote,
                validade
            };
            
            if (id === '') {
                // Adicionar novo produto
                produtos.push(produto);
                exibirMensagem('Produto adicionado com sucesso!', 'sucesso');
            } else {
                // Editar produto existente
                produtos[id] = produto;
                exibirMensagem('Produto atualizado com sucesso!', 'sucesso');
            }
            
            // Salvar no localStorage
            localStorage.setItem('produtos', JSON.stringify(produtos));
            
            // Atualizar a exibição
            exibirProdutos();
            
            // Fechar modal
            fecharModal();
        }
        
        // Função para excluir produto
        function excluirProduto(index) {
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                produtos.splice(index, 1);
                localStorage.setItem('produtos', JSON.stringify(produtos));
                exibirProdutos();
                exibirMensagem('Produto excluído com sucesso!', 'sucesso');
            }
        }
        
        // Função para exibir mensagens
        function exibirMensagem(mensagem, tipo) {
            const elementoMensagem = tipo === 'sucesso' 
                ? document.getElementById('mensagem-sucesso')
                : document.getElementById('mensagem-erro');
                
            elementoMensagem.textContent = mensagem;
            elementoMensagem.style.display = 'block';
            
            // Ocultar mensagem após 3 segundos
            setTimeout(() => {
                elementoMensagem.style.display = 'none';
            }, 3000);
        }
        
        // Função para buscar produtos
        function buscarProdutos() {
            const termo = campoBusca.value.toLowerCase();
            const produtosFiltrados = produtos.filter(produto => 
                produto.nome.toLowerCase().includes(termo) ||
                produto.categoria.toLowerCase().includes(termo) ||
                produto.origem.toLowerCase().includes(termo) ||
                produto.lote.toLowerCase().includes(termo)
            );
            
            exibirProdutos(produtosFiltrados);
        }
        
        // Event Listeners
        botaoAdicionar.addEventListener('click', abrirModalAdicao);
        botaoCancelar.addEventListener('click', fecharModal);
        modalFechar.addEventListener('click', fecharModal);
        formulario.addEventListener('submit', salvarProduto);
        campoBusca.addEventListener('input', buscarProdutos);
        
        // Fechar modal ao clicar fora dele
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                fecharModal();
            }
        });
        
        // Inicializar a exibição dos produtos
        exibirProdutos();