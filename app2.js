const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type' : 'application/json'
    });

    switch (req.url) {
        case '/posts':
            res.write(JSON.stringify(['post1', 'post2', 'post3']));
            break;
        case '/users':     
            res.write(JSON.stringify(['user1', 'user2', 'user3']));
            break; 
        default:
            res.writeHead(400);
    }

    res.end();

    const response = {
        email: 'test@gmail.com',
        name: 'Petras',
        surname: 'Petraitis'
    }
    res.write(JSON.stringify(response));
    res.end();
});

server.listen(PORT, () => console.log(`${PORT}`));