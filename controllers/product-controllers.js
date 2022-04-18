const Product = require("../Models/Product");
const Images = require("../Models/Images");

const addProduct = (req, res) => {
  const { name, price, quantity, description, ingredients, images } = req.body;

  const createdImages = new Images({
    images,
  });

  try {
    createdImages.save(async (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          message: "Error Saving Images",
        });
      } else {
        const createdProduct = new Product({
          name,
          price,
          quantity,
          description,
          ingredients,
          coverImage: images[0],
          imagesId: data._id,
        });

        await createdProduct.save((err) => {
          if (err) {
            console.log(err);
            res.json({
              success: false,
              message: "Error Saving Product",
            });
          } else {
            res.json({
              success: true,
              message: "Procuct Saved",
            });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error Saving ImagesS",
    });
  }
};

const editProduct = async (req, res) => {
  const {
    name,
    price,
    quantity,
    description,
    ingredients,
    images,
    imagesId,
    _id,
  } = req.body;

  try {
    let updatedProduct = await Product.updateOne(
      { _id: _id },

      {
        $set: {
          name,
          price,
          quantity,
          description,
          ingredients,
          coverImage: images[0],
        },
      },
      async function (err) {
        console.log(err);
        if (err) {
          res.json({
            success: false,
            message: "Something went wrong",
          });
          return;
        } else {
          await Images.updateOne(
            { _id: imagesId },
            {
              $set: { images: images },
            },
            async (err) => {
              if (err) {
                console.log(err);
                res.json({
                  success: false,
                  message: "Error updating images",
                });
                return;
              } else {
                res.json({
                  success: true,
                  message: "Product Updated",
                });
                return;
              }
            }
          );
        }
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error Saving ImagesS",
    });
  }
};

const deleteProduct = async (req, res) => {
  console.log(req.body);
  const { id, imagesId } = req.body;

  try {
    let ad = await Product.deleteOne({ _id: id });
    try {
      await Images.deleteOne({ _id: imagesId });
      res.json({ success: true, message: "Product deleted" });
      return;
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Deleteing Images Failed" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Deleteing Failed" });
    return;
  }
};

const getProductImages = async (req, res) => {
  console.log("getting");
  const images = await Images.findOne({ _id: req.body.id });
  // console.log(products);
  if (images) {
    res.json({
      success: true,
      images: images,
      message: "product images Found",
    });
  } else {
    res.json({
      success: false,
      message: "Error Finding Products",
    });
  }
};
const getProducts = async (req, res) => {
  console.log("getting");
  const products = await Product.find({});
  // console.log(products);

  res.json({
    success: true,
    products,
    message: "products Found",
  });
  // } else {
  //   res.json({
  //     success: false,
  //     message: "Error Finding Products",
  //   });
  // }
};

module.exports = {
  addProduct,
  getProducts,
  getProductImages,
  editProduct,
  deleteProduct,
};
