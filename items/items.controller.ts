import { Router } from "$oak/mod.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { Item } from "/items/items.types.ts";
import { getAllItems, getItemById, insertItem, removeItem, updateItem } from "/items/items.service.ts";
import { validate } from "/middlewares/validate.ts";
import { ItemDto, itemValidate } from "/items/dto/item.dto.ts";
import { AppContext } from "/utils/types.ts";
import imageRouter from "./image/images.controller.ts";

const itemsRouter = new Router();

itemsRouter.use("/image", imageRouter.routes(), imageRouter.allowedMethods());

itemsRouter
  .get("/", authMiddleware ,async (context): Promise<Item[]> => {
    const allItems = await getAllItems()
    return context.response.body = allItems;
  })
  .get("/:id", authMiddleware ,async (context): Promise<Item> => {
    const itemId = context.params.id;
    const item = await getItemById(itemId, context)
    return context.response.body = item;
  })
  .post("/", authMiddleware, validate(itemValidate), async (context: AppContext) : Promise<{ message: string}> => {
    const item: ItemDto = await context.request.body().value;
    const newItem = await insertItem(item, context);
    return context.response.body = newItem;
  })
  .put("/:id", authMiddleware, validate(itemValidate), async(context): Promise<{message: string}> => {
    const itemId = context.params.id;
    const itemData: Item = await context.request.body().value;
    const updateData = await updateItem(itemData, itemId, context);
    return context.response.body = updateData;
  })
  .delete("/:id", authMiddleware, async(context) : Promise<{ message: string}> => {
    const itemId = context?.params?.id;
    const deleted = await removeItem(itemId, context);
    return context.response.body = deleted;
  });

export default itemsRouter;