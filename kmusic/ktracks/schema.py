import graphene

from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.db.models import Q
from .models import Ktrack, Like
from users.schema import UserType

class KtracType(DjangoObjectType):
    class Meta :
        model = Ktrack

class LikeType(DjangoObjectType):
    class Meta :
        model = Like

class Query(graphene.ObjectType) :
    ktracks = graphene.List(KtracType, search=graphene.String())
    likes = graphene.List(LikeType)

    def resolve_ktracks(self, infor, search=None) :
        if search:

            filter = (
                Q(tittle__icontains=search) |
                Q(description__icontains=search) |
                Q(url__icontains=search) |
                Q(posted_by__username__icontains=search)
            )
            return Ktrack.objects.filter(filter)
            # return Ktrack.objects.filter(tittle__icontains=search)
        return Ktrack.objects.all()

    def resolve_likes(self, infor) :
        return Like.objects.all()

class CreateTrack(graphene.Mutation) :
    ktrack = graphene.Field(KtracType)

    class Arguments:
        tittle = graphene.String()
        description = graphene.String()
        url = graphene.String()

    def mutate(self, info, tittle, description, url) :

        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError('Login to add a track')

        ktrack = Ktrack(tittle=tittle, description=description, url=url, posted_by=user)
        ktrack.save()
        return CreateTrack(ktrack=ktrack)


class UpdateTrack(graphene.Mutation):
    ktrack = graphene.Field(KtracType)

    class Arguments:
        ktrack_id = graphene.Int(required=True)
        tittle = graphene.String()
        description = graphene.String()
        url = graphene.String()

    def mutate(self, info, ktrack_id, tittle, description, url):
        user = info.context.user
        ktrack = Ktrack.objects.get(id=ktrack_id)

        if ktrack.posted_by != user:
            raise GraphQLError('Not permitted to update this track.')

        ktrack.tittle = tittle
        ktrack.description = description
        ktrack.url = url

        ktrack.save()

        return UpdateTrack(ktrack=ktrack)

class DeleteTrack(graphene.Mutation):
    ktrack_id = graphene.Int()

    class Arguments:
        ktrack_id = graphene.Int(required=True)

    def mutate(self, info, ktrack_id) :

        user = info.context.user
        ktrack = Ktrack.objects.get(id=ktrack_id)

        if ktrack.posted_by != user:
            raise GraphQLError('Not permited to update this track')
        
        ktrack.delete()

        return DeleteTrack(ktrack_id=ktrack_id)


class CreateLike(graphene.Mutation):
    user = graphene.Field(UserType)
    ktrack = graphene.Field(KtracType)

    class Arguments:
        ktrack_id = graphene.Int(required=True)

    def mutate(self, info, ktrack_id):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError('Login to like a track')
        
        ktrack = Ktrack.objects.get(id=ktrack_id)

        if not ktrack:
            raise GraphQLError('Cannot find track with given Id')
        Like.objects.create(
            user=user,
            ktrack=ktrack
        )

        return CreateLike(user=user, ktrack=ktrack)


class Mutation(graphene.ObjectType): 
    create_track = CreateTrack.Field()
    update_track = UpdateTrack.Field()
    delete_track = DeleteTrack.Field()
    create_like = CreateLike.Field()

    