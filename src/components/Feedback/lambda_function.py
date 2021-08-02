import boto3
import string
import json
import csv
import io
import re
import base64
from wordcloud import WordCloud
import cv2


def lambda_handler(event,context):
    s3 = boto3.client("s3")
    exists = False

    if event:
        print("Event : ",event)
        comprehend = boto3.client("comprehend")
        file_obj = s3.get_object(Bucket = "customerfeedback5410", Key = "combinedfeedback.txt")
        feedback = file_obj['Body'].read().decode('utf-8')
        print(feedback)
        extractedEntities = comprehend.detect_entities(Text = feedback, LanguageCode="en")
        print(extractedEntities)
        print(type(extractedEntities))
        wordcloudstring = "";
        entities = extractedEntities["Entities"]
        print(entities)
        for i in range(0,len(extractedEntities["Entities"])):
            entitydict = entities[i]
            entity = entitydict["Text"]
            wordcloudstring = wordcloudstring + " " + entity
    

        print(wordcloudstring)
        wordcloudobj = WordCloud(background_color="white", height=500, width=800).generate(wordcloudstring).to_image()
        bytestream = io.BytesIO()
        wordcloudobj.save(bytestream,format='PNG')
        imageinbyte = bytestream.getvalue()

        return {
            'headers': { "Content-Type": "image/png" },
            'statusCode': 200,
            'body': base64.b64encode(imageinbyte).decode('utf-8'),
            'isBase64Encoded': True
        }

