import {
    PopularApi
} from "../../api/popular.js";
import {
    LikeApi
} from "../../api/like.js";

let popularApi = new PopularApi();
let likeApi = new LikeApi();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        popular: Object,
        lastestIndex: Number,
        isLast: true,
        isFirst: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        popularApi.getLatest(res => {
            console.log(res);
            this.setData({
                popular: res,
                lastestIndex: res.index
            });
        });

        popularApi.setOpenId();

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    likeTap(e) {
        likeApi.changeLikeStatus({
            id: this.data.popular._id,
            type: this.data.popular.type
        }, e.detail.isLike);
    },

    goNext(e) {
        popularApi.changeIndex(true, this.data.popular.index, (res) => {
            popularApi.getLikeDetail(res._id, (likeDetail) => {
                res.fav_nums = likeDetail.fav_nums;
                res.like_status = likeDetail.like_status;
                this.setData({
                    popular: res,
                    isLast: res.index === this.data.lastestIndex,
                    isFirst: false
                });
            });
        });
    },

    goPrev(e) {
        popularApi.changeIndex(false, this.data.popular.index, (res) => {
            popularApi.getLikeDetail(res._id, (likeDetail) => {
                res.fav_nums = likeDetail.fav_nums;
                res.like_status = likeDetail.like_status;
                this.setData({
                    popular: res,
                    isLast: false,
                    isFirst: res.index === 1
                });
            });
        });
    }
})