import { Router } from "$oak/mod.ts";
import { Category } from "/categories/categories.types.ts";
import { getAllCategories, getCategoryById, insertCategory, removeCategory, updateCategory } from "/categories/categories.service.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { validate } from "/middlewares/validate.ts";
import { CategoryDto, categoryValidate } from "/categories/dto/category.dto.ts";
import { AppContext } from "/utils/types.ts";


const categoriesRouter = new Router();

categoriesRouter
  .get("/", authMiddleware ,async (context): Promise<Category[]> => {
    const allCategories = await getAllCategories()
    return context.response.body = allCategories;
  })
  .get("/:id", authMiddleware ,async (context): Promise<Category> => {
    const categoryId = context.params.id;
    const category = await getCategoryById(categoryId, context)
    return context.response.body = category;
  })
  .post("/", authMiddleware, validate(categoryValidate), async (context: AppContext) : Promise<{ message: string}> => {
    const categoryDto: CategoryDto = await context.request.body().value;
    const userid = context?.user?._id!;
    const newCategory = await insertCategory(categoryDto, userid, context);
    return context.response.body = newCategory;
  })
  .put("/:id", authMiddleware, validate(categoryValidate), async (context) : Promise<{ message: string}> => {
    const category: Category = await context.request.body().value;
    const categoryId = context.params.id!;
    const newCategory = await updateCategory(category, categoryId, context);
    return context.response.body = newCategory;
  })
  .delete("/:id", authMiddleware, async(context) : Promise<{ message: string}> => {
    const categoryId = context?.params?.id;
    const deleted = await removeCategory(categoryId, context);
    return context.response.body = deleted;
  });

export default categoriesRouter;