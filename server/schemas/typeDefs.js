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
    _id: ID!
    foodName: String!
    description: String
    image: String
    price: Float!
    quantity: Int
    category: Category!
}

type Cart {
    food: [Food]
}

type Wishlist {
    food: [Food]
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    allCategory: [Category]
    allFood: [Food]
    allUsers: [User]
    allPizza: [Food]
    allSideOrder: [Food]
    allBeverage: [Food]
}

type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveToCart(foodName: String!, price: Float!): User #added ID to debug - change as needed
    deleteFromCart(foodName: String!): User
    saveToWishlist(foodName: String!): User #added ID to debug - change as needed
    deleteFromWishlist(foodName: String!): User
}
`;

module.exports = typeDefs;