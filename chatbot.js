// leitor de qr code
const qrcode = require("qrcode-terminal");
const { Client, Buttons, List, MessageMedia } = require("whatsapp-web.js"); // Mudança Buttons
const client = new Client({
  puppeteer: { headless: true }, // Executa em segundo plano
  // authStrategy: new LocalAuth() // Mantém a sessão salva
});

// serviço de leitura do qr code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
// apos isso ele diz que foi tudo certo
client.on("ready", () => {
  console.log("Tudo certo! WhatsApp conectado.");
});
// E inicializa tudo
client.initialize();

const delay = (ms) => new Promise((res) => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil

client.on("message", async (msg) => {
  if (
    msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) &&
    msg.from.endsWith("@c.us")
  ) {
    const chat = await msg.getChat();

    await delay(2000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(2000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
    const contact = await msg.getContact(); //Pegando o contato
    const name = contact.pushname; //Pegando o nome do contato
    await client.sendMessage(
      msg.from,
      "Olá! " +
        name.split(" ")[0] +
        " Sou o assistente virtual do Residencial Belavista,  Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:\n\n1-Agendamento\n2-Encomendas\n3-Termos\n4-Permitir visitante\n5-Pedido de manutenção"
    ); //Primeira mensagem de texto
    await delay(2000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000); //Delay de 5 segundos
  }

  if (msg.body !== null && msg.body === "1" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(2000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(2000);
    await client.sendMessage(msg.from, "Voçe selecionou a opção agendamento");

    await delay(2000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(2000);
    await client.sendMessage(msg.from, "Clique no link abaixo");

    await delay(2000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(2000);
    await client.sendMessage(
      msg.from,
      "https://residencialbelavista.netlify.app/"
    );
  }

  if (msg.body !== null && msg.body === "2" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000);
    await client.sendMessage(msg.from, "Digite o numero do seu apartamento");

    await delay(2000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(2000);
    await client.sendMessage(msg.from, "consultando...");
  }

  if (msg.body !== null && msg.body === "3" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Voçe selecionou a opção termos, um link será enviado para você"
    );

    await delay(2000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000);
    await client.sendMessage(msg.from, "https://residencialbelavista.netlify.app/");
  }

  if (msg.body !== null && msg.body === "4" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Voçe selecionou a opção permitir visitante, um link será enviado para você"
    );

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000);
    await client.sendMessage(msg.from, "https://residencialbelavista.netlify.app/");
  }

  if (msg.body !== null && msg.body === "5" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Para fazer um pedido de manutenção, clique no link abaixo"
    );

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000);
    await client.sendMessage(msg.from, "https://residencialbelavista.netlify.app/");
  }
});
