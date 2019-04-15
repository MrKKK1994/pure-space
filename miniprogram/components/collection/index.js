// components/collection/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: Number,
        isLike: Boolean,
        count: Number,
        imageUrl: String,
        content: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        tag: {
            100: "电影",
            200: "音乐",
            300: "句子",
            400: "书籍"
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})