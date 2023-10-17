import { ObjectId } from "$mongo/mod.ts";
import { AppContext } from "/utils/types.ts";
import * as storeRepository from "./person.repository.ts"
import { Person } from "/users/person/person.types.ts";
import { findByid } from "/users/users.service.ts";
import { PersonDto } from "/users/person/dto/person.dto.ts";

export const getUserPerson = async (_id: ObjectId, context: AppContext): Promise<Person> => {
  const user = await findByid(_id)
  
  if (user == undefined) {
    context.throw(401)
  }
  return await storeRepository.getUserPerson(_id);
}

export const addPerson = async (person: PersonDto, _id: ObjectId, context: AppContext): Promise<{message: string}> => {
  const user = await findByid(_id)

  if (user == undefined) {
    context.throw(401)
  }
  const newPerson = createPersonByDto(person);
  return await storeRepository.addNewPerson(newPerson, _id);
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