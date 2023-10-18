import { Item, PartialUser } from "/items/items.types.ts";
import * as itemRepository from "./items.repository.ts";
import { ItemDto } from "/items/dto/item.dto.ts";
import { ObjectId } from "$mongo/mod.ts";
import { Context } from "$oak/mod.ts";
import { findUserDataByid } from "/users/users.service.ts";
import { AppContext } from "/utils/types.ts";
import { getCategoryByName } from "/categories/categories.service.ts";

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

export const insertItem = async (itemDto: ItemDto, userId: ObjectId, context: Context): Promise<{ message: string}> => {
  const user = await findUserDataByid(userId)

  if (user == undefined) {
    context.throw(401);
  }
  const category = await getCategoryByName(itemDto.category.name, context)
  console.log("category", category)
  const itemData = itemByDto(itemDto, user);
  await itemRepository.insertItem(itemData);
  return {
    message: "add new item success"
  }
}

export const updateItem = async (itemData: Item, _id: string, context: AppContext): Promise<{message: string}> => {
  const itemId = new ObjectId(_id)
  const userId = context.user?._id!;
  const user = await findUserDataByid(userId)

  if (user == undefined) {
    context.throw(401)
  }
  const item = await itemRepository.getItemById(itemId)
  
  if (item == undefined) {
    context.throw(401)
  }
  itemData.updated_by = user.person?.name;
  itemData.updated_at = new Date();
  return itemRepository.itemEdit(itemData, itemId);
}

export const removeItem = async (_id: string, context: Context): Promise<{message: string}> => {
  const itemId = new ObjectId(_id)
  const item = await itemRepository.getItemById(itemId)
  
  if (item == undefined) {
    context.throw(401)
  }
  return await itemRepository.deleteItem(itemId)
}

const itemByDto = (itemDto : ItemDto, user: PartialUser): Item => {
  const data: Item = {
    _id: new ObjectId(),
    name: itemDto.name,
    price: itemDto.price,
    category: itemDto.category.name,
    user,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: user.person?.name,
    updated_by: user.person?.name,
  }
  return data
}