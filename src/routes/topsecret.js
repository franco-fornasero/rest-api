const express = require('express');
const { getLocation, getDistances } = require('../controllers/GetLocation');
const { getMessage, getMessages } = require('../controllers/GetMessage');
const router = express.Router();

router.post('/', async (req, res) => {
    //TODO -> Verificar si viene bien el body y const { satellites } = content;
    const content = req.body; 
    const distances = getDistances(content);
    const messages = getMessages(content);
    const message = getMessage(messages);
    const positions = await getLocation(distances);
    let response = '';
    if (positions == false || message == false){
        res.status(400);
        res.send();
    }
    else {   
        response = {
            "position": {
                "x": positions[0],
                "y": positions[1]
            },
            "message":message
            
        }
        
    }
    res.status(200);
    console.log(response);
    res.json(response);
});

module.exports = router;