const {gql} = require('apollo-server')

const typeDefs = gql`

enum CacheControlScope {
    PUBLIC
    PRIVATE
}

directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

type Query {
    vehicleBy(vin: String!): Vehicle @cacheControl(maxAge: 240, scope: PUBLIC)
}

type Mutation {
    modifyPlaceHolder(placeholder: String!): Placeholder
}


type Placeholder {
    placeholder: String!
}

type Vehicle @cacheControl(maxAge: 240) {
    vin: String!
    make: String!
    manufacturer: String!
    model: String!
    year: Int!
}
`;

module.exports = typeDefs;