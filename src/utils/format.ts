export const format = {
    stringfy(data:any):string{
        return JSON.stringify(data);
    },
    parse(data:string):any {
        return JSON.parse(data);
    }
};