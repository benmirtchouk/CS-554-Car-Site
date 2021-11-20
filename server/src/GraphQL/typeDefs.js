const {gql} = require('apollo-server')

const typeDefs = gql`
type Query {
    getPlaceholders: [Placeholder]
}

type Mutation {
    modifyPlaceHolder(placeholder: String!): Placeholder
}


type Placeholder {
    placeholder: String!
}
`;

module.exports = typeDefs;