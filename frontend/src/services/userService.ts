import { User } from "../models/User";
import { api } from "./api";

export type UserLoginPayload = {
  email: string;
  password: string;
};
interface ILoginResponse {
  accessToken: string;
}
function login(data: UserLoginPayload) {
  return api.post<ILoginResponse>("/sessions", data);
}

export type UserSignupPayload = {
	email: string;
	password: string;
	name: string;
	cpf: string;
	phone: string;
	role: string;
};
async function signup(data: UserSignupPayload) {
  return api.post("/users", data);
}

interface MeResponse {
  user: User;
}
function me() {
  return api.get<MeResponse>("/users/profile");
}
export const userService = {
  login,
  signup,
  me,
};
