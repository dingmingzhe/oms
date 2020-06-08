/**
 * Created by Dell on 2017/9/29.
 */
//layui相关组件
var layer, form, element, upload;
var currLayId;//当前tabId
var editor;
layui.define(['layer', 'form', 'table', 'element', 'upload'], function (exports) {
    layer = layui.layer,
        form = layui.form,
        element = layui.element,
        upload = layui.upload;

    demoEdit.init();
    exports('edit', {});
});
var demoEdit = {
    init: function () {
        //点击【提交】
        $('#editForm .submit').on('click', function () {
            //表单验证
            if (!$('#editForm').valid()) {
                return false;
            }
            layer.alert("确定提交？",
                {btn: ["确定", "取消"]},
                function () {
                    //提交表单
                    ad.ajax.request($('#editForm').serialize(), url.edit(demo_url), demoEdit.sucFuns.edit);
                }
            );
        });
    },
    sucFuns: {
        edit: function (result) {
            layer.msg(result.msg)
            if (result.success) {
                //跳转页面
                setTimeout(function () {
                    demoEdit.sucFuns.toPage();
                }, 2000);
            }
        },
        toPage: function () {
            window.open(url.toList(demo_url),"_self");
   }
    },
};