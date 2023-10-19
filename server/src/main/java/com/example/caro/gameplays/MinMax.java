package com.example.caro.gameplays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.example.caro.repositories.GameRepository;

import com.example.caro.utils.CaroChessUtils;

@Component
public class MinMax {
    @Autowired
    private CaroChessUtils caroChessUtils;

    @Autowired
    private GameRepository gameRepository;

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
                    int score = minimax(board, 0, false, player);
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

    private int minimax(int[][] board, int depth, boolean isMaximizing, int player) {
        int result = evaluate(board, player);

        if (result != 0) {
            return result;
        }

        if (isMaximizing) {
            int bestScore = Integer.MIN_VALUE;
            for (int i = 0; i < 20; i++) {
                for (int j = 0; j < 20; j++) {
                    if (board[i][j] == 0) {
                        board[i][j] = 1;
                        int score = minimax(board, depth + 1, false, player);
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
                        board[i][j] = 2;
                        int score = minimax(board, depth + 1, true, player);
                        board[i][j] = 0;
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

    private int evaluate(int[][] board, int player) {
        int score = 0;
        for (int i = 0; i < 20; i++) {
            for (int j = 0; j < 20; j++) {
                if (board[i][j] == player) {
                    int horizontalScore = evaluateDirection(board, player, i, j, 0, 1);
                    int verticalScore = evaluateDirection(board, player, i, j, 1, 0);
                    int diagonal1Score = evaluateDirection(board, player, i, j, 1, 1);
                    int diagonal2Score = evaluateDirection(board, player, i, j, 1, -1);
                    score += horizontalScore + verticalScore + diagonal1Score + diagonal2Score;
                }
            }
        }
        return score;
    }

    private int evaluateDirection(int[][] board, int player, int row, int col, int deltaRow, int deltaCol) {
        int score = 0;
        int consecutivePieces = 0;

        for (int step = -4; step <= 4; step++) {
            int r = row + step * deltaRow;
            int c = col + step * deltaCol;

            if (r >= 0 && r < 20 && c >= 0 && c < 20) {
                if (board[r][c] == player) {
                    consecutivePieces++;
                } else if (board[r][c] != 0) {
                    score += evaluateConsecutivePieces(consecutivePieces);
                    consecutivePieces = 0;
                }
            }
        }
        score += evaluateConsecutivePieces(consecutivePieces);

        return score;
    }

    private int evaluateConsecutivePieces(int consecutivePieces) {
        if (consecutivePieces >= 5) {
            return 10000; // Nếu có 5 dấu liên tiếp, người chơi thắng
        } else if (consecutivePieces == 4) {
            return 1000; // Nếu có 4 dấu liên tiếp, tình huống tốt
        } else if (consecutivePieces == 3) {
            return 100; // Nếu có 3 dấu liên tiếp, tình huống tiềm năng
        } else if (consecutivePieces == 2) {
            return 10; // Nếu có 2 dấu liên tiếp, tình huống cần quan tâm
        } else {
            return 0; // Nếu không có dấu liên tiếp, không đánh giá điểm
        }
    }
}
