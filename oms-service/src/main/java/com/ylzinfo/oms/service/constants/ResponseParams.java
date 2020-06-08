package com.ylzinfo.oms.service.constants;

import java.io.Serializable;
import java.util.Map;

public class ResponseParams<T> implements Serializable {

    //业务标示码
    private String code;
    //业务返回消息
    private String msg;

    private T param;
    private String timestamp;
    private Map<String, Object> pageParams;
    /**
     * 服务编号
     */
    private String serviceId;
    /**
     * appId
     */
    private String appId;
    /*** 额外的返回参数 (供controller处理的参数)*/
    private Map<String, Object> externalParam;
    /**
     * 是否成功
     **/
    private Boolean success;
	

    public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public T getParam() {
		return param;
	}

	public void setParam(T param) {
		this.param = param;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public Map<String, Object> getPageParams() {
		return pageParams;
	}

	public void setPageParams(Map<String, Object> pageParams) {
		this.pageParams = pageParams;
	}

	public String getServiceId() {
		return serviceId;
	}

	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public Map<String, Object> getExternalParam() {
		return externalParam;
	}

	public void setExternalParam(Map<String, Object> externalParam) {
		this.externalParam = externalParam;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public static ResponseParams success() {
        return response(null, RespContant.SUCCESS, RespContant.SUCCESS_MSG, true);
    }

    public static ResponseParams success(String code, String respMsg) {
        return response(null, code, respMsg, true);
    }

    public static ResponseParams success(Object obj) {
        return response(obj, RespContant.SUCCESS, RespContant.SUCCESS_MSG, true);
    }

    public static ResponseParams error() {
        return response(null, RespContant.ERROR, RespContant.ERROR_MSG, false);
    }

    public static ResponseParams error(String code, String respMsg) {
        return response(null, code, respMsg, false);
    }

    public static ResponseParams error(Object obj) {
        return response(obj, RespContant.ERROR, RespContant.ERROR_MSG, false);
    }

    public static ResponseParams response(Object obj, String code, String msg, Boolean isSuccess) {
        ResponseParams params = new ResponseParams();
        params.setCode(code);
        params.setMsg(msg);
        params.setParam(obj);
        params.setSuccess(isSuccess);
        return params;
    }
	
}
