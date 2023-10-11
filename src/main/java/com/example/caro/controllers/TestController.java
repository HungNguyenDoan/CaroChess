package com.example.caro.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TestController {
    @MessageMapping("/hello")
    @SendTo("topic/demo")
    public String sayHello() throws Exception {
        Thread.sleep(1000);
        return new String("hello bitch");
    }
}
