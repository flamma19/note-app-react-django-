from django.db import models

# Create your models here.


class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    # Updating the time when the object is updated.
    updated = models.DateTimeField(auto_now=True)
    # Creating a field that will automatically be set to the current date and time when the object is
    # created.
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]
