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
        user_photo_url = user_body['photo']

        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table("users")
        table.update_item(
            Key={
                'userID': user_id
            },
            UpdateExpression="SET userName=:n, userPassword=:p, userPhotoURL=:u",
            ExpressionAttributeValues={
                ':n': user_name,
                ':p': password,
                ':u': user_photo_url,
            },
            ReturnValues="UPDATED_NEW"
        )

    return {
        'statusCode': 200,
        'body': json.dumps('Edit user successfully')
    }
