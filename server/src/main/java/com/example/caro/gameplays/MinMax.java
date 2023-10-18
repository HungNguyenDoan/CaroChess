package com.example.caro.gameplays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.caro.utils.CaroChessUtils;

@Component
public class MinMax {
    @Autowired
    private CaroChessUtils caroChessUtils;

    public String process(String chessTable, int player) {
        int[][] board = caroChessUtils.convertStringToTable(chessTable);
        int[] bestMove = findBestMove(board, player);
        int row = bestMove[0];
        int col = bestMove[1];
        board[row][col] = 2;
        return caroChessUtils.convertTableToString(board);
    }

    private int[] findBestMove(int[][] board, int player) {
        int[] bestMove = new int[] { -1, -1 };
        int bestScore = Integer.MIN_VALUE;

        for (int i = 0; i < 20; i++) {
            for (int j = 0; j < 20; j++) {
                if (board[i][j] == 0 && caroChessUtils.checkLegalMove(i, j)) {
                    board[i][j] = player;
                    int score = minimax(board, 0, false);
                    board[i][j] = 0;

                    if (score > bestScore) {
                        bestScore = score;
                        bestMove[0] = i;
                        bestMove[1] = j;
                    }
                }
            }
        }

        return bestMove;
    }

    private int minimax(int[][] board, int depth, boolean isMaximizing) {
        int result = 0;

        if (result != 0) {
            return result;
        }

        if (isMaximizing) {
            int bestScore = Integer.MIN_VALUE;
            for (int i = 0; i < 20; i++) {
                for (int j = 0; j < 20; j++) {
                    if (board[i][j] == 0) {
                        board[i][j] = 1; // 1 đại diện cho 'X'
                        int score = minimax(board, depth + 1, false);
                        board[i][j] = 0;
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            int bestScore = Integer.MAX_VALUE;
            for (int i = 0; i < 20; i++) {
                for (int j = 0; j < 20; j++) {
                    if (board[i][j] == 0) {
                        board[i][j] = 2; // 2 đại diện cho 'O'
                        int score = minimax(board, depth + 1, true);
                        board[i][j] = 0;
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }
    
}
