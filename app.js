// app.js
const express = require('express');
const path = require('path');
const { consultarProduto, consultarProdutoCategoria } = require('./consultarProduto');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
// Configura o diretório de views e o motor de template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve arquivos estáticos (como CSS)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/proxy', createProxyMiddleware({
  target: 'http://177.70.29.34:48180',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '', // Remove '/proxy' do início da URL
  },
  onProxyRes: function (proxyRes, req, res) {
    // Ajusta o cabeçalho 'content-type' para garantir que seja tratado como imagem
    if (proxyRes.headers['content-type']) {
      proxyRes.headers['content-type'] = 'image/jpeg'; // Ajuste conforme o tipo real da imagem
    }
  },
}));

// Rota principal
app.get('/', async (req, res) => {
  try {
    produto=1
    res.render('teste', { produto });
    console.log('Rota Home')
  } catch (error) {
    res.status(500).send('Erro ao consultar produtos');
  }
});

// Rota para produtos por categoria
app.get('/produtos', async (req, res) => {
  const categoria = req.query.categoria;
  try {
    const produtos = await consultarProdutoCategoria(categoria);
    console.log(produtos)
    res.render('produtos', { produtos, categoria });
  } catch (error) {
    res.status(500).send('Erro ao consultar produtos por categoria');
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

















// // app.js
// const express = require('express');
// const path = require('path');
// const { consultarProduto } = require('./consultarProduto'); // Função de consulta definida anteriormente
// const { consultarProdutoCategoria } = require('./consultarProduto');
// const app = express();

// // Configura o diretório de views e o motor de template
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// // Serve arquivos estáticos (como CSS)
// app.use(express.static(path.join(__dirname, 'public')));

// // Rota principal
// // app.get('/', async (req, res) => {
// //   try {
// //     const produtos = await consultarProduto();
// //     res.render('index', { produtos });
// //   } catch (error) {
// //     res.status(500).send('Erro ao consultar produtos');
// //   }
// // });
// app.get('/', async (req, res) => {
//   try {
//     produto=1
//     res.render('teste', { produto });
//     console.log('Rota Home')
//   } catch (error) {
//     res.status(500).send('Erro ao consultar produtos');
//   }
// });
// app.get('/produtos', async(req, res) => {
//   const categoria = req.query.categoria;
//   const produtos = await consultarProdutoCategoria(categoria);
//   console.log('Rota Produtos')
//   // Lógica para filtrar produtos pela categoria
//   res.render('produtos', { produtos,categoria });
// });

// // Inicia o servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });
