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

class CreateTrack(graphene.Mutation) :
    ktrack = graphene.Field(KtracType)

    class Arguments:
        tittle = graphene.String()
        description = graphene.String()
        url = graphene.String()

    def mutate(self, info, tittle, description, url) :
        ktrack = Ktrack(tittle=tittle, description=description, url=url)
        ktrack.save()
        return CreateTrack(ktrack=ktrack)

class Mutation(graphene.ObjectType):
    Create_track = CreateTrack.Field()