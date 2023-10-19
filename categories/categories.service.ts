import * as categoriesRepository from "./categories.repository.ts" 
import { Category } from "/categories/categories.types.ts";
import { Context } from "$oak/mod.ts";
import { ObjectId } from "$mongo/mod.ts";
import { CategoryDto } from "/categories/dto/category.dto.ts";
import { findUserDataByid } from "/users/users.service.ts";
import { PartialUser } from "/items/items.types.ts";
import { AppContext } from "/utils/types.ts";


export const getAllCategories = async (): Promise<Category[]> => {
  return await categoriesRepository.getAllCategories();
}

export const getCategoryById = async (_id: string, context: Context): Promise<Category> => {
  const categoryId = new ObjectId(_id);
  const category = await categoriesRepository.getCategoryById(categoryId);
  
  if(category === undefined) {
    context.throw(401);
  }
  return category;
}

export const getCategoryByName = async (name: string): Promise<Category | undefined> => {
  return await categoriesRepository.getCategoryByName(name);
}

export const insertCategory = async (categoryDto: CategoryDto, userId: ObjectId, context: Context): Promise<{ message: string}> => {
  const user = await findUserDataByid(userId)

  if (user == undefined) {
    context.throw(401);
  }

  const categoryData = categoryByDto(categoryDto, user);
  await categoriesRepository.insertCategory(categoryData);
  return {
    message: "add new category success"
  }
}

export const updateCategory = async (categoryData: Category, _id: string, context: AppContext): Promise<{message: string}> => {
  const categoryId = new ObjectId(_id)
  const userId = context.user?._id!;
  const user = await findUserDataByid(userId)

  if (user == undefined) {
    context.throw(401)
  }
  const category = await categoriesRepository.getCategoryById(categoryId)
  
  if (category == undefined) {
    context.throw(401)
  }
  categoryData.updated_by = user.person!;
  categoryData.updated_at = new Date();
  return categoriesRepository.editCategory(categoryData, categoryId);
}

export const removeCategory = async (_id: string, context: Context): Promise<{message: string}> => {
  const categoryId = new ObjectId(_id)
  const category = await categoriesRepository.getCategoryById(categoryId)
  
  if (category == undefined) {
    context.throw(401)
  }
  return await categoriesRepository.deleteCategory(categoryId)
}

const categoryByDto = (categoryDto : CategoryDto, user: PartialUser): Category => {
  const data: Category = {
    _id: new ObjectId(),
    name: categoryDto.name,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: user.person!,
    updated_by: user.person!,
  }
  return data;
}