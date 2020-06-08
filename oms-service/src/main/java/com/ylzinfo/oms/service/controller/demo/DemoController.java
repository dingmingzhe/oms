package com.ylzinfo.oms.service.controller.demo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


import com.ylzinfo.oms.service.bo.LayuiTable;
import com.ylzinfo.oms.service.bo.PageInfo;
import com.ylzinfo.oms.service.bo.ResponseBO;
import com.ylzinfo.oms.service.util.RequestHolder;
import org.omg.CORBA.UserException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ylzinfo.oms.service.constants.ResponseParams;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


/**
 * 
 */
@Controller
public class DemoController {

    public static final String SESSION_STR = "SESSION_STR";

    //@描述：信息列表页
    @RequestMapping("/demo.page")
    public String toPage(Model model) throws Exception {

        return "demo/list";
    }

    //@描述：信息添加页
    @RequestMapping("/demo.add.page")
    public String toAddPage(Model model){
        return "demo/add";
    }

    //@描述：信息编辑页
    @RequestMapping("/demo.edit.page")
    public String toEditPage(@RequestParam String id,
                             Model model) throws Exception {
        HttpServletRequest request = RequestHolder.getRequest();
        HttpSession session = request.getSession();
        ResponseBO responseBO = (ResponseBO) session.getAttribute(SESSION_STR);
        //如果无信息，说明先到编辑页面了
        if(null==responseBO){
            return "demo/add";
        }

        model.addAttribute("responseBO", responseBO);
        return "demo/edit";
    }

    //@描述：医生信息列表页信息
  
    @RequestMapping("/demo.list.ajax")
    @ResponseBody
    public LayuiTable listAjax() {
        HttpServletRequest request = RequestHolder.getRequest();
        HttpSession session = request.getSession();
        ResponseBO responseBO = (ResponseBO) session.getAttribute(SESSION_STR);
        List list= new ArrayList<ResponseBO>();
        if(null!=responseBO){
            list.add(responseBO);
        }
        PageInfo<ResponseBO> pageInfo = new PageInfo<ResponseBO>(list);
        LayuiTable table = new LayuiTable(pageInfo);
        return  table;
    }

    //@描述：信息添加
    @RequestMapping("/demo.add.ajax")
    @ResponseBody

    public ResponseParams addAjax(ResponseBO  responseBO) throws IOException, UserException {
        HttpServletRequest request = RequestHolder.getRequest();
        HttpSession session = request.getSession();
        session.setAttribute(SESSION_STR,responseBO);
        return ResponseParams.success();
    }

    //@描述：信息修改
    @RequestMapping("/demo.edit.ajax")
    @ResponseBody
    public ResponseParams editAjax(ResponseBO responseBO) throws IOException, UserException {
        HttpServletRequest request = RequestHolder.getRequest();
        HttpSession session = request.getSession();
        session.setAttribute(SESSION_STR,responseBO);
        return ResponseParams.success();

    }

    //@描述：信息删除
    @RequestMapping("/demo.del.ajax")
    @ResponseBody
    public ResponseParams delAjax(ResponseBO demo) {
        HttpServletRequest request = RequestHolder.getRequest();
        HttpSession session = request.getSession();
        session.setAttribute(SESSION_STR,null);
        return ResponseParams.success();
    }

   
}


