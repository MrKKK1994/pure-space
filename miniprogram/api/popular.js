const db = wx.cloud.database();

export class PopularApi {
    getLatest(callBcak) {
        db.collection('popular').orderBy('index','desc').get({
            success:function(res){
                callBcak(res.data[0]);
            },
            fail:function(err){
                console.error(err);
            }
        });
    }
}