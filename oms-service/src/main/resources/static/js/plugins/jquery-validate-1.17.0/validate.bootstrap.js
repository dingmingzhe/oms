/**
 * Created by Gred on 2015/10/27.
 */
(function (window, document, undefined) {

    var factory = function ($) {
        "use strict";
        $.extend($.validator.messages, {
            required: "必须填写",
            remote: "请修正此数据",
            email: "请输入有效的电子邮件地址",
            url: "请输入有效的网址",
            date: "请输入有效的日期",
            dateISO: "请输入有效的日期 (YYYY-MM-DD)",
            number: "请输入有效的数字",
            digits: "只能输入正整数",
            creditcard: "请输入有效的信用卡号码",
            equalTo: "两次输入的密码不一致",
            extension: "请输入有效的后缀",
            maxlength: $.validator.format("最多可以输入 {0} 个字符"),
            minlength: $.validator.format("最少要输入 {0} 个字符"),
            rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
            range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
            max: $.validator.format("请输入不大于 {0} 的数值"),
            min: $.validator.format("请输入不小于 {0} 的数值")
        });

        //========================================

        //角色识别码校验
        $.validator.addMethod("role", function (value, element) {
            var role = /^ROLE_[A-Z_]+$/;
            return this.optional(element) || (role.test(value));
        }, "请输入有效的角色识别码");

        //大写与下划线校验
        $.validator.addMethod("code", function (value, element) {
            var code = /^[A-Z_]+$/;
            return this.optional(element) || (code.test(value));
        }, "请输入有效的代码类别");

        //手机号码校验
        $.validator.addMethod("phone", function (value, element) {
            var phone = /^1[3|4|5|7|8]\d{9}$/;
            return this.optional(element) || (phone.test(value));
        }, "请输入有效的手机号码");

        //@描述：车牌号验证
        $.validator.addMethod("vehicleNo", function (value, element) {
            var result = false;
            if (value.length == 7) {
                var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
                result = express.test(value);
            }
            return this.optional(element) || result;
        }, "请输入有效的车牌号");

        //邮箱
        $.validator.addMethod("mail", function (value, element) {
            var mail = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/;
            return this.optional(element) || (mail.test(value));
        }, "请输入有效的电子邮件地址");

        //整数
        $.validator.addMethod("int", function (value, element) {
            var number = /^[1-9]\d*$/;
            console.log(number.test(value));
            return this.optional(element) || (number.test(value));
        }, "请输入有效的整数");

        //校验身份证
        $.validator.addMethod("idcard", function (value, element) {
            var idcard = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
            return this.optional(element) || (idcard.test(value));
        }, "请输入有效的身份证号");

        //字母、数字、下划线
        $.validator.addMethod("stringCheck", function (value, element) {
            var stringCheck = /^[a-zA-Z][a-zA-Z0-9_]*$/;
            return this.optional(element) || (stringCheck.test(value));
        }, "只能输入字母、数字、下划线，且以字母开头");

        // 中文的验证
        $.validator.addMethod("chinese", function (value, element) {
            var chinese = /^[\u4e00-\u9fa5]+$/;
            return this.optional(element) || (chinese.test(value));
        }, "只能输入中文");

        //特定字符串开头
        $.validator.addMethod("begin", function (value, element, param) {
            var begin = new RegExp("^" + param);
            return this.optional(element) || (begin.test(value));
        }, $.validator.format("必须以 {0} 开头!"));

        //特定字符串结尾
        $.validator.addMethod("end", function (value, element, param) {
            var end = new RegExp(param + "$");
            return this.optional(element) || (end.test(value));
        }, $.validator.format("必须以 {0} 结尾!"));

        //自定义错误提示样式
        $.validator.setDefaults({
            unhighlight: function (element, errorClass, validClass) { //验证通过
                if (element) {
                    $(element).removeClass(errorClass);
                    var index = $(element).attr("data-tipId");
                    layer.close(index);
                    if (element.type === "radio") {
                        this.findByName(element.name).addClass(validClass);
                    } else {
                        $(element).addClass(validClass);
                    }
                }
            },
            errorPlacement: function (error, element) {
                var index = layer.tips($(error).text(), $(element), {
                    tipsMore: true
                }); //在元素的事件回调体中，follow直接赋予this即可
                $(element).attr("data-tipId", index);
            }
        });
    }; // /factory

    // Define as an AMD module if possible
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    }
    else if (jQuery) {
        // Otherwise simply initialise as normal, stopping multiple evaluation
        factory(jQuery);
    }


})(window, document);
