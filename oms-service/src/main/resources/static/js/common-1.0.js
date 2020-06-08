// 定义标识符的控制
var layer, laytable;
layui.use(['layer', 'table'], function () {
    layer = layui.layer, laytable = layui.table;
});
var ad = (function () {
    //全局初始化操作
    var init = $(function () {
        ad.ajax.initAjaxSetUp();

    });
    //封装异步请求方法
    var ajax = {
        initAjaxSetUp: function () {
            $.ajaxSetup({
                type: 'POST',
                dataType: 'json',
                complete: function (xhr, status) {
                    //验证当前session是否失效
                    var code = xhr.responseJSON.code;
                    if (code == '888999') {
                        layer.confirm(xhr.responseJSON.msg, {icon: 3, title: '提示'}, function (index) {
                            window.location.href = "/oms/login.page";
                            layer.close(index);
                        });
                    }
                }
            });
        },
        /**
         * 异步表单提交
         * @param id 表单ID
         * @param url 提交URL
         * @param successCallBack 成功回调
         * @param errorCallBack 错误回调
         */
        submit: function (id, url, successCallBack, errorCallBack) {
            if (!id) {
                layer.error("表单ID不能为空");
                return;
            }

            if (!url) {
                layer.error("提交URL不能为空");
                return;
            }

            var timestamp = new Date().getTime();
            if (url.indexOf("?") > 0) {
                url = url + "&tmsp=" + timestamp;
            } else {
                url = url + "?tmsp=" + timestamp;
            }
            var formParams = jQuery("#" + id).serialize();//序列化表格内容为字符串

            var loading = layer.load();
            var succFunc = function (data) {
                layer.close(loading);
                if (successCallBack) {
                    successCallBack(data);
                } else {
                    if (data.success)
                        layer.success(data.msg);
                    else
                        layer.error(data.msg);
                }
            }
            var errorFunc = function (a, b, c) {
                layer.close(loading);
                if (errorCallBack) {
                    errorCallBack(a, b, c);
                } else {
                    layer.error(c);
                }
            }

            $.ajax({
                url: url,
                data: formParams,
                cache: false,
                success: succFunc,
                error: errorFunc
            });
        },
        /**
         * 异步Request请求
         * @param params 请求参数
         * @param url 提交URL
         * @param successCallBack 成功回调
         * @param errorCallBack 错误回调
         * @param isFormData 是否用formdata格式传输数据
         * @param isSync 是否开启同步
         * @returns {boolean}
         */
        request: function (params, url, successCallBack, isSync) {
            return request(params, url, successCallBack, null, false, isSync);
        },
        request: function (params, url, successCallBack, isFormData, isSync) {
            return request(params, url, successCallBack, null, isFormData, isSync);
        },
        request: function (params, url, successCallBack, errorCallBack, isFormData, isSync) {
            if (!url) {
                layer.error("提交URL不能为空");
                return false;
            }

            var contentType = 'application/x-www-form-urlencoded';
            var processData = true;
            if (isFormData) {
                contentType = false;
                processData = false;
            }

            var loading;
            if (layer) {
                loading = layer.load(1);
            }

            var succFunc = function (data) {
                if (layer) {
                    layer.close(loading);
                }
                if (successCallBack) {
                    successCallBack(data);
                } else {
                    layer.msg(data.msg);
                }

            }
            var errorFunc = function (a, b, c) {
                if (layer) {
                    layer.close(loading);
                }
                if (errorCallBack) {
                    errorCallBack(a, b, c);
                } else {
                    layer.msg(b);
                }
            }

            jQuery.ajax({
                url: url,
                data: params,
                async: !isSync,
                contentType: contentType,
                processData: processData,
                success: succFunc,
                error: errorFunc
            });
        },

    };
    //公共方法
    var commonUtils = {
        //@描述：判断是否null
        isNull: function (data) {
            return (data == "" || data == undefined || data == null) ? true : false;
        },
        //@描述：判断是否null 是返回“”
        isNullStr: function (data) {
            return (data == "" || data == undefined || data == null) ? "" : data;
        },
        isContains: function (arr, substr) {

            return $.inArray(substr, arr) > -1;
        },
        //@描述：提交表单
        submit: function (formId, url) {
            $('#' + formId).attr("action", url);
            $('#' + formId).submit();
        },
        //form表单参数转Json
        formToJson: function (formId) {
            var data = $("#" + formId).serialize();
            data = decodeURIComponent(data, true);//防止中文乱码
            data = data.replace(/\_/g, "/_");
            data = data.replace(/\%/g, "/%");
            data = data.replace(/&/g, "','");
            data = data.replace(/=/g, "':'");
            data = "({'" + data + "'})";
            var obj = eval(data);
            return obj;
        },
        //@描述：二级select联动
        //@参数：sel1Name 第一个select的name
        //@参数：sel2Name 第二个select的name
        //@参数：data01 第二个select的自定义data值用来和第一个select产生关联
        change2Select: function (sel1Name, sel2Name, data01) {
            var selectedVal = $("select[name='" + sel1Name + "'] option:selected").val();
            $("select[name='" + sel2Name + "'] option").each(function () {
                if (ad.common.isNull($(this).val())) {
                    $(this).attr('selected', 'true');
                } else {
                    if ($(this).data(data01) == selectedVal) {
                        $(this).show();
                        $(this).attr('selected', 'true');

                    } else {
                        $(this).hide();
                    }
                }
            });
            $("select[name='" + sel2Name + "']").trigger('onchange');//触发当前select的onchange方法
        },
        trim: function (s) {
            return s.replace(/(^\s*)|(\s*$)/g, "");
        },
        //@描述：上传图像验证和预览方法 preImageId预览图片的id imageFile当前上传的文件 size文件大小
        previewImage: function (preImageId, imageFile, width, height) {

            var pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/;
            if (!pattern.test(imageFile.value)) {
                layer.msg("系统仅支持jpg/jpeg/png/gif/bmp格式的照片！");
                imageFile.focus();
                //@时间：2017/6/5 11:36
                //@描述：清空文件
                $(imageFile).val("");
                return false;
            } else {
                if (width != null && height != null) {
                    var file, img;
                    if ((file = imageFile.files[0])) {
                        img = new Image();
                        img.onload = function () {
                            if (this.width > width || this.height > height) {
                                layer.msg("请上传不高于" + width + "*" + height + "的图片");
                                $('#' + preImageId).attr('src', "");
                                $(imageFile).val("");
                            }
                        };
                        img.src = URL.createObjectURL(file);
                    }
                }
                var path;
                if (document.all)//IE
                {
                    imageFile.select();
                    path = document.selection.createRange().text;
                }
                else//FF
                {
                    path = URL.createObjectURL(imageFile.files[0]);
                }
                $('#' + preImageId).attr('src', path);
            }

        },
        //@描述：弹窗展示图片，hideImgId承载图片的id，src 图片路径
        showImg: function (hideImgId, src) {
            if (ad.common.isNull(src)) {
                return;
            }
            console.log("id:" + hideImgId)
            console.log("src:" + src)
            // var _w = $(window).width();
            // var _h = $(window).height();
            var _w = window.screen.availWidth;
            var _h = window.screen.availHeight;
            console.log("_w:" + _w)
            console.log("_h:" + _h)
            $('#' + hideImgId).attr('src', src);
            var width = $('#' + hideImgId).width();
            var height = $('#' + hideImgId).height();
            console.log("width:" + width)
            console.log("height:" + height)
            if (width > _w || width < 100) {
                width = _w * 0.5;
            }
            if (height > _h || height < 100) {
                height = _h * 0.5;
            }
            // width = width > _w ? width * 0.5 : (width <100 ? width * 0.5 : width);
            // height = height > _h ? height * 0.5 : (height <100 ? height * 0.5 : height);
            console.log("width:" + width)
            console.log("height:" + height)
            layer.open({
                type: 1,
                title: false,
                shadeClose: false,
                area: [width + "px", height + "px"],
                content: $('#' + hideImgId)
            });
        }
    };
    //日期方法
    var date = {
        /**
         * 获取当前时间毫秒数
         */
        getCurrentMsTime: function () {
            var myDate = new Date();
            return myDate.getTime();
        },
        /**
         * 毫秒转时间格式
         */
        longMsTimeConvertToDateTime: function (time) {
            if (time == null) {
                return "";
            }
            var myDate = new Date(time);
            return this.formatterDateTime(myDate);
        },
        /**
         * 格式化日期（不含时间）
         */
        formatterDate: function (date) {
            var datetime = date.getFullYear()
                + "-"// "年"
                + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))
                + "-"// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate());
            return datetime;
        },

        /**
         * 格式化去日期（含时间）
         */
        formatterDateTime: function (date) {
            var datetime = date.getFullYear()
                + "-"// "年"
                + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))
                + "-"// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
                + " "
                + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
                + ":"
                + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
                + ":"
                + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
            return datetime;
        },
        formatSecond: function (seconds) {
            var timeStr = seconds ? seconds : 0 + "秒";
            if (seconds > 60) {
                var second = seconds % 60;
                var min = parseInt(seconds / 60);

                timeStr = min + "分" + second + "秒";
                if (min > 60) {
                    min = parseInt(seconds / 60) % 60;
                    var hour = parseInt(parseInt(seconds / 60) / 60);
                    timeStr = hour + "小时" + min + "分" + second + "秒";
                    if (hour > 24) {
                        hour = parseInt(parseInt(seconds / 60) / 60) % 24;
                        var day = parseInt(parseInt(parseInt(seconds / 60) / 60) / 24);
                        timeStr = day + "天" + hour + "小时" + min + "分" + second + "秒";
                    }
                }
            }
            return timeStr;
        },
        parseYYYYmmddhhmmss: function (str) {
            if (!str) {
                return "-";
            }
            var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
            var formatedDate = str.replace(pattern, '$1/$2/$3 $4:$5:$6');
            return ad.date.formatterDateTime(new Date(formatedDate));
        }, parseYYYYmmdd: function (str) {
            if (!str) {
                return "-";
            }
            var pattern = /(\d{4})(\d{2})(\d{2})/;
            var formatedDate = str.replace(pattern, '$1/$2/$3');
            return ad.date.formatterDate(new Date(formatedDate));
        }
    };
    var treeSet = {
        view: {
            selectedMulti: false
        },
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: {"Y": "ps", "N": "s"}
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "parentId",
                rootPId: "0"
            },
            key: {
                name: "name",
                checked: "check",
                url: "none"
            }
        },
        edit: {
            enable: false
        }
    };
    /**
     * 监听键盘事件
     */
    var keydown={
        /**
         * 监听回车，按下后触发btn点击事件
         */
        enter: function (btnId) {
            $(document).keydown(function (event) {
                if (event.keyCode == 13) {
                    console.log(btnId + "触发")
                    $("#"+btnId).click();
                }
            });
        }
    };
    return {
        init: init,
        ajax: ajax,
        common: commonUtils,
        date: date,
        treeSet: treeSet,
        keydown: keydown,
    }
}());