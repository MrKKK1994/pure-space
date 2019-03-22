const db = wx.cloud.database();
const _ = db.command;

export class LikeApi {
    openid = wx.getStorageSync('openid');

    changeLikeStatus(data, likeStatus) {
        db.collection('userLike').where({
            _openid: this.openid
        }).get({
            success: (res) => {
                likeStatus ? this.cancelLike(res, data) : this.addLike(res, data);
            },
            fail: function (err) {
                console.error(err);
            }
        });
    }

    addLike(res, data) {
        db.collection('popular').doc(data.id).update({
            data: {
                like_status: _.set(true),
                fav_nums: _.inc(1)
            }
        });

        if (res.data.length === 0) {
            db.collection('userLike').add({
                data: {
                    likes: [data]
                }
            });
        } else {
            db.collection('userLike').doc(res.data[0]._id).update({
                data: {
                    likes: _.push(data)
                }
            });
        }
    }

    cancelLike(res, data) {
        let newLikes = res.data[0].likes.filter(item => item.id !== data.id);
        db.collection('userLike').doc(res.data[0]._id).update({
            data: {
                likes: _.set(newLikes)
            }
        });

        db.collection('popular').doc(data.id).update({
            data: {
                like_status: _.set(false),
                fav_nums: _.inc(-1)
            }
        });
    }
}