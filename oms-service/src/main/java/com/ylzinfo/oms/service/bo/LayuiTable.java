package com.ylzinfo.oms.service.bo;


import com.ylzinfo.oms.service.constants.RespContant;


import java.io.Serializable;

/**
 * Created by Dell on 2017/11/2.
 */
public class LayuiTable implements Serializable {
    protected long total;
    protected Object rows;
    protected String code;
    protected String msg;
    protected Integer pageSize;

    public LayuiTable(Integer total, Object rows) {
        this.total = total;
        this.rows = rows;
        this.code = RespContant.SUCCESS;
        this.msg = RespContant.SUCCESS_MSG;
    }

    public LayuiTable(PageInfo<?> data) {
        this.rows = data.getList();
        this.total = data.getTotal();
        this.code = RespContant.SUCCESS;
        this.msg = RespContant.SUCCESS_MSG;
    }

    public LayuiTable(PageInfo<?> data, Integer pageSize) {
        this.rows = data.getList();
        this.total = data.getTotal();
        this.code = RespContant.SUCCESS;
        this.msg = RespContant.SUCCESS_MSG;
        this.pageSize = pageSize;
    }

    public LayuiTable(PageInfo<?> data, Long total) {
        this.rows = data.getList();
        this.total = total;
        this.code = RespContant.SUCCESS;
        this.msg = RespContant.SUCCESS_MSG;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Object getRows() {
        return this.rows;
    }

    public void setRows(Object rows) {
        this.rows = rows;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public String getCode() {
        return code;
    }
}
