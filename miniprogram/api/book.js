const db = wx.cloud.database();

export class BookApi {
    getBookList() {
        return db.collection('book').get();
    }

    getBookDetail(id) {
        return db.collection('book').doc(id).get();
    }
}