package com.example.caro.handlers;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.util.HtmlUtils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ServerSocketHandler extends TextWebSocketHandler {
    

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String request = message.getPayload();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(request);
        int id = jsonNode.get("id").asInt();

        String response = String.format("response from server to '%s'", HtmlUtils.htmlEscape(Integer.toString(id)));
        session.sendMessage(new TextMessage(response));
    }
}
