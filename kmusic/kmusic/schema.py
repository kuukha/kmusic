import graphene
import ktracks.schema
import users.schema

class Query(ktracks.schema.Query, graphene.ObjectType):
    pass

class Mutation(users.schema.Mutation, ktracks.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)