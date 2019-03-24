import {
    popularBehavior
} from '../popular-behavior.js';

let bam = wx.getBackgroundAudioManager();

Component({
    behaviors: [popularBehavior],

    /**
     * 组件的属性列表
     */
    properties: {
        musicUrl: String,
        title: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        isPlay: false
    },

    lifetimes: {
        attached() {
            bam.title = this.properties.title;
            this.checkStatus();
            this.statusChange();
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tapBtn() {
            this.data.isPlay ? this.pause() : this.play();
            this.setData({
                isPlay: !this.data.isPlay
            });
        },
        play() {
            bam.src = this.properties.musicUrl
        },
        pause() {
            bam.pause();
        },

        checkStatus() {
            if (bam.paused) {
                this.setData({
                    isPlay: false
                });
                return
            }
            if (this.properties.musicUrl === bam.src) {
                if (!bam.paused) {
                    this.setData({
                        isPlay: true
                    });
                }
            }
        },

        statusChange() {
            bam.onPlay(() => {
                this.checkStatus()
            });
            bam.onPause(() => {
                this.checkStatus()
            });
            bam.onStop(() => {
                this.checkStatus()
            });
            bam.onEnded(() => {
                this.checkStatus()
            });
        }


    }
})