import { UserInfo } from "../Models/UserInfo";

export interface IUserService {
    getAllCustomers(): Promise<UserInfo[]>;
}