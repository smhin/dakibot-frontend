import { login } from '../ApiHelper/LoginApiHelper';


export default function LoginAction(data) {
    return login(data);
}
