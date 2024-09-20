export function getHighScores(scanResult) {
    const leaderboard = scanResult.Items;
    const response = {
        statusCode: 200,
        body: JSON.stringify(leaderboard)
    };
    return response;
}

export function errorMessage() {
    return {
        statusCode: 500,
        body: "Something went wrong."
    };
}