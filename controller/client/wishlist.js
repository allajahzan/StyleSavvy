const Product = require('../../model/admin/product')
const Varient = require('../../model/admin/varient')
const User = require('../../model/user/user')
const Cart = require('../../model/user/cart')
const Wishlist = require('../../model/user/wishlist')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// add items to wishlist

exports.addToWishlist = async (req, res) => {
    try {
        const { vId, sizeId } = req.body;

        const token = req.session.user;
        const isTokenValid = jwt.verify(token, process.env.userSecretCode);
        const userId = isTokenValid.id;

        // Find the user's wishlist
        let wishlist = await Wishlist.findOne({ customerId: userId });

        // If no wishlist exists, create a new one
        if (!wishlist) {
            wishlist = new Wishlist({ customerId: userId, items: [] });
        }

        // Check if the item is already in the wishlist
        const isItemAvailable = wishlist.items.some(item =>
            item.varient.equals(vId) && item.size.equals(sizeId)
        );

        if (isItemAvailable) {
            // If the item is available, remove it from the wishlist
            wishlist.items = wishlist.items.filter(item => !(item.varient.equals(vId) && item.size.equals(sizeId)));
            await wishlist.save();
            const wish = await Wishlist.findOne({ customerId: userId });
            let count;
            wish? count = wish.items.length : count = 0;
            return res.status(200).json({ msg: 'Item removed from wishlist', type: 'success' , count:count});
        }

        // If the item is not available, add it to the wishlist
        wishlist.items.push({ varient: vId, size: sizeId });
        await wishlist.save();
        return res.status(200).json({ msg: 'Item added to wishlist', type: 'success' });

    } catch (err) {
        console.log(err);
        res.status(500).end()
    }
};

// get wishlist page

exports.getWishlistPage = async(req,res)=>{
    try{

        if (!req.session.user) {
            delete req.session.userName
            delete req.session.user
            return res.redirect('/signIn')
          }
        
          const token = req.session.user;
          const isTokenValid = jwt.verify(token, process.env.userSecretCode)
          if (!isTokenValid) {
            delete req.session.userName
            delete req.session.user
            return res.redirect('/signIn')
          }
          const user = await User.findById(isTokenValid.id)
          if (!user) {
            delete req.session.userName
            delete req.session.user
            return res.redirect('/signIn')
          }
        
          if(user.isBlocked){
            delete req.session.userName
            delete req.session.user
            return res.redirect('/signIn')
          }

        const userId = isTokenValid.id;
        // Perform aggregation to lookup variant and size data
        const wishlist = await Wishlist.aggregate([
            { 
                $match: { customerId: new ObjectId(userId) }
            },
            { 
                $unwind: "$items" 
            },
            { 
                $lookup: {
                    from: "sizes",
                    localField: "items.size",
                    foreignField: "_id",
                    as: "items.size"
                }
            },
            { 
                $unwind: "$items.size" 
            },
            { 
                $lookup: {
                    from: "varients",  // Adjust this to the correct collection name for varients
                    localField: "items.varient",
                    foreignField: "_id",
                    as: "items.varient"
                }
            },
            { 
                $unwind: "$items.varient" 
            },
            { 
                $lookup: {
                    from: "products",
                    localField: "items.varient.product",
                    foreignField: "_id",
                    as: "items.varient.product"
                }
            },
            { 
                $unwind: "$items.varient.product" 
            },
            { 
                $lookup: {
                    from: "types",
                    localField: "items.varient.product.type",
                    foreignField: "_id",
                    as: "items.varient.product.type"
                }
            },
            { 
                $unwind: "$items.varient.product.type" 
            },
            { 
                $lookup: {
                    from: "categories",
                    localField: "items.varient.product.category",
                    foreignField: "_id",
                    as: "items.varient.product.category"
                }
            },
            { 
                $unwind: "$items.varient.product.category" 
            },
            { 
                $lookup: {
                    from: "colors",
                    localField: "items.varient.color",
                    foreignField: "_id",
                    as: "items.varient.color"
                }
            },
            { 
                $unwind: "$items.varient.color" 
            },
            // { 
            //     $lookup: {
            //         from: "sizes",
            //         localField: "items.varient.size",
            //         foreignField: "_id",
            //         as: "items.varient.size"
            //     }
            // },
            { 
                $project: {
                    "customerId": 1,
                    "items._id":1,
                    "items.varient._id":1,
                    "items.varient.product.product_name": 1,
                    "items.varient.product.type.type_name": 1,
                    "items.varient.product.category.category_name": 1,
                    "items.varient.color.color_name": 1,
                    "items.varient.stock": 1,
                    "items.varient.size":1,
                    "items.varient.images":1,
                    "items.varient.actualPrice":1,
                    "items.size": 1
                }
            }, 
            { 
                $group: {
                    _id: "$_id",
                    customerId: { $first: "$customerId" },
                    items: { $push: "$items" }
                }
            }
        ]);
           
     


        // console.log(wishlist[0]);
        if (wishlist.length === 0) {
            return res.render('wishlist', {user, wishlist})
        }
    
        let items = []
        wishlist[0].items.forEach(item => {
            const index = item.varient.size.findIndex(sizeDetail => sizeDetail.equals(item.size._id));
            const stock = item.varient.stock[index]

            items.push({
                _id:item._id,
                varientId : item.varient._id, 
                product_name:item.varient.product.product_name ,
                image: item.varient.images[0],
                type:item.varient.product.type.type_name,
                category:item.varient.product.category.category_name,
                color:item.varient.color.color_name,
                size:item.size.size_name,
                sizeId:item.size._id,
                stock:stock,
                price:item.varient.actualPrice
            })
        });

        res.render('wishlist', {user, wishlist:items})

    }catch(err){
     console.log(err);
     res.render('500')
    }
}
