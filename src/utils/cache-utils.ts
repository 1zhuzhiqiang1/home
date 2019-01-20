export const CacheUtils = {
    setToken(token:string) {
        sessionStorage.setItem('sessionToken', token);
    },
    getToken():string | null {
        return sessionStorage.getItem('sessionToken');
    },
    setMenus(menus:string) {
        sessionStorage.setItem('menus', menus);
    },
    getMenus():string | null {
        return sessionStorage.getItem('menus');
    },
};