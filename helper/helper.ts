

interface ProductObject {
    id:String,
    productName:String,
    productPrice:String,
    productImage:String,
    available:String
}

type ProductArray = ProductObject[]



class Helper {

    deleteProduct(productsArray:ProductArray,productId:String){
        let newProductArray = productsArray.reduce((newArray:ProductArray,product:ProductObject)=>{
            if (product.id !== productId){
              newArray.push(product);
            }
            return newArray;
        },[])
        return newProductArray;
    }
}

export default new Helper();