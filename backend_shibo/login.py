import json
from datetime import datetime
import boto3
from boto3.dynamodb.conditions import Key
import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

region = "us-east-1"


def lambda_handler(event, context):
    if event["body"] is not None:
        user_body = json.loads(event["body"])
        print("user BODY:")
        print(user_body)
        
        logger.debug('user func called')
        user_id = user_body['email']
        password = user_body['password']

        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table('users')
        try:
            response = table.get_item(
                Key={
                    'userID': user_id,
                }
            )
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            item = response['Item']
            print("GetItem succeeded:")

            if password == item['userPassword']:
                return {
                    'statusCode': 200,
                    'body': json.dumps('Successfully logged in')
                }                
            else:
                return {
                    'statusCode': 401,
                    'body': json.dumps('Username and Password dont match, please try again')
                } 
