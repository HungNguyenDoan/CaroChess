package com.example.caro.gameplays;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.caro.utils.CaroChessUtils;

public class AlphaBeta {

    @Autowired
    private CaroChessUtils caroChessUtils;

    public String process(String chessData) {
        int[][] tableStatus = caroChessUtils.convertStringToTable(chessData);
        return "";
    }

    private int[] findTheBestMove(int[][] tableNow, int depth, int player, int alpha, int beta) {
        int[] bestMove = new int[] { -1, -1 };
        return;
    }

    private ArrayList<int[]> generateLegalMoves(int[][] chessTable) {
        ArrayList<int[]> legalMove = new ArrayList<>();
        for (int i = 0; i < 20; ++i) {
            for (int j = 0; j < 20; ++j) {
                if (caroChessUtils.checkLegalMove(i, j)) {
                    legalMove.add(new int[] { i, j });
                }
            }
        }
    }
}
