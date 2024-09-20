import crypto from 'crypto'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = process.env.HIGHSCORE_TABLE;

export async function insertScore(userId, score) {
    var dataParams = {
        TableName: tableName,
        Item: {
            id: crypto.randomUUID().toString(),
            game: "Space Rogue",
            userId: userId,
            score: score,
            insertedAt: new Date().toLocaleDateString('en-ZA', { timeZone: "America/New_York" })
        }
    };
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    return await ddbDocClient.send(new PutCommand(dataParams));
}

export async function getHighscores() {
    var scanParams = {
        ProjectionExpression: "userId, score",
        TableName: tableName,
        IndexName: "leaderboardIndex",
        Limit: 10,
        KeyConditionExpression: "game = :v_title",
        ExpressionAttributeValues: {
            ":v_title": "Space Rogue"
        },
        ProjectionExpression: "userId, score",
        ScanIndexForward: false
    };
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
    return await ddbDocClient.send(new QueryCommand(scanParams));
}


