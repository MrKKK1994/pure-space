const db = wx.cloud.database();
const _ = db.command;

export class SearchApi {
    key = 'history';

    getHistory() {
        return wx.getStorageSync(this.key) || [];
    }

    setHistory(content) {
        let history = this.getHistory();
        if (history.length >= 10) {
            history.pop();
        }
        history.unshift(content);
        wx.setStorageSync(this.key, history);
    }

    search(keyword) {
        return new Promise((resovle, reject) => {
            db.collection('book').get().then(res => {
                const result = res.data.filter(item => {
                    return item.title.indexOf(keyword) > -1 || item.author[0].indexOf(keyword) > -1
                });
                resovle(result);
            }, err => {
                reject(err);
            });
        });
        // db.collection('book').get()
        //     .then(res => {
        //         const result = res.data.filter(item => {
        //             return item.title.indexOf(keyword) > -1 || item.author.indexOf(keyword) > -1
        //         })
        //         return new Promise((resolve, reject) => {
        //             resolve(result);
        //         });
        //     });
    }
}