<template>
    <div>
        <div>测试{{flag}}</div>
    </div>
</template>
<script>
    import util from '@/libs/util.js'
    import dateFtt from '@/libs/date.js'
    export default {
        data () {
            return {
                flag: false,
            }
        },
        mounted () {
            console.log('util', util.randomStr(32));
            console.log('date', dateFtt.dateFtt('yyyy-MM-dd', new Date()));
            this.$http.post('http://jsonplaceholder.typicode.com/posts', { a: 1, b: 2 }, 'q123').then((result) => {
                console.log('result', result);
            }).catch((err) => {
                console.log('err0', err);
            });
            this.$http.get('http://jsonplaceholder.typicode.com/comments', { postId: 1 }, 'q456').then((result) => {
                console.log('result', result);
            }).catch((err) => {
                console.log('err1', err);
            });
            this.$http.get('http://jsonplaceholder.typicode.com/comments', { postId: 2 }).then((result) => {
                console.log('result', result);
            }).catch((err) => {
                console.log('err1', err);
            });
            setTimeout(() => {
                this.$http.cancel('ALL');
            }, 1000);
        }
    };
</script>
<style lang="less">
    @import url("./test.less");
</style>