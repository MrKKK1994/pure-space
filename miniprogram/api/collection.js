import {
    PopularApi
} from "popular.js";

const db = wx.cloud.database();
const _ = db.command;
const popularApi = new PopularApi();

export class CollectionApi {
    openId = wx.getStorageSync('openid');
    getCollection() {
        return new Promise((resolve, reject) => {
            db.collection('userLike').where({
                _openid: this.openId
            }).get().then(res => {
                let result = [];
                let promiseArr = [];
                res.data[0].likes.forEach((item) => {
                    if (item.type !== 400) {
                        promiseArr.push(popularApi.getPopularDetail(item.id));
                    }
                });
                Promise.all(promiseArr).then(res => {
                    res.forEach(item => {
                        result.push(item.data);
                    });
                    resolve(result);
                })
            }, fail => {
                reject(fail);
            });
        });

    }
}