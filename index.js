const mongoose = require('mongoose');
const readlineSync = require('readline-sync');
const Activity = require('./atividadeModel'); 

// Conexão com o MongoDB Atlas
mongoose.connect('mongodb+srv://<João Luiz S.pereira>:<cleitin007>@cluster0.mongodb.net/<1571432412002>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas', err));

// Funções do sistema

// Cadastro de atividade
async function cadastrarAtividade() {
  const nome = readlineSync.question('Nome da atividade: ');
  const descricao = readlineSync.question('Descricao da atividade: ');
  const data = readlineSync.question('Data da atividade: ');
  const realizada = readlineSync.question('Atividade realizada (sim/nao): ');

  const novaAtividade = new Activity({
    nome,
    descricao,
    data,
    realizada
  });

  await novaAtividade.save();
  console.log('Atividade cadastrada com sucesso!');
}

// Consulta de atividade por código
async function consultarAtividade() {
  const id = readlineSync.question('Digite o ID da atividade: ');
  const atividade = await Activity.findById(id);
  if (atividade) {
    console.log('Atividade encontrada:', atividade);
  } else {
    console.log('Atividade não encontrada!');
  }
}

// Lista de atividades
async function listarAtividades() {
  const atividades = await Activity.find();
  console.log('Lista de atividades:', atividades);
}

// Edição de atividade
async function editarAtividade() {
  const id = readlineSync.question('Digite o ID da atividade a ser editada: ');
  const atividade = await Activity.findById(id);
  if (atividade) {
    atividade.nome = readlineSync.question(`Nome (${atividade.nome}): `) || atividade.nome;
    atividade.descricao = readlineSync.question(`Descricao (${atividade.descricao}): `) || atividade.descricao;
    atividade.data = readlineSync.question(`Data (${atividade.data}): `) || atividade.data;
    atividade.realizada = readlineSync.question(`Realizada (sim/nao) (${atividade.realizada}): `) || atividade.realizada;
    await atividade.save();
    console.log('Atividade editada com sucesso!');
  } else {
    console.log('Atividade não encontrada!');
  }
}

// Exclusão de atividade
async function excluirAtividade() {
  const id = readlineSync.question('Digite o ID da atividade a ser excluída: ');
  await Activity.findByIdAndDelete(id);
  console.log('Atividade excluída com sucesso!');
}

// Menu do sistema
async function menu() {
  while (true) {
    console.log(`
    1. Cadastrar nova atividade
    2. Consultar atividade por código
    3. Listar todas as atividades
    4. Editar atividade
    5. Excluir atividade
    6. Sair
    `);
    const opcao = readlineSync.question('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        await cadastrarAtividade();
        break;
      case '2':
        await consultarAtividade();
        break;
      case '3':
        await listarAtividades();
        break;
      case '4':
        await editarAtividade();
        break;
      case '5':
        await excluirAtividade();
        break;
      case '6':
        console.log('Saindo...');
        process.exit();
      default:
        console.log('Opção inválida!');
    }
  }
}

menu();
