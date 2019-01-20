<template>
    <div id="loginPage">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="24">
                        <div class="login-header">
                            <div class="title">百度基金系统</div>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-row type="flex" justify="center" align="center">
                    <el-col :span="1"></el-col>
                    <el-col :span="12">
                        <div class="left-con">
                            <img src="http://testdbd.baidu.com/upload/image/image20190104/4362f4d2-27da-41c6-989f-3e773780f4d0.png"
                                 alt="">
                        </div>
                    </el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="10">
                        <div class="login-form">
                            <el-container>
                                <el-header>
                                    <el-row height="50px" type="flex" align="center">
                                        <el-col :span="10">
                                            <div class="icon-header"></div>
                                        </el-col>
                                        <el-col :span="7">
                                            <div style="display: flex;align-items: center;height: 50px;">用户名密码登录</div>
                                        </el-col>
                                    </el-row>
                                </el-header>
                                <el-main>
                                    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                                        <el-form-item label="用户名" prop="username">
                                            <el-input v-model="form.username"></el-input>
                                        </el-form-item>
                                        <el-form-item label="密码" prop="password">
                                            <el-input v-model="form.password" type="password"></el-input>
                                        </el-form-item>
                                        <el-form-item label="验证码" prop="verifyCode">
                                            <el-row>
                                                <el-col :span="10">
                                                    <el-input placeholder="输入验证码" v-model="form.inputStr"></el-input>
                                                </el-col>
                                                <el-col :span="6">
                                                    <img :src="verifyCodeImg" alt="" @click="getVerifyCodeId">
                                                </el-col>
                                                <el-col :span="6">
                                                    <span style="color: red;">60s</span>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button size="medium" type="primary" @click="login">登&nbsp;&nbsp;陆</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-main>
                            </el-container>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import http, {APP_HOST} from "../utils/http/http";
    import {Api} from "@/utils/http/api";
    import {format} from "../utils/format";
    import {CacheUtils} from "../utils/cache-utils";

    @Component<LoginPage>({
        name: "login",
        watch: {
            'form.inputStr':function (val: any, oldVal: any) {
                if(val.length >= 4){
                    this.checkVerifyCode();
                }
            }
        }
    })
    export default class LoginPage extends Vue {

        // model:LoginSubmitModel;
        canLogin:boolean = false;

        constructor() {
            super();
            console.log("LoginPage 初始化完成");
        }

        data() {
            return {
                form: {
                    username: "admin",
                    password: "icss123456",
                    token: "",
                    inputStr: ""
                },
                verifyCodeImg: "http://testdbd.baidu.com/dbdapi/login/getVerify?token=a3c461f677da4c1382c4d1ef33876775&t=1547359975477",
                verifyCode: "",
                rules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"}
                    ],
                    verifyCode: [
                        // {required: true, message: "请输入验证码", trigger: "blur"},
                        {min: 4, max: 4, message: "长度必须为4位", trigger: "blur"}
                    ]
                }
            }
        }

        created() {
            console.log(this.$data);
            this.getVerifyCodeId();
        }

        //获取验证码ID
        getVerifyCodeId() {
            http.getNoToken(Api.loginModule.verifyCode).then(res => {
               console.log(res);
               if(res.code == "0"){
                   this.$data.form.token = res.data;
                   console.log(this.$data.form.token);
                   this.setVerifyCodeImgUrl(res.data);//拼接验证码图片地址
               }
            });
        }

        setVerifyCodeImgUrl(token: string) {
            this.$data.verifyCodeImg = APP_HOST + Api.loginModule.verifyCodeImg + "?token=" + token + "&t=" + new Date().getTime();
        }

        checkVerifyCode() {
            console.log(this.$data.form.inputStr);
            if (this.$data.form.inputStr.length >= 4) {
                http.getNoToken(Api.loginModule.checkVerifyCodeUrl,{inputStr: this.$data.form.inputStr,token: this.$data.form.token}).then(res => {
                    if(res.code == "0"){
                        this.canLogin = true;
                    }
                    else {
                        this.canLogin = false;
                        alert(res.msg);
                    }
                });
            }
        }

        login() {
            if(!this.canLogin){
                alert("验证码校验失败，请重新获取");
                return;
            }
           console.log(format.stringfy(this.$data.form));
            let loginUser = {
                username: this.$data.form.username,
                password: this.$data.form.password,
                token: this.$data.form.token,
                inputStr: this.$data.form.inputStr
            };
            http.postNoToken(Api.loginModule.login, "jsonData="+format.stringfy(loginUser)).then(res => {
                console.log(res);
                if(res.code == "0") {
                    CacheUtils.setToken(res.data.sessionToken);
                    this.$router.replace({name: "home"});
                }
            });

        }

    }

    class LoginSubmitModel {
        username:string;
        password: string;
        token: string;
        inputStr: string;
        constructor(){
                this.username = "";
                this.password = "";
                this.token = "";
                this.inputStr = "";
        }
        // constructor(username?:string, password?: string, token?: string, inputStr?: string){
        //     this.username = username;
        //     this.password = password;
        //     this.token = token;
        //     this.inputStr = inputStr;
        // }
    }

</script>

<style lang="scss" scoped>

    $height: 500px;

    .login-header {
        width: 100%;
        height: 50px;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-items: center;
    }

    .left-con {
        background-color: blue;
        height: $height;
    }

    .login-form {
        background-color: white;
        width: 100%;
        border: 1px solid #ccc;
        height: $height;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-form{
            width: 90%;
        }
        .icon-header{
            height: 50px;
            background: url("../assets/imgs/login/logo.jpg") no-repeat center;
        }
    }
</style>