import { AppContext } from "/utils/types.ts";
import { getAllUserAddress } from "/users/address/address.repository.ts";
import { Address } from "/users/users.types.ts";
import { getUserById } from "/users/users.repository.ts";


export const getAllAddress = async (_id: string, context: AppContext): Promise<Address[]> => {
  const user = await getUserById(_id)
  
  if (user == undefined) {
    context.throw(401)
  }
  return await getAllUserAddress(_id);
}