<template>

    <div id="id_home_menu">
        <el-menu default-active="0" mode="horizontal" :background-color="themeColor" text-color="white" active-text-color="#40C9C6">
            <el-menu-item v-for="(item, index) in menus" :index="index+''" @click="clickMenu(item)">
                {{item.text}}
            </el-menu-item>
        </el-menu>
    </div>

</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {NavMenu} from "../models/nav-menu";
    import {EventNames} from "../utils/event";

    @Component({
        name: "home-menu",
        props: {
            menus: {
                type: Array,
                require: true
            },
            themeColor:{
                type:String,
                default: "#333"
            }
        }
    })
    export default class HomeMenuComponent extends Vue{

        data(){
            return {

            }
        }

        created(){

        }

        clickMenu(menu: NavMenu) {
            console.log(menu);
            this.$emit(EventNames.homeMenuEvent, menu);
        }

    }
</script>

<style lang="scss" scoped>
    #id_home_menu{
        background-color: cadetblue;
    }
</style>