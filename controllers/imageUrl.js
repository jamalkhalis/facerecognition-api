const fetch = require('node-fetch');

const handlApi = (req, res) => {

    const { input } = req.body;

    const USER_ID = 'iqyisbjqfgq0';
    const PAT = 'b75e266e50df4e70acb56c984821e943';
    const APP_ID = 'facerecognition';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = input;
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };



    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => { 

          res.json(result);

        })
        .catch(error => console.log('error', error));

}


module.exports = { handlApi };