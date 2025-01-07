import express from 'express';
import cors from 'cors'
import './db.js';
import hotelroutes from './routes/hotelRoutes.js'
import guestRoutes from './routes/Guestroutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('Server is running');
});

app.use("/uploads", express.static("uploads"));

app.use('/hotels', hotelroutes)
app.use('/guest', guestRoutes)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

