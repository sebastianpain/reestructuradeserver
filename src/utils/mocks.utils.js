import { faker } from "@faker-js/faker";
import { errorResponse } from "./recursos.js";
import bcrypt from 'bcrypt';

export const createHash = async password =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}
export const passwordValidation = async (user,password) => bcrypt.compare(password,user.password);
export const generateProduct = (quantity) => {
    if (!quantity)
      CustomError.createError({
        status: EErrors.SERVER_ERROR,
        response: "Quantity of products is not defined",
      });
    let products = [];
    for (let index = 0; index < quantity; index++) {
      let newProduct = {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        code: faker.string.numeric(1),
        status: true,
        stock: faker.string.numeric(1),
        thumbnail: faker.image.url(),
      };
      products.push(newProduct);
    }
    return {
      status: 200,
      response: products,
    };
  }; 

export const generateUsers=()=>{
    const totalProducts= faker.number.int({min : 10, max: 100})
    const products = Array.from ({length:totalProducts},()=>generateProducts())

    return{
        id:faker.database.mongodbObjectId(),
        name:faker.person.firstName(),
        last_name: faker.person.lastName(),
        email:faker.internet.email(),
        gender:faker.person.gender(),
        phone: faker.phone.number(),
        image:faker.image.avatarGitHub(),
    }
}