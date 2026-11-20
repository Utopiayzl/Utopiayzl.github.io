const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],
        };
    },
    created() {
        const hideLoading = () => {
            this.loading = false;
        };
        // 原版只监听 window.load — 任一外部资源(字体/CDN/图片)卡住就会永久停在 LOADING。
        // 改为 DOM 就绪即隐藏，并加 load 事件 + 定时器三重兜底，任一触发即可。
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => setTimeout(hideLoading, 300), { once: true });
            window.addEventListener("load", hideLoading, { once: true });
            setTimeout(hideLoading, 2000);
        } else {
            setTimeout(hideLoading, 300);
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.scrollTop = newScrollTop;
        },
    },
});
app.mount("#layout");
