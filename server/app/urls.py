from django.urls import path

from . import views

urlpatterns = [
    path('chats/', views.getChats, name='chats'),
    path('chats/post/', views.postChat, name='post'),
    path('chats/delete', views.deleteChat, name='delete')
]