import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

AWS.config.update({
  apiVersion: process.env.AWS_DYNAMO_VERSION ?? 'latest',
  region: process.env.AWS_DYNAMO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_DYNAMO_CREDENTIALS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_DYNAMO_CREDENTIALS_SECRET_ACCESS_KEY
  }
})
