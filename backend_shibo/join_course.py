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
        course_id = user_body['courseID']
        user_id = user_body['email']

        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table("courses")

        response = table.update_item(
            Key={
                'courseID': course_id,
            },
            UpdateExpression="SET studentList = list_append(studentList, :n), SET studentPresentedLocation = list_append(studentPresentedLocation, :f), SET studentPresentedPhoto = list_append(studentPresentedPhoto, :f), SET studentPresentedQR = list_append(studentPresentedQR, :f)",
            ExpressionAttributeValues={
                ':n': [user_id],
                ':f': [False],
            },
            ReturnValues="UPDATED_NEW"
        )
        print(response)

    return {
        'statusCode': 200,
        'body': json.dumps('Joined course successfully')
    }
