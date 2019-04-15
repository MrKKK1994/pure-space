import {
    CollectionApi
} from "../../api/collection.js";

const collectionApi = new CollectionApi();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        collection: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: (result) => {
                            this.setData({
                                userInfo: result.userInfo
                            })
                        }
                    });
                }
            }
        });

        collectionApi.getCollection().then(res => {
            this.setData({
                collection: res
            })
        })

    },
    getUserInfo(event) {
        if (this.data.userInfo) {
            return
        }
        this.setData({
            userInfo: event.detail.userInfo.userInfo
        })
    }
})