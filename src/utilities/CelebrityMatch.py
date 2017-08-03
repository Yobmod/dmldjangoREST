import sys
import operator
import requests
import json
import twitter
from watson_developer_cloud import PersonalityInsightsV2 as PersonalityInsights

twitter_consumer_key = '2SXmPYm9LZuTMwtdHbxAsPoFx'
twitter_consumer_secret = 'C0Vgbp3O5cF7VsIP9prxhkHBsSTANwUk3OLbGvRFWMkMFB8lC8'
twitter_access_token = '87823677-PL1D2VzA9qQevF4rw7TjjHCrgfiazZiaYHFiuZp2C'
twitter_access_secret = '5wDjqRwcKr3OBz1JDgpRqQ8TQfgWjMJHt9QnJUNOjpCWO'

twitter_api = twitter.Api(consumer_key=twitter_consumer_key,
                          consumer_secret=twitter_consumer_secret,
                          access_token_key=twitter_access_token,
                          access_token_secret=twitter_access_secret)

handle = "@Codecademy"

statuses = twitter_api.GetUserTimeline(screen_name=handle, count=200, include_rts=False)

text = ""

for status in statuses:
    if (status.lang =='en'): #English tweets
        text += status.text.encode('utf-8')
        print(text)
    #when the tweet was created, how many people "favorited" it, what hashtags were used, what other Twitter users were mentioned, what language the tweet is in, and the actual text of the tweet
    
