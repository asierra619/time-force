const typeDefs= `
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    createdAt: String
    timeStamp: String
    cart: [Cart]
    wishlist: [Wishlist]
}

type Category {
   _id: ID!
   categoryName: String!
}

type Food {
     foodName: String!
     description: String
     image: String
     price: Float!
     quantity: Int
     category: Category!
}

type Cart {
    food: Food!
}

type Wishlist {
    food: Food!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    allCategory: Catergory
    allFood: Food
    allUsers: User
}

type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveToCart(args): User
    deleteFromCart(foodName: String!): User
    saveToWishlish(args): User
    deleteFromWishlist(foodName: String!): User
 }
`;

module.exports = typeDefs;