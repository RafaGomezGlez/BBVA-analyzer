const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.json());


// const params = {
//     "pagesId": "1,2,3,4,5,6",
//     "filenameId": "2T20.pdf",
//     "bancoId": "BBVA"
// }

const createEnd = (pagesId, filenameId, bancoId) => {
    return API = `https://alivr1u7r0.execute-api.us-east-1.amazonaws.com/default/split_and_merge_pdf?pagesId=${pagesId}&filenameId=${filenameId}&bancoId=${bancoId}`;
};

app.get('/', async (req, res) => {
    data = req.body;
    // Faltan params de data
    const api = createEnd('1,2,3,4','2T20.pdf', 'Santander' );
    const response =  await fetch(api, {
        method: "GET",
    })
    .then(data => data.json())
    .then( data => res.status(200).send(data));

});

app.listen(app.get('port'), function () {
    console.log("Server started on port", app.get('port'));
});