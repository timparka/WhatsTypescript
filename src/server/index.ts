import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist/client folder
app.use(express.static(path.join(__dirname, '../../dist/client')));

// Serve the index.html file when accessing the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/client/index.html'));
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});


