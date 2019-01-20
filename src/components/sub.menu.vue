<template>
    <div id="id_sub_menu" :style="{'background-color': themeColor}">
        <template v-if="subMenus.children.length > 0">
            <el-menu :background-color="themeColor" text-color="white" active-text-color="#40C9C6">
                <template v-for="(item, index) in subMenus.children">
                    <el-submenu v-if="item.haschild === '0'" :index="index+''">
                        <template slot="title">
                            <span slot="title">{{item.text}}</span>
                        </template>
                        <router-link v-for="(subItem, subIndex) in item.children" :to="subItem.link" append>
                            <el-menu-item :index="index+'-'+subIndex">
                                <!--<router-link :to="subItem.link">{{subItem.text}}</router-link>-->
                                {{subItem.text}}
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                    <router-link :to="item.link">
                        <el-menu-item v-if="item.haschild === '1'" :index="index+''" append>
                            <!--<router-link :to="item.link">{{item.text}}</router-link>-->
                            {{item.text}}
                        </el-menu-item>
                    </router-link>
                </template>
            </el-menu>
        </template>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {NavMenu} from "../models/nav-menu"

    @Component({
        name: "sub-menu",
        props: {
            subMenus: {
                type: NavMenu,
                require: true
            },
            themeColor:{
                type:String,
                default: "#333"
            }
        }
    })
    export default class SubMenu extends Vue {

        data(){
            return {
                menus: []
            }
        }

    }
</script>

<style lang="scss">
    #id_sub_menu{
        min-height: 700px;
    }
</style>