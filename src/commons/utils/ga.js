import axios from 'axios';

const GA_URL = 'https://www.google-analytics.com/collect';
const GA_ID = 'UA-27058866-3';

export default {
    mounted () {
        if (!document.documentElement.hasAttribute('ga-added')) {
            document.documentElement.setAttribute('ga-added', true);
            document.addEventListener('DOMContentLoaded', (e) => {
                this.gaPageView();
            }, false);
        }
    },
    methods: {
        gaPageView () {
            // 统计pv
            this.postGA({
                t: 'pageView',
                dp: location.pathname,
                dt: document.title
            });
        },
        gaEvent (category, action, label) {
            // 统计事件
            this.postGA({
                t: 'event',
                ec: category,
                ea: action,
                el: label
            });
        },
        postGA (paramsObj) {
            if (!document.querySelector('#user_smzdm_id')) {
                throw new Error('User ID is required');
            }

            let paramsDefault = {
                v: 1,
                tid: GA_ID,
                cid: document.querySelector('#user_smzdm_id').value,
                z: Date.now()
            };

            let params = Object.assign(paramsDefault, paramsObj);

            let paramsData = [];
            for (let key in params) {
                paramsData.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
            }
            paramsData = paramsData.join('&');

            return axios.get(GA_URL + '?' + paramsData)
            .then((response) => {
                // console.log('post success', response);
                return response;
            })
            .catch((err) => {
                throw new Error(err);
            });
        }
    }
};
