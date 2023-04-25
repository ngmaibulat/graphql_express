import express from 'express'
import expressGraphQL from 'express-graphql'
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} from 'graphql'

import { authors, books } from './data.js'

const graphqlHttp = expressGraphQL.graphqlHTTP

const app = express()
const port = 3000

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents an author of a book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        birthYear: { type: GraphQLString },
    }),
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        publicationYear: { type: GraphQLString },
    }),
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        message: {
            type: GraphQLString,
            description: 'Hello World!',
            resolve: () => 'Hello World!',
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: () => books,
        },
    }),
})

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'HelloWorldSchema',
//         fields: () => ({
//             message: { type: GraphQLString, resolve: () => 'Hello World!' },
//         }),
//     }),
// })

const schema = new GraphQLSchema({
    query: RootQueryType,
})

app.use(
    '/graphql',
    graphqlHttp({
        graphiql: true,
        schema: schema,
    })
)

app.get('/', async (req: express.Request, res: express.Response) => {
    res.send('Hello World!\n')
})

app.listen(port, () => {
    console.log('Server is running on port 3000')
})
