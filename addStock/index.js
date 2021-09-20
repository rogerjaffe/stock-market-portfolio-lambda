const { DynamoDB } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region.
const REGION = "us-east-1";
// Create an Amazon DynamoDB service client object.
const ddb = new DynamoDB({ region: REGION });

exports.handler = async(event) => {
  let { ticker, shares, purchasePrice } = JSON.parse(event.body);
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    }
  };
  // Validate the input data
  if (ticker.length > 0 && shares > 0 && purchasePrice > 0) {
    try {
      const params = {
        TableName: "stocks",
        Item: {
          ticker: {"S": ticker},
          shares: {"N": shares},
          purchasePrice: {"N": purchasePrice}
        }
      }
      const data = await ddb.putItem(params);
      response.body = JSON.stringify({error: false});
    }
    catch (err) {
      console.log("Error", err);
      return { statusCode: 500 }
    }
  } else {
    response.body = JSON.stringify({statusCode: 200, error: true, msg: 'Invalid data'});
  }
  return response;
};
