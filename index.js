const express = require('express');
const student = require('./data.json'); 
const app = express();

app.use(express.json());

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body; 

  if (typeof threshold !== 'number') {
    return res.status(400).json({ error: 'Threshold must be a number' });
  }

  const data = student.filter(student => student.total > threshold); // Filter students

  if (data.length === 0) {
    return res.json({
      count: 0,
      students: []
    });
  } else {
    const response = {
      count: data.length,
      students: data.map(student => ({
        name: student.name,
        total: student.total
      }))
    };
    return res.json(response);
  }
});

// You can uncomment this code if you have static pages or a frontend
// const { resolve } = require('path');
// app.use(express.static('static'));
// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

const port = 3010;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});