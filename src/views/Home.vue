<template>
    <div class="home">
        <div style="position: fixed;z-index: 100;width: 100%">
            <el-container>
                <el-header>
                    <home-menu :theme-color="themeColor" :menus="menus" @homeMenuEvent="getSubmenus"></home-menu>
                </el-header>
            </el-container>
        </div>
        <template>
            <el-container>
                <el-aside v-if="subMenus.children.length > 0" width="200px">
                    <sub-menu :theme-color="themeColor" :sub-menus="subMenus"></sub-menu>
                </el-aside>
                <el-main style="margin-top: 60px;">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </template>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import HelloWorld from '@/components/HelloWorld.vue';
    import QrCode from "@/components/qrcode.component.vue";
    import HomeMenu from "@/components/home.menu.vue";
    import http from "@/utils/http/http"; // @ is an alias to /src
    import {Api} from "@/utils/http/api"; // @ is an alias to /src
    import {CacheUtils} from "../utils/cache-utils";
    import {NavMenu} from "../models/nav-menu";
    import SubMenu from "../components/sub.menu.vue";
    import $ from "jquery";
    import {format} from "../utils/format";

    @Component({
        components: {
            SubMenu,
            HomeMenu,
            QrCode,
            HelloWorld,
        }
    })
    export default class Home extends Vue {

        constructor(){
            super();
            // console.log($);
        }

        data() {
            return {
                menus: [],
                subMenus: new NavMenu(),
                themeColor:"#394551"
            }
        }

        beforeRouteEnter (to:any, from:any, next:any) {
            console.log("to: "+to);
        }

        created(){
            this.getAllMenus();
        }

        getAllMenus() {
            if(CacheUtils.getMenus() != null){
                let array:NavMenu[] = format.parse(CacheUtils.getMenus()||"[]");
                this.$data.menus = array;
                return;
            }
            http.get(Api.home.rootMenu+"?type=RESOURCE_TYPE_ANYWARE").then(res => {
                let rootMenu = res.data[0];
                // console.log(rootMenu);
                let subMenus;
                http.get(Api.home.subMenu+"?userNo=").then(res => {
                    subMenus = res.data;
                    this.resolveMenus(rootMenu.codeValue, subMenus);
                });
            });
        }

        resolveMenus(rootMenuCode:string, subMenus:any[]){
            let rootResources = subMenus.filter(t => t.parentCode == rootMenuCode).sort((n1, n2) => {
                if (+n1.sort > +n2.sort) {
                    return 1;
                }
                if (+n1.sort < +n2.sort) {
                    return -1;
                }
                return 0
            });
            console.log(rootResources);
            let menus:NavMenu[] = [];
            //第一层
            rootResources.forEach(e => {
                let menu:NavMenu = new NavMenu();
                menu.code = e.resourceCode;
                menu.icon = 'icon-home';
                menu.link = e.href;
                menu.text = e.name;
                let childrens = subMenus.filter(x => {
                    if(x.parentCode == e.resourceCode){
                        // x.href  = e.href + "/" + x.href;
                        return true;
                    }
                    return false;
                }).sort((n1, n2) => {
                    if (+n1.sort > +n2.sort) {
                        return 1
                    }
                    if (+n1.sort < +n2.sort) {
                        return -1;
                    }
                    return 0
                });
                if (childrens) {
                    menu.children = [];
                    //第二层
                    childrens.forEach(c => {
                        let tmenu = new NavMenu();
                        tmenu.code = c.resourceCode;
                        tmenu.icon = 'icon-home';
                        tmenu.link = c.href;
                        tmenu.text = c.name;
                        tmenu.haschild = '1';
                        let grandchildrens = subMenus.filter(y => {
                            if(y.parentCode == c.resourceCode && y.resourceTypeName == '菜单'){
                                // y.href  = c.href + "/" +y.href;
                                return true;
                            }
                            return false;
                        }).sort((n1, n2) => {
                            if (+n1.sort > +n2.sort) {
                                return 1
                            }
                            if (+n1.sort < +n2.sort) {
                                return -1;
                            }
                            return 0
                        });
                        if (grandchildrens && grandchildrens.length > 0) {
                            tmenu.children = [];
                            //第三层
                            grandchildrens.forEach(third => {
                                let gmenu = new NavMenu();
                                gmenu.code = third.resourceCode;
                                gmenu.icon = 'icon-home';
                                gmenu.link = third.href;
                                gmenu.text = third.name;
                                //console.log('======' + third.name);
                                tmenu.children.push(gmenu);
                                tmenu.haschild = '0';
                            });
                        }
                        menu.children.push(tmenu);
                    });
                }
                menus.push(menu);
            });
            this.$data.menus = menus;
            CacheUtils.setMenus(JSON.stringify(menus));
        }

        getSubmenus(subMenus: NavMenu) {
            console.log("从子组件传递过来的属性");
            console.log(subMenus);
            $("#id_sub_menu").hide();
            this.$data.subMenus = subMenus;
            setTimeout(()=>{$("#id_sub_menu").fadeIn();},100);
        }

    }
</script>

<style lang="scss" scoped>

    .home{

    }

</style>