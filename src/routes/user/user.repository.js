import AWS from 'aws-sdk'
import './../../database/dynamo.js'

const dynamoClient = new AWS.DynamoDB()
const USER_TABLE = {
  TableName: 'user_list',
  ID: 'id',
  Name: 'name',
  LastName: 'lastname',
  Age: 'age'
}

// Set the parameters
const params = {
  TableName: USER_TABLE.TableName,
  AttributeDefinitions: [
    {
      AttributeName: USER_TABLE.ID,
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: USER_TABLE.ID,
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  StreamSpecification: {
    StreamEnabled: false
  }
}

dynamoClient.createTable(params, (err, _) => {
  if (err?.name !== 'ResourceInUseException') {
    console.log(err)
  }
})

const db = new AWS.DynamoDB.DocumentClient({
  params: {
    TableName: USER_TABLE.TableName
  }
})

export {
  db,
  USER_TABLE
}
