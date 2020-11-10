const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
   honey: {
        id: { type: Number },
        name: {type: String, required: true},
        description: {type: String, required: true},
        price: { type: mongoose.Types.Decimal128, required: true },
        imgSrc: {type: String, required: true},
        imgAlt: {type: String, required: true},
        bestSeller: {type: Boolean, required: true, default: false}
   },
   masonJar: {
      id: { type: Number },
      name: {type: String, required: true},
      description: {type: String, required: true},
      price: { type: mongoose.Types.Decimal128, required: true },
      imgSrc: {type: String, required: true},
      imgAlt: {type: String, required: true},
      bestSeller: {type: Boolean, required: true, default: false}
   },
   shirt: {
      id: { type: Number },
      name: {type: String, required: true},
      description: {type: String, required: true},
      price: { type: mongoose.Types.Decimal128, required: true },
      imgSrc: {type: String, required: true},
      imgAlt: {type: String, required: true},
      bestSeller: {type: Boolean, required: true, default: false}
   },
   cider: {
      id: { type: Number },
      name: {type: String, required: true},
      description: {type: String, required: true},
      price: { type: mongoose.Types.Decimal128, required: true },
      imgSrc: {type: String, required: true},
      imgAlt: {type: String, required: true},
      bestSeller: {type: Boolean, required: true, default: false}
   },
   candy: {
      id: { type: Number },
      name: {type: String, required: true},
      description: {type: String, required: true},
      price: { type: mongoose.Types.Decimal128, required: true },
      imgSrc: {type: String, required: true},
      imgAlt: {type: String, required: true},
      bestSeller: {type: Boolean, required: true, default: false}
   },
   soap: {
      id: { type: Number },
      name: {type: String, required: true},
      description: {type: String, required: true},
      price: { type: mongoose.Types.Decimal128, required: true },
      imgSrc: {type: String, required: true},
      imgAlt: {type: String, required: true},
      bestSeller: {type: Boolean, required: true, default: false}
 }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;