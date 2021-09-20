const { DynamoDB } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region.
const REGION = "us-east-1";
// Create an Amazon DynamoDB service client object.
const ddb = new DynamoDB({ region: REGION });

exports.handler = async(event) => {
  let { ticker } = JSON.parse(event.body);
  try {
    const params = {
      TableName: "stocks",
      Key: {
        ticker: {
          "S": ticker
        }
      }
    }
    console.log(params);
    const data = await ddb.deleteItem(params);
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(data),
    };
    return response;
  }
  catch (err) {
    console.log("Error", err);
    return { statusCode: 500 }
  }
};
