import { ObjectId } from "$mongo/mod.ts";
import { AppContext } from "/utils/types.ts";
import * as storeRepository from "./person.repository.ts"
import { Person } from "/users/person/person.types.ts";
import { findUserByid, findUserDataByid } from "/users/users.service.ts";
import { PersonDto } from "/users/person/dto/person.dto.ts";

export const getUserPersonAllData = async (_id: ObjectId, context: AppContext): Promise<Person | undefined> => {
  const user = await findUserByid(_id)
  if (user == undefined) {
    context.throw(401)
  }
  return await storeRepository.getUserPersonAllData(_id);
}

export const getUserPersonData = async (_id: ObjectId): Promise<Person | undefined> => {
  return await storeRepository.getUserPersonData(_id);
}

export const addPerson = async (person: PersonDto, _id: ObjectId, context: AppContext): Promise<{message: string}> => {
  const user = await findUserByid(_id)
  if (user == undefined) {
    context.throw(401)
  }
  const newPerson = createPersonByDto(person);
  return await storeRepository.addNewPerson(newPerson, _id);
}

export const updatePerson = async (person: Person, _id: ObjectId, context: AppContext): Promise<{message: string}> => {
  const user = await findUserDataByid(_id)
  
  if (user == undefined) {
    context.throw(401)
  }
  person._id = user.person?._id!;
  person.created_at = user.person?.created_at!;
  person.updated_at = new Date();
  return storeRepository.editPerson(person, _id);
}

export const removePerson = async (_id: ObjectId, context: AppContext): Promise<{message: string}> => {
  const user = await findUserByid(_id)
  
  if (user == undefined) {
    context.throw(401)
  }
  return await storeRepository.deletePerson(_id)
}

export const createPersonByDto = (personDto : PersonDto) => {
  const person: Person = {
    _id: new ObjectId(),
    created_at: new Date(),
    updated_at: new Date(),
    ...personDto,
  } ;

  return person;
}
