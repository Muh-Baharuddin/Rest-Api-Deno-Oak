// import { AppContext } from "/utils/types.ts";
// import { Person } from "/person/person.types.ts";
// import { validate } from "./middlewares/validate.ts";

// export const checkPerson = async (userData: User): Promise<Person> => {
//   return;
// }

// export const checkUserPersonId = async (userId: string, personId: string, context: AppContext): Promise<Person> => {
//   const user = await getUserById(userId);
  
//   if (user == undefined) {
//     context.throw(401);
//   }

//   if (user.person?._id !== personId) {
//     context.throw(401);
//   }

//   return user.person;
// }