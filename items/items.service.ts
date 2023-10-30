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

  const imageUrl = itemData.image.map(image => {
    itemData.image = image.split("/").slice(3);
    const data = `${itemData.image[0]}/${itemData.image[1]}`;
    return data;
  });

  const category = await Promise.all(itemData.category.map(async (category) => {
    const isCategory = await getCategoryByName(category.name);
    if(isCategory === undefined) {
      context.throw(400, "category is not exist");
    }
    return isCategory;
  }))

  itemData.image = imageUrl;
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

const itemByDto = async (itemDto : ItemDto, user: User, context: AppContext): Promise<Item> => {
  const newImageUrl = itemDto.image.map(image => {
    itemDto.image = image.split("/").slice(3);
    const data = `${itemDto.image[0]}/${itemDto.image[1]}`;
    return data;
  });

  const itemCategory = await Promise.all(itemDto.category.map(async (category: {name: string}): Promise<Category> => {
    const isCategory = await getCategoryByName(category.name);
    if(isCategory === undefined) {
      context.throw(400, "category is not exist");
    }
    return isCategory;
  }))

  const data: Item = {
    _id: new ObjectId(),
    name: itemDto.name,
    price: itemDto.price,
    image: newImageUrl,
    category: itemCategory,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: user,
    updated_by: user,
  }
  return data
}
