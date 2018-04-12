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