export class UserRoleMenu {
    menuId: number;
    roleId: number;
    userId: number;

    constructor(userId: number, roleId: number, menuId: number) {
        this.userId = userId;
        this.roleId = roleId;
        this.menuId = menuId;
    }
}