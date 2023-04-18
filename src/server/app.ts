import express from 'express';
import ViteExpress from 'vite-express';


const app = express();;

app.get('/hello', (_, res) => {
  res.send('Hello World!');
})


ViteExpress.listen(app, 3000, () => {
  console.log('Listening on http://localhost:3000');
});
