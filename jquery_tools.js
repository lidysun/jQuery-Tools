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