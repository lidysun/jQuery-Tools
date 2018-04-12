/**
 * [cookie 设置或取cookie]
 * @param  name    [键]
 * @param  value   [值]
 * @param  expires [有效期]
 * @return value   [值]
 */
$.cookie = function(name, value, expires) {
    if (value != undefined) {
        var duration = new Date();
        duration.setDate(duration.getDate() + expires);
        document.cookie = name + '=' + encodeURIComponent(value) + ';path=/' + (expires ? ';expires=' + duration.toGMTString() : '');
        return value;
    } else {
        var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        return arr != null ? decodeURIComponent(arr[2]) : '';
    }
};

/**
 * [placeholder 低版本浏览器placoholder兼容方法]
 * @return {[object]} [元素对象]
 */
$.fn.placeholder = function() {
    //如果不支持placeholder属性
    //in操作符检查一个对象上(包括其prototype)是否含有某个属性
    if (!("placeholder" in document.createElement("input"))) {
        return $(this).each(function(n, item) {
            var $me = $(item);
            $me.val($me.attr("placeholder"));
            $me.bind("focus", function() {
                    if ($me.val() == $me.attr("placeholder")) {
                        $me.val("");
                    }
                })
                .bind("blur", function() {
                    if (!$me.val()) {
                        $me.val($me.attr("placeholder"));
                    }
                });
        });
    }
};

/**
 * [filter 数组筛选]
 * @param  {Function} fn [筛选条件函数]
 * @return {[Array]}     [返回符合条件的新元素数组，原数组不变]
 */
Array.prototype.filter = function(fn) {
    var newArray = [];
    var length = this.length;
    var i = 0;
    for (; i < length; i++) {
        if (fn(this[i])) {
            newArray.push(this[i]);
        }
    }
    return newArray;
};

/**
 * [indexOf 数组查找某元素]
 * @param val [要查找的元素]
 * @return [元素索引位置]
 */
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            return i;
        }
    }
    return -1;
};
/**
 * [remove 从数组中删除指定元素]
 * @param val [要查找的元素]
 * @return [修改过后的数组，原数组改变]
 */
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index != -1) {
        this.splice(index, 1);
        //重复删除
        this.remove(val);
    }
};

/**
 * [getParams 获取链接参数值]
 * @param key [键]
 * @return value [值]
 */
// String.prototype.getParams = function(key) {
//     // var reg = eval('/[\?|\&]' + key + '\=[0-9a-zA-Z]*/');
//     var reg = new RegExp('[\?|\&]' + key + '\=[\_0-9a-zA-Z]*');
//     var result = this.match(reg);
//     if (result) {
//         // var value = result[0].replace(eval('/[\?|\&]' + key + '\=/'), '');
//         var value = result[0].replace(new RegExp('[\?|\&]' + key + '\='), '');
//         return value ? value : null;
//     }
//     return null;
// };
String.prototype.getParams = function(key) {
    var reg = new RegExp('[\?|\&]' + key + '\=([^\&]*)');
    var result = this.match(reg);
    return result && result[1] ? decodeURIComponent(result[1]) : null;
};