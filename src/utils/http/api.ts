export const Api = {
    loginModule: {
        login: "/dbdapi/getUserInfoByAccountAndPwd",
        verifyCode: "/dbdapi/login/getTokenId",//获取验证码ID
        verifyCodeImg: "/dbdapi/login/getVerify",//获取验证码图片
        checkVerifyCodeUrl: "/dbdapi/login/checkVerify",//获取验证码图片
    },
    home:{
        rootMenu: "/dbdapi/sys4a/dict/getDictByType",//获取资源菜单
        subMenu: "/dbdapi/sys4a/sysResource/getSysResourceByUser",//获取资源菜单
    }
};