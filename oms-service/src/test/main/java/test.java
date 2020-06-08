//package main.java;
//
//import com.ylzinfo.oms.core.exception.BusinessException;
//import com.ylzinfo.oms.service.BootApplication;
//import com.ylzinfo.oms.service.service.wxSms.SmsPushService;
//import com.ylzinfo.oms.service.util.ValidateUtil;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.context.MessageSource;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import javax.annotation.Resource;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes = BootApplication.class)
//public class test {
//
//    @Resource
//    private SmsPushService smsPushService;
//
//    @Test
//    public void sendSms(){
//        smsPushService.sendAppointMsg();
//    }
//
//    @Autowired
//    private MessageSource messageSource;
//
//    @Test
//    public void testMessageSource() {
//        System.out.println(messageSource.getMessage("param.not.null", null, null));
//    }
//
//    @Test
//    public void testValid() throws BusinessException {
//        AuthUserAddBO userAddBO = new AuthUserAddBO();
//        userAddBO.setAccount("123");
//        userAddBO.setPassword("123");
//        userAddBO.setRoleId("123");
//        userAddBO.setName("123");
//        ValidateUtil.validate(userAddBO);
//    }
//}