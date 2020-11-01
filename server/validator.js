
function validator(participants) {

    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Length Validation
    if (participants.length < 4) {
        return {success: false, message: "Error - Minimum 4 participants are needed for a secret gift exchange"}
    }

    // Content Validation
    for (let i = 0; i < participants.length; i++) {
        if (participants[i].name === "" || participants[i].email === "") {
            return {success: false, message: "Error - Participant information missing"}
        }
        if (!emailRegexp.test(participants[i].email)) {
            return {success: false, message: 'Error - Email invalid for recipient ' + participants[i].name}
        }
    }

    return {success: true}
}

module.exports = validator;