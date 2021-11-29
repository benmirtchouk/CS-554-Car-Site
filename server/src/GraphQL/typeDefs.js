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
    getPointsBy(point: GeocodedPointInput!, radius: Int!): [GeocodedPoint]

}

type Mutation {
    modifyPlaceHolder(placeholder: String!): Placeholder
    addPoint(point: GeocodedPointInput!): GeocodedPoint!
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

type GeocodedPoint {
    longitude: Float!
    latitude: Float! 
}

input GeocodedPointInput {
    longitude: Float!
    latitude: Float! 
}
`;

module.exports = typeDefs;