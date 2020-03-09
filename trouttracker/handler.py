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
    data = json.loads(event['body'])
    dynamodb = boto3.client('dynamodb')
    dynamodb.put_item(TableName='fishTable', Item={
                                                   'id':{'S':str(uuid.uuid4())},
                                                   'trout':{'S':data['trout']},
                                                   'fly':{'S':data['fly']},
                                                   'date':{'S':data['date']},
                                                   'weather':{'S':data['weather']},
                                                   'location':{'S':data['location']}
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
    data = json.loads(event['body'])
    dynamodb = boto3.client('dynamodb')
    dynamodb.put_item(TableName='flyTable', Item={
                                                   'id':{'S':str(uuid.uuid4())},
                                                   'flyname':{'S':data['flyname']},
                                                   })


    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

def getflies(event, context):
    dynamodb = boto3.client('dynamodb')

    response = dynamodb.scan(
        TableName='flyTable'
    )
    items = response['Items']

    response = {
        "statusCode": 200,
        "body": json.dumps(items)
    }

    return response

def getfish(event, context):
    dynamodb = boto3.client('dynamodb')

    response = dynamodb.scan(
        TableName='fishTable'
    )
    items = response['Items']

    response = {
        "statusCode": 200,
        "body": json.dumps(items)
    }

    return response