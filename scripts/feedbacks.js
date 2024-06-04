
class MensagemDB {
    constructor(dbName) {
        this.dbName = dbName;
        this.loadDB();
    }

    // Carrega o banco de dados do localStorage
    loadDB() {
        const db = localStorage.getItem(this.dbName);
        this.db = db ? JSON.parse(db) : { messages: [], nextId: 1 };
    }

    // Salva o banco de dados no localStorage
    saveDB() {
        localStorage.setItem(this.dbName, JSON.stringify(this.db));
    }

    // Adiciona uma nova mensagem ao banco de dados
    addMessage(nome, email, corpo) {
        const newMessage = {
            id: this.db.nextId,
            nome: nome,
            email: email,
            corpo: corpo
        };
        this.db.messages.push(newMessage);
        this.db.nextId += 1;
        this.saveDB();
        return newMessage;
    }

    // Obtém todas as mensagens do banco de dados
    getAllMessages() {
        return this.db.messages;
    }

    // Obtém uma mensagem por ID
    getMessageById(id) {
        return this.db.messages.find(message => message.id === id);
    }

    // Atualiza uma mensagem por ID
    updateMessage(id, updatedMessage) {
        const index = this.db.messages.findIndex(message => message.id === id);
        if (index !== -1) {
            this.db.messages[index] = { id, ...updatedMessage };
            this.saveDB();
            return this.db.messages[index];
        }
        return null;
    }

    // Remove uma mensagem por ID
    deleteMessage(id) {
        const index = this.db.messages.findIndex(message => message.id === id);
        if (index !== -1) {
            const deletedMessage = this.db.messages.splice(index, 1);
            this.saveDB();
            return deletedMessage[0];
        }
        return null;
    }

    // Limpa todas as mensagens do banco de dados
    clearDB() {
        this.db = { messages: [], nextId: 1 };
        this.saveDB();
    }
}

// Exemplo de uso
const db = new MensagemDB('mensagensDB');

const buttonSubmit = document.getElementById('button-submit');

buttonSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    salvarComentario();
});

function salvarComentario() {

    const corpo = document.getElementById('corpo-mensagem').value
    const nome = document.getElementById('nome-mensagem').value
    const email = document.getElementById('email-mensagem').value


    const novaMensagem = db.addMessage(nome, email, corpo);
    displayMessage(novaMensagem);
    textarea.value = ''; // Limpar o campo de texto após salvar
}


function displayMessage(message) {
    const rowDiv = document.querySelector('.row');
    const messageCard = createMessageCard(message);
    rowDiv.appendChild(messageCard);
}

// Exibir todas as mensagens ao carregar a página
window.onload = () => {
    const messages = db.getAllMessages();
    messages.forEach(message => displayMessage(message));
};



function createMessageCard(message) {
    if(message.corpo && message.nome && message.email){
        const personDiv = document.createElement('div');
        personDiv.classList.add('person');

        const messageP = document.createElement('p');
        messageP.textContent = `"${message.corpo}"`;

        const nameP = document.createElement('p');
        nameP.classList.add('person-nome');
        nameP.textContent = message.nome;

        personDiv.appendChild(messageP);
        personDiv.appendChild(nameP);

        return personDiv;
    }else{
        alert("Comentário inválido, confira os campos!")
    }

}