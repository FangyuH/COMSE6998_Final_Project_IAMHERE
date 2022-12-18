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

        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table('courses')
        try:
            response = table.get_item(
                Key={
                    'courseID': course_id,
                }
            )
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            item = response['Item']
            print("GetItem succeeded:")
            print(item)

            studentPresented = []
            for i in range(len(item['studentList'])):
                if item['studentPresentedLocation'][i] and item['studentPresentedPhoto'][i] and item['studentPresentedQR'][i]:
                    studentPresented.append(item['studentList'][i])

            return {
                'statusCode': 200,
                'body': json.dumps(studentPresented)
            }                

