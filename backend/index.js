import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.json('Server is running' );
});

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
