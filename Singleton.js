var Singleton = (function () {
    var cache;
    return function () {
        if (typeof cache === 'object') return cache;
        this.pro1 = 'public'
        this.a = ''
        cache = this;
    }    
}())