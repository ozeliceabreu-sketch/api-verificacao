const express = require('express');
const app = express();

app.use(express.json());

let db = {};

// teste
app.get('/', (req, res) => {
    res.send('API ONLINE ✅');
});

// recebe do jogo
app.post('/enviar', (req, res) => {
    const { nick, patente } = req.body;

    db[nick.toLowerCase()] = {
        nick,
        patente,
        tempo: Date.now()
    };

    console.log('Recebido:', nick, patente);

    res.send({ ok: true });
});

// verifica no bot
app.get('/verificar/:nick', (req, res) => {
    const nick = req.params.nick.toLowerCase();

    if (!db[nick]) return res.send({ ok: false });

    res.send({ ok: true, data: db[nick] });
});

app.listen(3000, () => {
    console.log('API rodando 🚀');
});
