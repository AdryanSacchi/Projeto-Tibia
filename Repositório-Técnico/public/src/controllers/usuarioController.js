var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.status(200).json({
    id_usuario: resultadoAutenticar[0].id_usuario, 
    email: resultadoAutenticar[0].email,
    nome: resultadoAutenticar[0].nome
    
});
}
else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var servidor = req.body.servidorServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (servidor == undefined) {
        res.status(400).send("Seu servidor a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, servidor)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function salvarTentativa(req, res) {
    var nome = req.body.nomeServer;
    var classe = req.body.classeServer;
    var vida = req.body.vidaFinalServer;
    var piso = req.body.pisoFinalServer;
    var forca = req.body.forcaFinalServer;
    var agilidade = req.body.agilidadeFinalServer;
    var inteligencia = req.body.inteligenciaFinalServer;
    var sorte = req.body.sorteFinalServer;
    var resistencia = req.body.resistenciaFinalServer;
    var fkUsuario = req.body.fkUsuarioServer;
    

    if (nome == undefined) {
        res.status(400).send("O nome do jogador está undefined!");
    
    } else if (fkUsuario == undefined) { 
        res.status(400).send("O ID do usuário para vincular está undefined!");
    } else if (classe == undefined) {
        res.status(400).send("A classe do jogador está undefined!");
    } else {
        usuarioModel.salvarTentativa(
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
        )
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao salvar a tentativa de jogo! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}
function buscarDadosDashboard(req, res) {
    const idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário não enviado!");
        return;
    }

    usuarioModel.buscarUltimoResultado(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.send("Nenhum resultado encontrado.");
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    salvarTentativa,
    buscarDadosDashboard
}