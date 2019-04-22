const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

const db =  new Sequelize('mainDB',null,null,{
    dialect: "sqlite",
    storage: './test.sqlite'
})

const Product = db.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vendor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    }
})

const User= db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role : {
        type: DataTypes.INTEGER,
        allowNull:false
    }
})

const CartItem = db.define('cartItem', {
    quantity: DataTypes.SMALLINT,
    amount: DataTypes.FLOAT
})

CartItem.belongsTo(Product)
CartItem.belongsTo(User)

User.hasMany(CartItem)


exports = module.exports = {
    db,
    Product,
    User,
    CartItem
}