import * as db from '../db.mjs'
import * as messages from '../messages.mjs'

export const getleaderboardHandler = async (event) => {
    try {
        const scanResult = await db.getHighscores()
        return messages.getHighScores(scanResult);

    } catch (err) {
        console.log("Error", err.stack);
        return messages.errorMessage()
    }
}