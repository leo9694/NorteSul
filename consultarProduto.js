// consultarProduto.js
const { getConnection } = require('./dbConnection');

// Função para consultar todos os produtos
async function consultarProduto() {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM TGFPRO "
    );
    return rows;
  } catch (err) {
    console.error('Erro ao consultar produtos:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        console.error('Erro ao fechar a conexão:', err);
      }
    }
  }
}

// Função para consultar produtos por categoria
async function consultarProdutoCategoria(categoria) {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM TGFPRO WHERE DESCRGRUPOPROD = ? ORDER BY CODPROD',
      [categoria]
    );
    return rows;
  } catch (err) {
    console.error('Erro ao consultar produtos por categoria:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        console.error('Erro ao fechar a conexão:', err);
      }
    }
  }
}

module.exports = { consultarProduto, consultarProdutoCategoria };













// // consultarProdutos.js
// const { getConnection } = require('./dbConnection');
// const oracledb = require('oracledb');
// const axios = require('axios');

// // Função para consultar produtos
// async function consultarProduto() {
//   let connection;
//   try {
//     connection = await getConnection();
//     const result = await connection.execute(
//       "SELECT TGFPRO.*,TGFGRU.DESCRGRUPOPROD FROM TGFPRO INNER JOIN TGFGRU ON TGFPRO.CODGRUPOPROD = TGFGRU.CODGRUPOPROD where TGFPRO.ATIVO='S'",
//       [],
//       { outFormat: oracledb.OUT_FORMAT_OBJECT } // Configura o formato de saída para objetos
//     );
    
//     // // Itera sobre as linhas retornadas e exibe o valor da coluna 'nome_da_coluna'
//     // for (const produto  of result.rows) {
//     //   const urlImagem = `http://177.70.29.34:48180/mge/Produto@IMAGEM@CODPROD=${produto.CODPROD}.dbimage`;
//     //   produto.imagemExiste = await verificarImagem(urlImagem);
//     //   console.log(produto.imagemExiste,'  ', produto.CODPROD)
//     // }
//     return result.rows
//   } catch (err) {
//     console.error('Erro ao consultar produtos:', err);
//     throw err;
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error('Erro ao fechar a conexão:', err);
//       }
//     }
//   }
// }

// async function consultarProdutoCategoria(categoria) {
//   let connection;
//   try {
//     connection = await getConnection();
//     const result = await connection.execute(      
//       `SELECT TGFPRO.*,TGFGRU.DESCRGRUPOPROD, SNK_PRECO(2,TGFPRO.CODPROD) AS PRECO FROM TGFPRO INNER JOIN TGFGRU ON TGFPRO.CODGRUPOPROD = TGFGRU.CODGRUPOPROD 
//       where TGFPRO.ATIVO='S' AND
//       TGFGRU.DESCRGRUPOPROD='${categoria}'
//       order by TGFPRO.CODPROD`,
//       [],
//       { outFormat: oracledb.OUT_FORMAT_OBJECT } // Configura o formato de saída para objetos
//     );
//     console.log(`Consulta realizada na categoria ${categoria}`)
//     // // Itera sobre as linhas retornadas e exibe o valor da coluna 'nome_da_coluna'
//     // for (const produto  of result.rows) {
//     //   const urlImagem = `http://177.70.29.34:48180/mge/Produto@IMAGEM@CODPROD=${produto.CODPROD}.dbimage`;
//     //   produto.imagemExiste = await verificarImagem(urlImagem);
//     //   console.log(produto.imagemExiste,'  ', produto.CODPROD)
//     // }
//     return result.rows
//   } catch (err) {
//     console.error('Erro ao consultar produtos:', err);
//     throw err;
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error('Erro ao fechar a conexão:', err);
//       }
//     }
//   }
// }
// async function verificarImagem(url) {
//   try {
//     const response = await axios.head(url);
//     return response.status === 200;
//   } catch (error) {
//     return false;
//   }
// }


// module.exports = { consultarProduto };
// module.exports = { consultarProdutoCategoria };
