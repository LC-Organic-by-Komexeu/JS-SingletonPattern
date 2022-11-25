;
(function ($, window, document, undefined) {
    //'use strict';
    var pluginName = 'PluginA'; //Plugin名稱
    var myBoilerplate;

    //建構式
    myBoilerplate = function (element, options) {
        
        this.target = element; //html container
        this.opt = {};
        var initResult = this._init(options); //初始化
        if (initResult) {
            //初始化成功之後的動作
            this._style();
            this._domEvent();
            this._subscribeEvents();

            this.target.trigger('onInitComplete');
        }
    };

    //預設參數
    myBoilerplate.defaults = {
        css: {

        },
        onClick: undefined,
        onInitComplete: undefined,
        onAChange: undefined,

        store: undefined
    };

    //方法
    myBoilerplate.prototype = {
        //私有方法
        _init: function (_options) {
            //合併自訂參數與預設參數
            try {
                this.opt = $.extend(true, {}, myBoilerplate.defaults, _options);
                return true;
            } catch (ex) {
                return false;
            }
        },
        _style: function () {
            var o = this;
            o.target.css(o.opt.css);

            //新增一個下拉            
            var selA = `
                <select class="selA">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            `
            o.target.append(selA)
                    .find('.selA')
                    .change(function(){
                        o.target.trigger('onAChange', $(this).val());
                    })
        },
        _domEvent: function () {
            var o = this;            
        },
        //註冊事件接口
        _subscribeEvents: function () {
            //先解除所有事件接口
            this.target.off('onClick');
            this.target.off('onInitComplete');
            this.target.off('onAChange');
            //綁定點擊事件接口
            if (typeof (this.opt.onClick) === 'function') {
                this.target.on('onClick', this.opt.onClick);
            }
            if (typeof (this.opt.onInitComplete) === 'function') {
                this.target.on('onInitComplete', this.opt.onInitComplete);
            }
            if (typeof (this.opt.onAChange) === 'function') {
                this.target.on('onAChange', this.opt.onAChange);
            }
        }
    };

    //實例化，揭露方法，回傳
    $.fn[pluginName] = function (options, args) {
        var myInstance;
        this.each(function () {
            myInstance = new myBoilerplate($(this), options);
        });

        return this;
    };
})(jQuery, window, document);