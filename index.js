import express from 'express';
import dotenv from 'dotenv';
import sports_router from './routes/sports.js';
import members_router from './routes/members.js';
import subs_router from './routes/subscriptions.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/sports', sports_router);
app.use('/members', members_router);
app.use('/subscriptions', subs_router);

app.listen(process.env.PORT || 4000 ,()=>{
    console.log(`listening on port : ${process.env.PORT || 4000}`);
})