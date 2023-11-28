import express from "express";

const server = express();
const port = 3000;

server.get('/', (req, res) => {
  res.send('Hello World !')
})

server.listen(port, () => {
  console.log(`server Up ! and listening on port ${port}`)
})