import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(cors({origin: ['http://localhost:3000','http://172.20.10.6:3000', 'https://caleb-memories-app.netlify.app/'],
credentials: true,}));

app.use('/posts', postRoutes);

app.get('/', (req, res)=>{
    res.send('Hello to memories API');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((err)=> console.log(err.message));


