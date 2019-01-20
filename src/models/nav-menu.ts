export class NavMenu {
    code:string = "";
    icon:string = "";
    text:string = "";
    link:string = "";
    haschild:string = "";//加一个判断是否有下级的一个type..0：有1：没有
    children:NavMenu[] = [];
}