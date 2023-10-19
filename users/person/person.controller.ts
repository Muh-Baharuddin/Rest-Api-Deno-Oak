import { Router } from "$oak/mod.ts";
import { AppContext } from "/utils/types.ts";
import { authMiddleware } from "/middlewares/jwt.ts";
import { Person } from "./person.types.ts";
import { addPerson, getUserPersonAllData, removePerson, updatePerson } from "/users/person/person.service.ts";
import { validate } from "/middlewares/validate.ts";
import { PersonDto, personValidate } from "/users/person/dto/person.dto.ts";

const personRouter = new Router();

personRouter
  .get("/", authMiddleware ,async (context: AppContext): Promise<Person | undefined> => {
    const userid = context?.user?._id!;
    const userProfile = await getUserPersonAllData(userid, context)
    return context.response.body = userProfile;
  })
  .post("/", authMiddleware, validate(personValidate), async (context: AppContext) : Promise<{ message: string}> => {
    const personDto: PersonDto = await context.request.body().value;
    const userid = context?.user?._id!;
    const person = await addPerson(personDto, userid, context);
    return context.response.body = person;
  })
  .put("/", authMiddleware, validate(personValidate), async (context: AppContext) : Promise<{ message: string}> => {
    const person: Person = await context.request.body().value;
    const userid = context?.user?._id!;
    const updatedPerson = await updatePerson(person, userid, context);
    return context.response.body = updatedPerson;
  })
  .delete("/", authMiddleware, async(context: AppContext) : Promise<{ message: string}> => {
    const userid = context?.user?._id!;
    const deleted = await removePerson(userid, context);
    return context.response.body = deleted;
  });

export default personRouter;