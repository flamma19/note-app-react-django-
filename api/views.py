from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.decorators import api_view
# Create your views here.

from .models import Note
from .serializers import NoteSerializer
from .utils import getNotesList, updateNote, getNoteDetails, deleteNote, createNote


@api_view(['GET'])
def getRoutes(request):
    """
    It returns an array of objects that contain information about the routes in the API

    :param request: The request object contains all the information about the request that was made to
    the server
    :return: A list of dictionaries
    """
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@api_view(['GET', 'POST', ])
def getNotes(request):
    """
    If the request is a GET, return all the notes in the database. 
    If the request is a POST, create a new note.

    """

    if request.method == 'GET':
        return getNotesList(request)

    if request.method == 'POST':
        return createNote(request)


@api_view(['GET', 'PUT', 'DELETE', ])
def getNote(request, pk):
    """
    If the request method is GET, return the details of the note. If the request method is PUT, update
    the note. If the request method is DELETE, delete the note.

    """

    if request.method == 'GET':
        return getNoteDetails(request, pk)

    if request.method == 'PUT':
        return updateNote(request, pk)

    if request.method == 'DELETE':
        return deleteNote(request, pk)
