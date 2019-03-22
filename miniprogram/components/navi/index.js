// components/navi/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: String,
        isFitst: Boolean,
        isLast:Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        nextBtn:"images/triangle@left.png",
        nextBtn_dis:"images/triangle.dis@left.png",
        prevBtn:"images/triangle@right.png",
        prevBtn_dis: "images/triangle.dis@right.png",
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})