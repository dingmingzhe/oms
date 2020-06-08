var base_url = "/oms/static";


/********就医指南前缀******/
var demo_url =   "/oms/demo";


var url = {
        base: function () {
            return "/oms";
        },
        toList: function (str) {
            return str + ".page";
        },
        toAdd: function (str) {
            return str + ".add.page";
        },
        toEdit: function (str, Id) {
            return str + ".edit.page?id=" + Id;
        },


        toDetail: function (str, id) {
            return str + "/" + id;
        },
        edit: function (str) {
            return str + ".edit.ajax";
        },
        add: function (str) {
            return str + ".add.ajax";
        },
        list: function (str) {
            return str + ".list.ajax";
        },

        del: function (str) {
            return str + ".del.ajax";
        }


    }
;

/********统计相关******/
var statistics = base_url + "/statistics/statistics";
var statistics_summary = base_url + "/statistics/summary";


/********系统操作日志******/
var sys_operation_log = base_url + "/operation/log";