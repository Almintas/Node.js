const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type' : 'application/json'
    });

    const response = {
        email: 'test@gmail.com',
        name: 'Petras',
        surname: 'Petraitis'
    }
    res.write(JSON.stringify(response));
    res.end();
});

server.listen(PORT, () => console.log(`${PORT}`));