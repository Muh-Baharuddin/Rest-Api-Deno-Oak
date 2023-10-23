import { ObjectId } from "$mongo/mod.ts";
import { AppContext } from "/utils/types.ts";
import * as storeRepository from "./person.repository.ts"
import { Person } from "/users/person/person.types.ts";
import { PersonDto } from "/users/person/dto/person.dto.ts";

export const getUserPerson = async (_id: ObjectId): Promise<Person | undefined> => {
  return await storeRepository.getUserPersonAllData(_id);
}

export const addPerson = async (personDto: PersonDto, context: AppContext): Promise<{message: string}> => {
  const user = context.user;
  if (user == undefined) {
    context.throw(401)
  }
  const newPerson = createPersonByDto(personDto);
  return await storeRepository.addNewPerson(newPerson, user._id);
}

export const updatePerson = async (personDto: PersonDto, context: AppContext): Promise<{message: string}> => {
  const user = context.user;
  if (user == undefined) {
    context.throw(401)
  }

  let person = await getUserPerson(user._id);
  if (person == undefined) {
    person = createPersonByDto(personDto)
  } else {
    person = updatePersonData(personDto, person);
  }
  
  return storeRepository.editPerson(person, user._id);
}

export const removePerson = async (context: AppContext): Promise<{message: string}> => {
  const user = context.user;
  if (user == undefined) {
    context.throw(401)
  }

  const person = await getUserPerson(user._id);
  if (person == undefined) {
    context.throw(401, "person not found")
  }
  return await storeRepository.deletePerson(user._id)
}

const createPersonByDto = (personDto : PersonDto) => {
  const person: Person = {
    _id: new ObjectId(),
    created_at: new Date(),
    updated_at: new Date(),
    ...personDto,
    bod: new Date(personDto.bod),
  } ;

  return person;
}

const updatePersonData = (personDto : PersonDto, previousPerson: Person) => {
  const updatedPerson: Person = {
    ...personDto,
    bod: new Date(personDto.bod),
    created_at: previousPerson.created_at,
    updated_at: new Date(),
    _id: previousPerson._id,
  } ;
  return updatedPerson;
}
