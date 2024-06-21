import {Role} from "/src/axios/api/type/Role.ts";
import {User} from "/src/axios/api/type/User.ts";

export class UserInfo {
    permissions: string[];
    roles: Role[];
    user: User;

    constructor(permissions: string[], roles: Role[], user: User) {
        this.permissions = permissions;
        this.roles = roles;
        this.user = user;
    }
}