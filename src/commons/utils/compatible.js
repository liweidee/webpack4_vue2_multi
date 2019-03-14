export default {
    data () {
        return {
            isExplore: false
        };
    },
    computed: {
        isCompatible () {
            // 红米一代
            return /Build\/HM2013/i.test(navigator.userAgent);
        },
        isAndroid () {
            // 安卓
            return /Android/i.test(navigator.userAgent);
        }
    },
    mounted () {
        this.isExplore = (window.pageData && window.pageData.app_type === 'smzdmjs');
    }
};
