const port = process.env.PORT || 3000;
const res = require('express/lib/response');
const app = require('./app');

app.listen(port, () => {
    console.log(`Server on port ${port}`);
    res.send('ok');
});