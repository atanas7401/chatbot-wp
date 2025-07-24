const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/chat', (req, res) => {
  res.json({ message: 'OK' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
