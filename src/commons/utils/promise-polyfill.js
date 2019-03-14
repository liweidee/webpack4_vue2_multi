import Promise from 'promise-polyfill';

export default {
    mounted () {
        if (!window.Promise) {
            window.Promise = Promise;
        }
    }
};
