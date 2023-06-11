from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Chat
from .serializers import ChatSerializer
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .utility import getResponse
from .sentiment_analysis import calculate_sentiment_score

# Create your views here.
@api_view(['GET'])
def getChats(request):
    token = request.headers['Authorization'].split(' ')[1]
    user = request.user
    user_id = user.id
    chats = Chat.objects.filter(user_id=user_id).order_by('-timestamp')
    serializer = ChatSerializer(chats, many=True)
    # print(serializer.data)
    data = [{'request': chat['message'], 'response': chat['response']} for chat in serializer.data]
    return Response(data)

@api_view(['POST'])
def postChat(request):
    token = request.headers['Authorization'].split(' ')[1]
    user = request.user
    user_id = user.id
    request = request.data['request']
    response = getResponse(request)
    # print(response)
    data = {
        'user': user_id,
        'message': request,
        'response': response
    }
    serializer = ChatSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteChat(request):
    user_id = request.user.id
    Chat.objects.filter(user_id=user_id).delete()
    return Response('All chats deleted successfully!')

@api_view(['POST'])
def sentimentAnalysis(request):
    text = request.data['text']
    
    result = calculate_sentiment_score(text);

    return Response(result)