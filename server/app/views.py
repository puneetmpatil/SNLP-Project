from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Chat
from .serializers import ChatSerializer

# Create your views here.
@api_view(['GET'])
def getChats(request):
    chats = Chat.objects.all().order_by('-timestamp')
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def postChat(request):
    serializer = ChatSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteChat(request):
    chat = Chat.objects.get(id=request.data['id'])
    chat.delete()
    return Response('Chat deleted successfully!')