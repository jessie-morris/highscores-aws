import * as db from '../db.mjs'
import * as messages from '../messages.mjs'

export const leaderboardHandler = async (event) => {
    const params = JSON.parse(event.body);
    const username = params.username;
    const score = params.score;

    try {
        const data = await db.insertScore(username, score);
        const scanResult = await db.getHighscores()
        return messages.getHighScores(scanResult);

    } catch (err) {
        console.log("Error", err.stack);
        return messages.errorMessage()
    }
}