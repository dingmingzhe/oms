/**
 * Created by Dell on 2017/9/29.
 */
//layui相关组件
var layer, form, element, upload;
var currLayId;//当前tabId
layui.define(['layer', 'form', 'upload', 'table', 'element'], function (exports) {
    layer = layui.layer,
        form = layui.form,
        element = layui.element,
        upload = layui.upload;

    demoAdd.init();
    exports('add', {});
});
var demoAdd = {
    init: function () {
        //点击【提交】
        $('#addForm .submit').on('click', function () {
            //表单验证
            if (!$('#addForm').valid()) {
                return false;
            }
            layer.alert("确定提交？",
                {btn: ["确定", "取消"]},
                function () {
                    //提交表

                    ad.ajax.request($('#addForm').serialize(), url.add(demo_url), demoAdd.sucFuns.add);
                }
            );
        });
    },
    sucFuns: {
        add: function (result) {
            layer.msg(result.msg)
            if (result.success) {
                demoAdd.sucFuns.toPage();
            }
        },
        toPage: function () {
            window.open(url.toList(demo_url),"_self");
        }
    },
};