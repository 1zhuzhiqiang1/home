<template>
    <div id="qrcode">
        <img id="id_img" src="" alt="">
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import QRCode from 'qrcode';

    @Component({
        name: "qrcode"
    })
    export default class QrCode extends Vue {

        data() {
            return {
                text: "我是二维码"
            }
        }

        mounted() {
            this.generate();
        }

        generate() {
            QRCode.toDataURL('I am a pony!').then((url: any) => {
                let img = document.getElementById("id_img");
                if(img){
                    img.setAttribute("src", url);
                }
            }).catch((err:any) => {
                console.error(err)
            })
        }

    }
</script>

<style lang="scss">

</style>