
const buildResponse = (req, res) => {
    const { positions, message } = req;
    let response = '';
    if (req.positions == false || req.message == false){
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
    res.json(response);
}

module.exports = {
    buildResponse
};