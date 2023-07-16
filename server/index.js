import { express } from 'express';
const path = require('path'); // sử dụng path trong dự án

const app = express();

const buildDir = path.join(__dirname, '../build'); // lấy đường dẫn đến thư mục build

const subDir = '/';

// Serve the static files from the React app
app.use(subDir, express.static(buildDir));
// Handles any requests that don't match the ones above
app.get('*', (req, res) => { // không khớp với route nào
    if (logRequests) {
        console.log(req.method + ' ' + req.url);
    }
    res.sendFile(path.join(buildDir, 'index.html'));
});

