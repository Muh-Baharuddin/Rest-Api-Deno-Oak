import { Router } from "$oak/mod.ts";
import { uploadImage } from "/items/image/images.service.ts";
import { authMiddleware } from "/middlewares/jwt.ts";

const imageRouter = new Router();

imageRouter
  .post("/", authMiddleware, async (context) => {
    const body = context.request.body({ type: 'form-data'})
    const data = await body.value.read({ maxSize: 10000000 })

    const uploaded = await uploadImage(data);
    return context.response.body = uploaded;
  })

export default imageRouter;