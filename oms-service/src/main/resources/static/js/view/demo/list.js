/**
 * Created by Dell on 2017/9/29.
 */
var modal;
//layui相关组件
var layer, laydate, form, table, element, upload;
var doctorTable;
var currLayId;//当前tabId
layui.define(['layer', 'form', 'upload', 'laydate', 'table', 'element'], function (exports) {
    layer = layui.layer,
        laydate = layui.laydate,
        form = layui.form,
        table = layui.table,
        element = layui.element,
        upload = layui.upload;
    //全局设置table、
    table.set({
        request: {
            pageName: 'currentPage', //页码的参数名称，默认：page
            limitName: 'pageSize',
        },
        response: {
            statusName: 'code' //数据状态的字段名称，默认：code
            , statusCode: '000000' //成功的状态码，默认：0
            , msgName: 'msg' //状态信息的字段名称，默认：msg
            , countName: 'total' //数据总数的字段名称，默认：count
            , dataName: 'rows' //数据列表的字段名称，默认：data
        },
        page: false,
        limit: 10,
        unresize: true
    });
    list.init();
    exports('list', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
var list = {
    init: function () {
        // 监听回车
        list.initTable.demoTable();
        //点击【新增】
        $('#btn_add').on('click', function () {
            var id =   "_addDemo";
            window.open(url.toAdd(demo_url),"_self");
        });

        //table的点击触发事件
        table.on('tool(demoTable)', function (obj) {
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if (layEvent == "edit") {
                var id =   "_editDemo" ;
                window.open(url.toEdit(demo_url,id),"_self");
            } else if (layEvent == "del") {
                layer.confirm("确定删除该信息?", function () {
                    ad.ajax.request("", url.del(demo_url), list.sucFuns.delResult);
                });
            }
        });
    },
    sucFuns: {
        delResult: function (result) {
            if (result.success) {
                layer.msg(result.msg, {icon: 1});
                //重新初始化表格
                list.initTable.demoTable();
            } else {
                layer.msg(result.msg, {icon: 2});
            }
        },
    },
    initTable: {
        demoTable: function () {

            //执行渲染
            doctorTable = table.render({
                elem: '#id',
                url: url.list(demo_url),
                id: 'id',
                cols: [[
                    {title: '序号', type: "numbers", width:50},
                    {field: 'inputStr', title: '输入信息'},
                    {
                        title: '操作', toolbar: '#detail', fixed: 'right',width:280
                    }
                ]],
                text: { //自定义文本，此处用法--》当返回数据为空时的异常提示
                    none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
                }

            });
        }
    },

 
};
