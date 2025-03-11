// dbConnection.js
const mysql = require('mysql2/promise');

// Configurações de conexão
const dbConfig = {
  host: 'sql10.freesqldatabase.com',
  user: 'sql10767088',
  password: 'E1DSrmD9r7',
  database: 'sql10767088',
  port: 3306
};

// Função para obter a conexão
async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
    return connection;
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados MySQL:', err);
    throw err;
  }
}

module.exports = { getConnection };





// // dbConnection.js
// const oracledb = require('oracledb');

// // Configurações de conexão
// const dbConfig = {
//   user: 'NORTESULTST',
//   password: 'n3s3mts',
//   connectString: '172.18.23.11:1521' // Ajuste conforme sua configuração
// };

// // Função para obter a conexão
// async function getConnection() {
//   try {
//     const connection = await oracledb.getConnection(dbConfig);
//     console.log('Conexão bem-sucedida ao banco de dados Oracle');
//     return connection;
//   } catch (err) {
//     console.error('Erro ao conectar ao banco de dados Oracle:', err);
//     throw err;
//   }
// }

// module.exports = { getConnection };
