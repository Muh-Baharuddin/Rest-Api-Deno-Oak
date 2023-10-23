import * as categoriesRepository from "./categories.repository.ts" 
import { Category } from "/categories/categories.types.ts";
import { ObjectId } from "$mongo/mod.ts";
import { CategoryDto } from "/categories/dto/category.dto.ts";
import { AppContext } from "/utils/types.ts";
import { User } from "/users/users.types.ts";


export const getAllCategories = async (): Promise<Category[]> => {
  return await categoriesRepository.getAllCategories();
}

export const getCategoryById = async (_id: string, context: AppContext): Promise<Category> => {
  const categoryId = new ObjectId(_id);
  const category = await categoriesRepository.getCategoryById(categoryId);
  
  if(category === undefined) {
    context.throw(400, "category not found");
  }
  return category;
}

export const getCategoryByName = async (name: string): Promise<Category | undefined> => {
  return await categoriesRepository.getCategoryByName(name);
}

export const insertCategory = async (categoryDto: CategoryDto, context: AppContext): Promise<{ message: string}> => {
  const user = context.user;
  if (user === undefined) {
    context.throw(401);
  }

  const isCategory = await getCategoryByName(categoryDto.name)
  if(isCategory !== undefined) {
    context.throw(400, "category already exist");
  }

  const categoryData = categoryByDto(categoryDto, user);
  return await categoriesRepository.insertCategory(categoryData);
}

export const updateCategory = async (categoryData: Category, _id: string, context: AppContext): Promise<{message: string}> => {
  const user = context.user;
  if (user === undefined) {
    context.throw(401);
  }

  const isCategory = await getCategoryByName(categoryData.name)
  if(isCategory !== undefined) {
    context.throw(400, "category already exist");
  }

  const category = await getCategoryById(_id, context)
  categoryData.updated_by = user;
  categoryData.updated_at = new Date();
  return categoriesRepository.editCategory(categoryData, category._id);
}

export const removeCategory = async (_id: string, context: AppContext): Promise<{message: string}> => {
  const categoryId = new ObjectId(_id)
  const category = await categoriesRepository.getCategoryById(categoryId)
  
  if (category == undefined) {
    context.throw(400, "category not found")
  }
  return await categoriesRepository.deleteCategory(categoryId)
}

const categoryByDto = (categoryDto : CategoryDto, user: User): Category => {
  const data: Category = {
    _id: new ObjectId(),
    name: categoryDto.name,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: user,
    updated_by: user,
  }
  return data;
}