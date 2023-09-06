import { Router } from "express";
import { UserController } from "../../controllers/users.controller.js";

const router = Router()

router.get('/',UserController.getUsers);
router.get('/:uid',UserController.getUserById)
router.post('/',UserController.createUser)

export default router