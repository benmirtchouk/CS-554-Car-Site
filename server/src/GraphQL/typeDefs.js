const {gql} = require('apollo-server')

const typeDefs = gql`
type Query {
    vehicleBy(vin: String!): Vehicle
}

type Mutation {
    modifyPlaceHolder(placeholder: String!): Placeholder
}


type Placeholder {
    placeholder: String!
}

type Vehicle {
    vin: String!
    make: String!
    manufacturer: String!
    model: String!
    year: Int!
}
`;

module.exports = typeDefs;