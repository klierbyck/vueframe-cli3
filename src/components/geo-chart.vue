<template>
    <div>
        <div :ref="dom" :style="style"></div>
    </div>
</template>

<script>
    export default {
        props: {
            option: {
                type: Object,
                default () {
                    return {

                    }
                }
            },
            dom: {
                type: String
            },
            width: {
                type: String,
                default: "870px"
            },
            height: {
                type: String,
                default: "320px"
            },
        },
        components: {

        },
        data () {
            return {
                chart: ''
            }
        },
        created () {

        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                this.chart = echarts.init(this.$refs[this.dom]);
                this.chart.clear();
                this.chart.setOption(this.option, true);
                this.chart.on('legendselectchanged', function (param) {
                    console.log(param)
                });
                window.addEventListener("resize", this.chart.resize);
            },
            //legend事件
            selectLegend () {
                console.log('ddd', echarts)
            }
        },
        computed: {
            style () {
                return {
                    width: this.width,
                    height: this.height
                }
            }
        },
        watch: {
            option: {
                handler: function (newVal, oldVal) {
                    if (this.chart) {
                        if (newVal) {
                            this.chart.setOption(newVal, true);
                        } else {
                            this.chart.setOption(oldVal, true);
                        }
                    } else {
                        this.init();
                    }
                },
                deep: true
            },
            width: function (n, o) {
                this.$nextTick(() => {
                    this.chart.resize();
                })
            }
        }
    }
</script>

<style lang="less">
    @import url("./geo-chart.less");
</style>