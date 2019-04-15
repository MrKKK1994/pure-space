const db = wx.cloud.database();

export class PopularApi {
    getLatest(callBcak) {
        db.collection('popular').orderBy('index', 'desc').get({
            success: function (res) {
                wx.setStorageSync(`popular-${res.data[0].index}`, res.data[0]);
                callBcak(res.data[0]);
            },
            fail: function (err) {
                console.error(err);
            }
        });
    }

    setOpenId() {
        let openid = wx.getStorageSync('openid');
        if (!openid) {
            wx.cloud.callFunction({
                name: 'getUserInfo',
                complete: res => {
                    wx.setStorageSync('openid', res.result.openid);
                }
            })
        }
    }

    changeIndex(isNext, index, callBack) {
        let popular = wx.getStorageSync(`popular-${isNext ? index + 1 : index - 1}`);
        if (popular) {
            callBack(popular);
        } else {
            db.collection('popular').where({
                index: isNext ? index + 1 : index - 1
            }).get({
                success: function (res) {
                    wx.setStorageSync(`popular-${res.data[0].index}`, res.data[0]);
                    callBack(res.data[0]);
                },
                fail: function (err) {
                    console.error(err);
                }
            });
        }
    }

    getLikeDetail(id, callBack) {
        db.collection('popular').doc(id).get({
            success: function (res) {
                callBack({
                    fav_nums: res.data.fav_nums,
                    like_status: res.data.like_status
                });
            },
            fail: function (err) {
                console.error(err);
            }
        })
    }

    getPopularDetail(id) {
        return db.collection('popular').doc(id).get();
    }

}