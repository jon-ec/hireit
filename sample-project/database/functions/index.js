var functions = require('firebase-functions');

const axios = require('axios')
const firebase = require('firebase')

const config = {
   apiKey: "AIzaSyB-IkA3gA2QVEdkwguWrRh7Be3PGWByzHU",
   authDomain: "hireit-cd86c.firebaseapp.com",
   databaseURL: "https://hireit-cd86c.firebaseio.com",
   projectId: "hireit-cd86c",
   storageBucket: "hireit-cd86c.appspot.com",
   messagingSenderId: "561745944632"
}

firebase.initializeApp(config)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.addMessage = functions.https.onRequest((request, response) => {
    const headers = {
    'X-SmartToken': '9094f33d1caf428fa939c0c250f2ccd2'
    }

    axios.get('https://api.smartrecruiters.com/candidates?status=HIRED', { headers })
    .then((response) => {
        const candidates = response.data.content
        const promises = candidates.map((c) => {
            return axios.get(c.actions.details.url, { headers })
        })
        Promise.all(promises)
        .then((result) => {
            const candidateDetails = result
            .map( (response) => response.data )
            .reduce( (acc, candidate) => {
                acc[`/candidates/${candidate.id}`] = candidate
                return acc
            }, {} )
            console.log("saving to db")
            firebase.database().ref().update(candidateDetails)
              .then((data) => console.log(data))
              .catch((err) => console.log(err))
            response.send("We're done success");
        })
        .catch((err) => {
            console.log(err)
            response.send("We're done fail one" + err);
        })
    })
    .catch((err) => {
        console.log(err)
        response.send("We're done fail2" + err);
    })
});
