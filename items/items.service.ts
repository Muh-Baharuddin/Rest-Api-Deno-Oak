import { Item, PartialUser } from "/items/items.types.ts";
import * as itemRepository from "./items.repository.ts";
import { ItemDto } from "/items/dto/item.dto.ts";
import { ObjectId } from "$mongo/mod.ts";
import { Context } from "$oak/mod.ts";
import { findByid } from "/users/users.service.ts";

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
  const user = await findByid(userId)

  if (user == undefined) {
    context.throw(401);
  }

  const itemData = itemByDto(itemDto, user);
  await itemRepository.insertItem(itemData);
  return {
    message: "add new item success"
  }
}

const itemByDto = (itemDto : ItemDto, user: PartialUser): Item => {
  const data: Item = {
    _id: new ObjectId(),
    name: itemDto.name,
    price: itemDto.price,
    category: itemDto.category.map((categoryDto: {name: string}) => {
      return {
        _id: new ObjectId(),
        name: categoryDto.name,
      };
    }),
    user,
    created_at: new Date(),
    updated_at: new Date(),
  }
  return data
}