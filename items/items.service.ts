import { Item } from "/items/items.types.ts";
import * as itemRepository from "./items.repository.ts";
import { ItemDto } from "/items/dto/item.dto.ts";
import { ObjectId } from "$mongo/mod.ts";
import { Context } from "$oak/mod.ts";
import { AppContext } from "/utils/types.ts";
import { getCategoryByName } from "/categories/categories.service.ts";
import { User } from "/users/users.types.ts";

export const getAllItems = async (): Promise<Item[]> => {
  const items = await itemRepository.getAllItems();

  items.map((item) => {
    const newUrl = item.image.map(url => {
      const newUrl = `https://i.ibb.co/${url}`;
      return newUrl;
    })
    item.image = newUrl;
    return item;
  })

  return items;
}

export const getItemById = async (_id: string, context: Context): Promise<Item> => {
  const itemId = new ObjectId(_id)
  const item = await itemRepository.getItemById(itemId);
  
  if(item === undefined) {
    context.throw(400, "item not found");
  }

  item.image = await Promise.all(item.image.map(url => {
    const newUrl = `https://i.ibb.co/${url}`;
    return newUrl;
  }))
  return item;
}

export const insertItem = async (itemDto: ItemDto, context: AppContext): Promise<{ message: string}> => {
  const user = context.user;
  if (user == undefined) {
    context.throw(401);
  }

  const item = await itemByDto(itemDto, user, context);
  await itemRepository.insertItem(item);
  return {
    message: "add new item success"
  }
}

export const updateItem = async (itemDto: ItemDto, _id: string, context: AppContext): Promise<{message: string}> => {
  const itemId = new ObjectId(_id)
  const user = context.user;
  if (user == undefined) {
    context.throw(401)
  }

  const item = await itemRepository.getItemById(itemId)
  if (item == undefined) {
    context.throw(400, "item not found")
  }

  item.updated_by = user;
  const updatedItem = await updateItemByDto(itemDto, item, context);

  return itemRepository.itemEdit(updatedItem, itemId);
}

export const removeItem = async (_id: string, context: Context): Promise<{message: string}> => {
  const itemId = new ObjectId(_id)
  const item = await itemRepository.getItemById(itemId)
  
  if (item == undefined) {
    context.throw(400, "item not found")
  }
  return await itemRepository.deleteItem(itemId)
}

const itemByDto = async (itemDto : ItemDto, user: User, context: AppContext): Promise<Item> => {
  const imageUrl = itemDto.image.map(image => {
    itemDto.image = image.split("/").slice(3);
    const data = `${itemDto.image[0]}/${itemDto.image[1]}`;
    return data;
  });

  const itemCategory = await Promise.all(itemDto.category.map(async (category) => {
    const isCategory = await getCategoryByName(category);
    if(isCategory === undefined) {
      context.throw(400, "category is not exist");
    }
    return isCategory._id;
  }))

  const data: Item = {
    _id: new ObjectId(),
    name: itemDto.name,
    price: itemDto.price,
    image: imageUrl,
    category: itemCategory,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: user,
    updated_by: user,
  }
  return data
}

const updateItemByDto = async (itemDto : ItemDto, itemData: Item, context: AppContext) => {
  const imageUrl = itemDto.image.map(image => {
    itemDto.image = image.split("/").slice(3);
    const data = `${itemDto.image[0]}/${itemDto.image[1]}`;
    return data;
  });
  
  const itemCategory = await Promise.all(itemDto.category.map(async (category) => {
    const isCategory = await getCategoryByName(category);
    if(isCategory === undefined) {
      context.throw(400, "category is not exist");
    }
    return isCategory._id;
  }))

  const item: Item = {
    _id: itemData._id,
    name: itemDto.name,
    price: itemDto.price,
    image: imageUrl,
    category: itemCategory,
    created_at: itemData.created_at,
    updated_at: new Date(),
    created_by: itemData.created_by,
    updated_by: itemData.updated_by,
  }
  return item
}