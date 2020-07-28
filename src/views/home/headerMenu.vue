<template>
    <div class="menu-wrap-box">
        <section class="menu-box">
            <nav v-for="item in data" :key="item.label">
                {{ item.label }}
            </nav>
        </section>
        <footer class="child-menu-box">
          <header-menu-child :menu="childMenu" />
        </footer>
    </div>
</template>
<script>
import HeaderMenuChild from './headerMenuChild';

export default {
    name: "headerMenu",
    components: {HeaderMenuChild},
    data() {
        return {
            data: [],
            childMenu: [],
        };
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            this.$api.home.menu().then(res => {
                if (res && res.r0 === true) {
                    this.data = res.data;

                    this.childMenu = this.data[0].child
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.menu-wrap-box {
    height: 100%;

    .menu-box {
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        nav {
            font-size: 16px;
            color: #fff;
            padding: 10px 20px;
            transition: all 0.3s;

            &:hover {
                cursor: pointer;
                color: #000;
            }
        }
    }
}
</style>