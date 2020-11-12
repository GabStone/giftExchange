// Express App Setup

const randomIntFromInterval = require('./random');
const sendEmail = require('./email');
const validator = require('./validator');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloneDeep = require('lodash.clonedeep');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/ping/', (req, res) => {
    res.send('pong');
})

app.post('/exchange', async (req, res) => {

    // Participant Object
    /*
    {id: '', name: '', email: ''}
     */
    let participants = req.body;
    for (let participant of participants) {
        participant.id = uuidv4();
    }

    // Body Validation
    let validationResult = validator(participants);
    if (!validationResult.success) {
        res.send({status: -1, result: validationResult.message});
        return;
    }

    // Participants deep copy
    let pickingHat = cloneDeep(participants);

    // Who has who
    let assignments = [];

    let success = false;

    while (!success) {
        for (let participant of participants) {
            // Pick another participant
            let index = randomIntFromInterval(0, pickingHat.length - 1);

            assignments.push({
                buyerId: participant.id,
                buyerName: participant.name,
                buyerEmail: participant.email,
                receiverId: pickingHat[index].id,
                receiverName: pickingHat[index].name
            });

            // Remove from picking hat
            pickingHat.splice(index, 1);
        }

        // Assume it was a success :)
        success = true;

        for (let assignment of assignments) {
            if (assignment.buyerId === assignment.receiverId) {
                // Reset
                pickingHat = cloneDeep(participants);
                assignments = [];
                success = false;
                break;
            }
        }
    }

    // Send Email to all participants
    try {
        let result = await sendEmail(assignments);
        res.send({status: result ? 0 : -1, result: result ? "Success" : "Failure"});
    } catch (e) {
        console.log(e);
        res.send({status: -1, result: "Exception - Try again later"});
    }
});

// Listen on port 5000
app.listen(5000, err => {
    console.log("listening");
});
