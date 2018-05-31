import {createUser, getUser} from "../ApiHelper/UserApiHelper";


export function GetUserAction(userId) {
    return getUser(userId);
}

export function CreateUserAction(data) {
  return createUser(data);
}
