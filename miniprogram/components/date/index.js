const chineseMonth = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: {
            type:Number,
            observer:function(v){
                if(v < 10){
                    this.setData({
                        _index:'0' + v.toString()
                    });
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        year: new Date().getFullYear(),
        month: chineseMonth[new Date().getMonth()],
        _index: '0'
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})