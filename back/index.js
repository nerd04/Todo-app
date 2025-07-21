const express = require('express');
const cors = require('cors');

const app = express(); 

app.use(express.json());

const dataArray = [
    { key: 1, task: 'Buy groceries', completed: false },
    { key: 2, task: 'Complete Express.js tutorial', completed: true },
    { key: 3, task: 'Call Alice', completed: false },
    { key: 4, task: 'Clean the house', completed: false },
    { key: 5, task: 'Pay electricity bill', completed: true }
  ];
  
app.use(cors());

app.get('/data',(req,res)=>{
    res.send(dataArray);
})

app.listen('5000', ()=>{
    console.log('server is started');
})