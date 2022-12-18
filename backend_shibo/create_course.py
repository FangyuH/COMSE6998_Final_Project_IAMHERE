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
        course_name = user_body['courseName']

        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table("courses")
        item = {
            "courseID": course_id,
            "courseName": course_name,
            "studentList": [],
            "studentPresentedLocation": [],
            "studentPresentedPhoto": [],
            "studentPresentedQR": [],
        }
        table.put_item(Item=item)

    return {
        'statusCode': 200,
        'body': json.dumps('Added course successfully')
    }
