const { Router } = require('express');
const router = new Router();


router.post('/topsecret', (req, res) => {
    res.send('todo ok');
});

module.exports = router;