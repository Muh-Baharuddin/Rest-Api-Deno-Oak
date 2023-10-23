import { Item } from "/items/items.types.ts";
import * as itemRepository from "./items.repository.ts";
import { ItemDto } from "/items/dto/item.dto.ts";
import { ObjectId } from "$mongo/mod.ts";
import { Context } from "$oak/mod.ts";
import { AppContext } from "/utils/types.ts";
import { getCategoryByName } from "/categories/categories.service.ts";
import { Category } from "/categories/categories.types.ts";
import { User } from "/users/users.types.ts";

export const getAllItems = async (): Promise<Item[]> => {
  return await itemRepository.getAllItems();
}

export const getItemById = async (_id: string, context: Context): Promise<Item> => {
  const itemId = new ObjectId(_id)
  const item = await itemRepository.getItemById(itemId);
  
  if(item === undefined) {
    context.throw(401);
  }
  return item;
}

export const insertItem = async (itemDto: ItemDto, context: AppContext): Promise<{ message: string}> => {
  const user = context.user;
  if (user == undefined) {
    context.throw(401);
  }

  const category = await Promise.all(itemDto.category.map(async (category) => {
    const isCategory = await getCategoryByName(category.name);
    if(isCategory === undefined) {
      context.throw(400, "category is not exist");
    }
    return isCategory;
  }))

  itemDto.category = category;
  const itemData = itemByDto(itemDto, user);
  await itemRepository.insertItem(itemData);
  return {
    message: "add new item success"
  }
}

export const updateItem = async (itemData: Item, _id: string, context: AppContext): Promise<{message: string}> => {
  const itemId = new ObjectId(_id)
  const user = context.user;
  if (user == undefined) {
    context.throw(401)
  }

  const item = await itemRepository.getItemById(itemId)
  if (item == undefined) {
    context.throw(400, "item not found")
  }

  const category = await Promise.all(itemData.category.map(async (category) => {
    const isCategory = await getCategoryByName(category.name);
    if(isCategory === undefined) {
      context.throw(400, "category is not exist");
    }
    return isCategory;
  }))

  itemData.category = category;
  itemData.updated_by = user;
  itemData.updated_at = new Date();
  return itemRepository.itemEdit(itemData, itemId);
}

export const removeItem = async (_id: string, context: Context): Promise<{message: string}> => {
  const itemId = new ObjectId(_id)
  const item = await itemRepository.getItemById(itemId)
  
  if (item == undefined) {
    context.throw(400, "item not found")
  }
  return await itemRepository.deleteItem(itemId)
}

const itemByDto = (itemDto : ItemDto, user: User): Item => {
  const data: Item = {
    _id: new ObjectId(),
    name: itemDto.name,
    price: itemDto.price,
    category: itemDto.category as Category[],
    created_at: new Date(),
    updated_at: new Date(),
    created_by: user,
    updated_by: user,
  }
  return data
}
