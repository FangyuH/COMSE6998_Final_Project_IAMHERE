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
        user_name = user_body['username']
        password = user_body['password']

        
        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table("users")
        item = {
            "userID": user_id,
            "userName": user_name,
            "userPassword": password,
        }
        table.put_item(Item=item)
    
        return {
            'statusCode': 200,
            'body': json.dumps('Create user successfully')
        }
