import json
# pylint: disable=import-error
import boto3
import uuid

# pylint: disable=unused-argument
def addfish(event, context):
    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event
    }
    # mytrout = json.loads(event)
    dynamodb = boto3.client('dynamodb')
    # dynamodb.put_item(TableName='fishTable', Item=event)
    dynamodb.put_item(TableName='fishTable', Item={
                                                   'id':{'S':str(uuid.uuid4())},
                                                   'trout':{'S':event['trout']},
                                                   'fly':{'S':event['fly']},
                                                   'date':{'S':event['date']},
                                                   'weather':{'S':event['weather']}
                                                   })


    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response


def addfly(event, context):
    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event
    }
    dynamodb = boto3.client('dynamodb')
    dynamodb.put_item(TableName='flyTable', Item={
                                                   'id':{'S':str(uuid.uuid4())},
                                                   'flyname':{'S':event['flyname']},
                                                   })


    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response