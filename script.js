// 1. Conexão com o Supabase
const SUPABASE_URL = 'https://elhxmihxexxzwgbndjzn.supabase.co'; // Cole sua URL aqui
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsaHhtaWh4ZXh4endnYm5kanpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODA1MTIsImV4cCI6MjA2ODk1NjUxMn0.DkcafJxlOhOdB-WUFbLOCFlfUukA5HHgjUtnBq98nOU'; // Cole sua chave aqui

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Função para buscar os produtos no banco de dados
async function getProducts() {
    // Busca na tabela 'products', selecionando todas as colunas (*)
    let { data: products, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Erro ao buscar produtos:', error);
        return;
    }

    // 3. Exibir os produtos na tela
    const productsGrid = document.getElementById('products-grid');
    // Limpa a grade antes de adicionar novos itens (boa prática)
    productsGrid.innerHTML = ''; 

    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image_url}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <p>Estoque: ${product.stock_quantity}</p>
            </div>
        `;
        // Adiciona o card do produto na grade
        productsGrid.innerHTML += productCard;
    });
}

// 4. Chamar a função para carregar os produtos quando a página abrir
getProducts();