const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const ObjectID = mongodb.ObjectID;

class User {
//  constructor(username, email, id) {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    // this._id = id ? new mongodb.ObjectID(id) : null;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });

    const updatedCartitems = [...this.cart.items];
    let newQuantity = 1;

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartitems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartitems.push(
      {productId: new ObjectID(product._id), quantity: newQuantity}  
      );
    }
    const updatedCart = {
      items: updatedCartitems
    };
       
    const db = getDb();
    return db
          .collection('users')
          .updateOne(
              {_id: new ObjectID(this._id)},
              {$set: {cart: updatedCart}}
              );
  }

  getCart() {
    const db = getDb();
    // array of productId in the cart
    const productIds = this.cart.items.map(i => {
      return i.productId;
    });

    return db
      .collection('products')
      .find({ _id: { $in: productIds }})
      .toArray()
      .then(products => {
        // return quantity of this product in cart
        return products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString();
            }).quantity
      };
    })
   });
  }

  deleteItemFromCart(productId) {
    const updatedCartitems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });

    // console.log('deletItemFromCart: ' + updatedCartitems.toString());
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectID(this._id)},
        { $set: { cart: {items: updatedCartitems}}}
      );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users')
    .findOne({_id: new mongodb.ObjectId(userId)})
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(err => {
      console.log(err);
    });
  }
}

module.exports = User;
