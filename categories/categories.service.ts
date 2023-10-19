import * as categoriesRepository from "./categories.repository.ts" 
import { Category } from "/categories/categories.types.ts";
import { Context } from "$oak/mod.ts";
import { ObjectId } from "$mongo/mod.ts";
import { CategoryDto } from "/categories/dto/category.dto.ts";
import { AppContext } from "/utils/types.ts";
import { getUserPersonData } from "/users/person/person.service.ts";
import { Person } from "/users/person/person.types.ts";


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
  const person = await getUserPersonData(userId)
  if (person === undefined) {
    context.throw(401);
  }

  const isCategory = await getCategoryByName(categoryDto.name)
  if(isCategory !== undefined) {
    context.throw(400, "category already exist");
  }

  const categoryData = categoryByDto(categoryDto, person);
  await categoriesRepository.insertCategory(categoryData);
  return {
    message: "add new category success"
  }
}

export const updateCategory = async (categoryData: Category, _id: string, context: AppContext): Promise<{message: string}> => {
  const categoryId = new ObjectId(_id)
  const userId = context.user?._id!;

  const person = await getUserPersonData(userId)
  if (person === undefined) {
    context.throw(401);
  }

  const category = await categoriesRepository.getCategoryById(categoryId)
  if (category === undefined) {
    context.throw(401)
  }
  categoryData.updated_by = person;
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

const categoryByDto = (categoryDto : CategoryDto, person: Person): Category => {
  const data: Category = {
    _id: new ObjectId(),
    name: categoryDto.name,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: {
      _id: person._id,
      name: person.name,
      bod: person.bod,
      phoneNumber: person.phoneNumber,
    } as Person,
    updated_by: {
      _id: person._id,
      name: person.name,
      bod: person.bod,
      phoneNumber: person.phoneNumber,
    } as Person
  }
  return data;
}