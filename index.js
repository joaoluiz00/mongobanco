let readline = require("readline-sync");
let { MongoClient, ObjectId } = require("mongodb");

let username = "usuario";
let password = "cleitin007";
let cluster = "cluster0"; // Ajuste se necessário
let dbName = "1571432412002"; // Nome do banco de dados
let collectionName = "tabela"; // Nome da coleção

const url = `mongodb+srv://${username}:${password}@${cluster}.uvhrwxz.mongodb.net/${dbName}?retryWrites=true&w=majority&serverSelectionTimeoutMS=5000`;
const client = new MongoClient(url);

function exibirMenu() {
    let op = 0;
    console.clear();
    console.log("CRUD MongoDB");
    console.log("1 - Inserir");  
    console.log("2 - Alterar");         
    console.log("3 - Listar"); 
    console.log("4 - Localizar");
    console.log("5 - Excluir");
    console.log("6 - Sair");
    op = parseInt(readline.question("Opcao: "));
    return op;
}

async function main() {
    let db = "";
    let collection = "";
    let sites = "";
    let site = "";
    let idSite = "";
    let nomeSite = "";
    let enderecoSite = "";
    let op = 0;
    let resultado = "";
    let filtro = "";

    try {
        await client.connect();
        console.log("Conexao efetuada com o banco de dados MongoDB");
        db = client.db(dbName);
        collection = db.collection(collectionName);
        
        while (op !== 6) {
            op = exibirMenu();

            if (op === 1) {
                // Inserir
                nomeSite = readline.question("Nome: ");
                enderecoSite = readline.question("Endereco: ");
                site = { 'nome': nomeSite, 'endereco': enderecoSite };
                resultado = await collection.insertOne(site);
                console.log("Site Inserido:", resultado.insertedId);
                readline.question("Pressione enter para voltar para o menu.");
            }

            if (op === 2) {
                // Alterar
                idSite = readline.question("Id: ");
                filtro = { '_id': new ObjectId(idSite) };
                sites = await collection.find(filtro).toArray();
                console.log("Site a ser alterado:", sites[0]);
                console.log("Informe os novos dados do site");
                nomeSite = readline.question("Nome: ");
                enderecoSite = readline.question("Endereco: ");
                site = { $set: { 'nome': nomeSite, 'endereco': enderecoSite } };
                resultado = await collection.updateOne(filtro, site);
                readline.question("Pressione enter para voltar para o menu.");
            }

            if (op === 3) {
                // Listar
                sites = await collection.find({}).toArray();
                console.log('Lista de sites: ', sites);
                readline.question("Pressione enter para voltar para o menu.");
            }

            if (op === 4) {
                // Localizar
                nomeSite = readline.question("Nome: ");
                filtro = { 'nome': { '$regex': `${nomeSite}`, '$options': 'i' } };
                sites = await collection.find(filtro).toArray();
                console.log('Lista de sites: ', sites);
                readline.question("Pressione enter para voltar para o menu.");
            }

            if (op === 5) {
                // Excluir
                idSite = readline.question("Id: ");
                filtro = { '_id': new ObjectId(idSite) };
                resultado = await collection.deleteOne(filtro);
                if (resultado.deletedCount > 0) {
                    console.log("Registro excluido com sucesso!!!!!");
                } else {
                    console.log("Registro não encontrado!!!!!");
                }
                readline.question("Pressione enter para voltar para o menu.");
            }
        }

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
