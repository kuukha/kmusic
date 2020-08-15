import graphene
import ktracks.schema

class Query(ktracks.schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)