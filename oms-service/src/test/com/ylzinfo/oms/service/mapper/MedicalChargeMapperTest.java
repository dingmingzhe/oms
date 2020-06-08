//package com.ylzinfo.oms.service.mapper;
//
//import com.ylzinfo.oms.core.model.VO.operate.MedicalChargeDetailVO;
//import com.ylzinfo.oms.service.BootApplication;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.Random;
//
//import static org.junit.Assert.*;
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes = BootApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@EnableAutoConfiguration
//public class MedicalChargeMapperTest {
//
//    @Autowired
//    private MedicalChargeMapper medicalChargeMapper;
//
//    private static final String[] MERCH_ID = {"3506010001","3506810001","3506220001","3506260001","3506250001","3506290001",
//                                            "3506240001","3506280001","3506230001","3506010002"};
//    private static final Random RANDOM = new Random();
//    private static final String CARD_TYPE = "01";
//    private static final String CHANNEL = "WX_PUB";
//    private static final String PAY_STATUS = "1";
//    private static final String CHARGE_TYPE = "";
//    private static final String ORDER_TYPE = "";
//    private static final String ORDER_STATUS = "";
//    private static final String CARD_ID = "";
//    private static final String USER_ID = "";
//    private static final String OPER_NAME = "";
//    private static final String OPER_ID = "";
//    @Test
//    public void getChargeDetail() {
//        MedicalChargeDetailVO medicalChargeDetailVO = medicalChargeMapper.getChargeDetail("20181211190127512DS3JCEGIZC");
//    }
//}