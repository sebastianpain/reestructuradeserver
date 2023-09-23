import { Router } from "express";
import { UserController } from "../../controllers/users.controller.js";
import { generateUsers } from "../../utils/mocks.utils.js";
import { generateProduct } from "../../utils/mocks.utils.js";
const router = Router();



router.get("/", (req, res, next) => {
  try {
    let products = generateProduct(100);

    res.status(200).send({
      status: 200,
      response: products.response,
    });
  } catch (error) {
    next(error);
  }
});
router.get('/',UserController.getUsers);
router.get('/:uid',UserController.getUserById)
router.post('/',UserController.createUser)

export default router
