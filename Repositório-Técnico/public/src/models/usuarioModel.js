var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id_usuario, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, servidor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, servidor);
    
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, servidor) VALUES ('${nome}', '${email}', '${senha}', '${servidor}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarTentativa(
    nome, 
    classe, 
    vida, 
    piso, 
    forca, 
    agilidade, 
    inteligencia, 
    sorte, 
    resistencia,
    fkUsuario
) {
    console.log("ACESSEI O USUARIO MODEL, salvando a tentativa de jogo...");
    var instrucaoSelect = `
        SELECT id_personagem FROM personagem WHERE nick_name = '${nome}';
    `;
    var instrucaoPersonagem = `
        INSERT INTO personagem (nick_name, classe, forca, agilidade, inteligencia, resistencia, sorte, fk_usuario) 
        VALUES ('${nome}', '${classe}', ${forca}, ${agilidade}, ${inteligencia}, ${resistencia}, ${sorte}, ${fkUsuario});
    `;
    
    return database.executar(instrucaoPersonagem)
        .then(resultado => {
            const idNovoPersonagem = resultado.insertId;
            var instrucaoDungeon = `
                INSERT INTO dungeon (vida_final, piso_final, fk_personagem) 
                VALUES (${vida}, ${piso}, ${idNovoPersonagem});
            `;

            console.log("Executando a instrução SQL (INSERT DUNGEON): \n" + instrucaoDungeon);
            return database.executar(instrucaoDungeon);
        })
        .catch(erro => {
             console.error("Erro ao salvar tentativa de jogo:", erro);
             throw erro;
        });
} 

function buscarUltimoResultado(idUsuario) {
    console.log("ACESSEI O MODEL, buscando o último resultado do personagem...");

    var instrucaoSql = `
        SELECT
            p.nick_name,
            p.classe,
            p.forca,
            p.agilidade,
            p.inteligencia,
            p.resistencia,
            p.sorte,
            d.vida_final,
            d.piso_final
        FROM personagem p
        JOIN dungeon d ON p.id_personagem = d.fk_personagem
        WHERE p.fk_usuario = ${idUsuario}
        ORDER BY d.data_participacao DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    autenticar,
    cadastrar,
    salvarTentativa,      
    buscarUltimoResultado  
};