// components/like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isLike: Boolean,
        count: Number,
        readOnly: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        handleTap(e) {
            if (this.properties.readOnly) {
                return 
            }
            let isLike = this.properties.isLike;
            let count = isLike ? this.properties.count - 1 : this.properties.count + 1;
            this.setData({
                count: count,
                isLike: !isLike
            });
            this.triggerEvent('likeOnTap', {
                isLike: !this.properties.isLike
            });
        }
    }
})