import {
    BookApi
} from '../../api/book.js';
import {
    LikeApi
} from '../../api/like.js';

const bookApi = new BookApi();
const likeApi = new LikeApi();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        book: Object,
        tags: [],
        onInput: false,
        commentId: String
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        bookApi.getBookDetail(options.id).then(res => {
            this.setData({
                book: res.data
            });
        });
        bookApi.getBookTag(options.id).then(res => {
            if (res.data[0]) {
                res.data[0].tag.sort((a, b) => b.likecount - a.likecount);
                this.setData({
                    tags: res.data[0].tag.slice(0, 10),
                    commentId: res.data[0]._id
                })
            }
        });
    },
    likeTap(event) {
        likeApi.changeLikeStatus({
            id: this.data.book._id,
            type: 400
        }, event.detail.isLike, 'book');
    },

    showInput(event) {
        this.setData({
            onInput: true
        });
    },

    cancelInput(event) {
        this.setData({
            onInput: false
        });
    },

    postComment(event) {
        const comment = event.detail.content || event.detail.value;
        let newTags = this.data.tags;
        if (!comment || comment.length > 12) {
            wx.showToast({
                title: '输入有误',
                icon: 'none',
                duration: 2000,
                mask: false,
            });
            return
        }

        if (newTags.some(v => v.content === comment)) {
            newTags.forEach((item, i, arr) => {
                if (item.content === comment) {
                    arr[i].likecount++
                }
            });
        } else {
            newTags.push({
                content: comment,
                id: newTags.length + 1,
                likecount: 1
            });
        }

        bookApi.postComment({
            id: this.data.commentId,
            tag: newTags
        }).then(res => {
            this.setData({
                onInput: false
            });
            wx.showToast({
                title: 'OK',
                icon: 'none',
                image: '',
                duration: 1000,
                mask: false,
            });
            bookApi.getBookTag(this.data.book._id).then(res => {
                if (res.data[0]) {
                    res.data[0].tag.sort((a, b) => b.likecount - a.likecount);
                    this.setData({
                        tags: res.data[0].tag.slice(0, 10),
                    })
                }
            });
        })

    }
})