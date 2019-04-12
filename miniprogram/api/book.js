const db = wx.cloud.database();
const _ = db.command;

export class BookApi {
    getBookList() {
        return db.collection('book').get();
    }

    getBookDetail(id) {
        return db.collection('book').doc(id).get();
    }

    getBookTag(bookId) {
        return db.collection('comment').where({
            bookid: bookId
        }).get();
    }

    postComment(data) {
        return data.id ? db.collection('comment').doc(data.id).update({
            data: {
                tag: _.set(data.tag)
            }
        }) : db.collection('comment').add({
            data: {
                bookid: data.bookId,
                tag: data.tag
            }
        })
    }
}