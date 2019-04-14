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
        hot: [],
        searchResult: [],
        searched: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        clearKeyword(event) {
            this.setData({
                keyword: '',
                searched: false,
                searchResult: []
            })
        },
        onCancel(event) {
            this.triggerEvent('cancelTap', {});
        },
        changeKeyword(event) {
            this.setData({
                keyword: event.detail.value
            });
        },
        doSearch(event) {
            wx.showLoading({
                mask: true
            });
            const content = event.detail.value || event.detail.content
            searchApi.search(content).then(res => {
                this.setData({
                    searchResult: res,
                    keyword: content,
                    searched: true
                });
                wx.hideLoading();
            });
        },
    }
})