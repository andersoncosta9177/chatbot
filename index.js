// Importações
const express = require("express");
const qrcode = require("qrcode-terminal");
const { Client, Buttons, List, MessageMedia } = require("whatsapp-web.js"); // Mudança Buttons

// Inicializa servidor Express (para Render)
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Chatbot do WhatsApp está rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Configuração do cliente WhatsApp
const client = new Client({
  puppeteer: { headless: true }, // Executa em segundo plano
  // authStrategy: new LocalAuth() // Mantém a sessão salva
});

// Serviço de leitura do QR Code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Confirmação de conexão
client.on("ready", () => {
  console.log("Tudo certo! WhatsApp conectado.");
});

// Inicializa o bot
client.initialize();

const delay = (ms) => new Promise((res) => setTimeout(res, ms)); // Função para criar delay entre ações

// Escuta mensagens recebidas
client.on("message", async (msg) => {
  if (
    msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) &&
    msg.from.endsWith("@c.us")
  ) {
    const chat = await msg.getChat();

    await delay(2000);
    await chat.sendStateTyping();
    await delay(2000);

    const contact = await msg.getContact();
    const name = contact.pushname;

    await client.sendMessage(
      msg.from,
      "Olá! " +
        name.split(" ")[0] +
        " Sou o assistente virtual do Residencial Belavista, Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:\n\n1-Agendamento\n2-Encomendas\n3-Termos\n4-Permitir visitante\n5-Pedido de manutenção"
    );

    await delay(2000);
    await chat.sendStateTyping();
    await delay(3000);
  }

  if (msg.body === "1" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(2000);
    await chat.sendStateTyping();
    await delay(2000);
    await client.sendMessage(msg.from, "Você selecionou a opção agendamento");

    await delay(2000);
    await chat.sendStateTyping();
    await delay(2000);
    await client.sendMessage(msg.from, "Clique no link abaixo");

    await delay(2000);
    await chat.sendStateTyping();
    await delay(2000);
    await client.sendMessage(msg.from, "https://residencialbelavista.netlify.app/");
  }

  if (msg.body === "2" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, "Digite o número do seu apartamento");

    await delay(2000);
    await chat.sendStateTyping();
    await delay(2000);
    await client.sendMessage(msg.from, "Consultando...");
  }

  if (msg.body === "3" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Você selecionou a opção termos, um link será enviado para você"
    );

    await delay(2000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, "https://residencialbelavista.netlify.app/");
  }

  if (msg.body === "4" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Você selecionou a opção permitir visitante, um link será enviado para você"
    );

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, "https://residencialbelavista.netlify.app/");
  }

  if (msg.body === "5" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Para fazer um pedido de manutenção, clique no link abaixo"
    );

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, "https://residencialbelavista.netlify.app/");
  }
});
