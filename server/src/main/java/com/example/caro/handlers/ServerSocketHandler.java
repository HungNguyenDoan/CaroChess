package com.example.caro.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.util.HtmlUtils;

import com.example.caro.gameplays.MinMax;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ServerSocketHandler extends TextWebSocketHandler {
    @Autowired
    private MinMax minMax;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String request = message.getPayload();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(request);
        Long id = jsonNode.get("id").asLong();
        String chessTable = jsonNode.get("chess").asText();
        String chessResponse = minMax.process(chessTable, 2, id);
        String response = String.format("%s", HtmlUtils.htmlEscape(chessResponse));
        session.sendMessage(new TextMessage(response));
    }
}
