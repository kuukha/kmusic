import graphene

from graphene_django import DjangoObjectType
from .models import Ktrack

class KtracType(DjangoObjectType):
    class Meta :
        model = Ktrack

class Query(graphene.ObjectType) :
    ktracks = graphene.List(KtracType)

    def resolve_ktracks(self, infor) :
        return Ktrack.objects.all()