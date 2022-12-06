import { Profile } from "./profile.model";
import { Role } from "./role";

export class User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    id_role?: number;
    token?: string;
    role?: Role;
    profile?: Profile
}
