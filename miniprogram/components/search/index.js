import {
    SearchApi
} from "../../api/search.js";

const searchApi = new SearchApi();

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },
    lifetimes: {
        attached() {
            this.setData({
                history: searchApi.getHistory()
            });
        }
    },


    /**
     * 组件的初始数据
     */
    data: {
        keyword: '',
        history: [],
        hot: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        clearKeyword(event) {
            this.setData({
                keyword: ''
            })
        },
        changeKeyword(event) {
            this.setData({
                keyword: event.detail.value
            });
        },
        doSearch(event) {
            searchApi.search(event.detail.value).then(res => {
                
            })
        }
    }
})