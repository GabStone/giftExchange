
/**
 * Random number between 'min' and 'max' inclusive
 * @param min
 * @param max
 * @returns {number}
 */
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = randomIntFromInterval;