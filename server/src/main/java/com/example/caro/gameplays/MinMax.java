package com.example.caro.gameplays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.caro.models.Game;
import com.example.caro.repositories.GameRepository;
import com.example.caro.services.GameService;
import com.example.caro.utils.CaroChessUtils;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class MinMax {
    @Autowired
    private CaroChessUtils caroChessUtils;

    @Autowired
    private GameService gameService;

    public String process(String chessTable, int player, Long id) {
        int[][] board = caroChessUtils.convertStringToTable(chessTable);
        if (caroChessUtils.checkWinner(1)) {
            gameService.updateGame(chessTable, id, 1);
            return "win";
        }
        int[] bestMove = findBestMove(board, player);
        int row = bestMove[0];
        int col = bestMove[1];
        board[row][col] = 2;
        caroChessUtils.setBoard(board);
        if (caroChessUtils.checkWinner(2)) {
            gameService.updateGame(chessTable, id, 0);
            return "lose";
        }
        return caroChessUtils.convertTableToString(board);
    }

    private int[] findBestMove(int[][] board, int player) {
        log.info("finding best move for player: " + player);
        int[] bestMove = new int[] { -1, -1 };
        int bestScore = (player == 1) ? Integer.MIN_VALUE : Integer.MAX_VALUE; // Sử dụng MIN_VALUE hoặc MAX_VALUE tùy
                                                                               // thuộc vào người chơi

        for (int i = 0; i < 15; i++) {
            for (int j = 0; j < 15; j++) {
                if (board[i][j] == 0 && caroChessUtils.checkLegalMove(i, j)) {
                    board[i][j] = player;
                    log.info("i j " + i + " " + j);
                    int score = minimax(board, 2, false, (player == 1) ? 2 : 1); // Chuyển đổi người chơi
                    log.info("score: " + score);
                    board[i][j] = 0;
                    if ((player == 1 && score > bestScore) || (player == 2 && score < bestScore)) {
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
        if (depth == 0 || result != 0) {
            return result;
        }

        if (isMaximizing) {
            int bestScore = Integer.MIN_VALUE;
            for (int i = 0; i < 15; i++) {
                for (int j = 0; j < 15; j++) {
                    if (board[i][j] == 0 && caroChessUtils.checkLegalMove(i, j)) {
                        board[i][j] = player;
                        int score = minimax(board, depth - 1, false, player);
                        board[i][j] = 0;
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            int bestScore = Integer.MAX_VALUE;
            int opponentPlayer = (player == 1) ? 2 : 1; // Chuyển đổi người chơi tối thiểu
            for (int i = 0; i < 15; i++) {
                for (int j = 0; j < 15; j++) {
                    if (board[i][j] == 0 && caroChessUtils.checkLegalMove(i, j)) {
                        board[i][j] = opponentPlayer; // Đổi người chơi tối thiểu
                        int score = minimax(board, depth - 1, true, opponentPlayer); // Chuyển đổi người chơi tối thiểu
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
        for (int i = 0; i < 15; i++) {
            for (int j = 0; j < 15; j++) {
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
        int consecutivePieces = 0;
        int openEnds = 0;
        int maxConsecutivePieces = 0;
    
        for (int step = -4; step <= 4; step++) {
            int r = row + step * deltaRow;
            int c = col + step * deltaCol;
    
            if (r >= 0 && r < 15 && c >= 0 && c < 15) {
                if (board[r][c] == player) {
                    consecutivePieces++;
                    maxConsecutivePieces = Math.max(maxConsecutivePieces, consecutivePieces);
                } else if (board[r][c] == 0) {
                    openEnds++;
                    consecutivePieces++;
                } else {
                    if (openEnds == 1) {
                        // Nếu có 1 ô trống ở giữa
                        if (maxConsecutivePieces == 4) {
                            return 1000; // 4 dấu liên tiếp và 1 ô trống
                        } else if (maxConsecutivePieces == 3) {
                            return 100; // 3 dấu liên tiếp và 1 ô trống
                        }
                    } else if (openEnds == 2) {
                        // Nếu có 2 ô trống ở 2 đầu
                        if (maxConsecutivePieces == 4) {
                            return 1000; // 4 dấu liên tiếp và 2 ô trống
                        } else if (maxConsecutivePieces == 3) {
                            return 100; // 3 dấu liên tiếp và 2 ô trống
                        }
                    }
                    openEnds = 0;
                    consecutivePieces = 0;
                }
            }
        }
    
        if (maxConsecutivePieces >= 5) {
            return 10000; // Nếu có 5 dấu liên tiếp, người chơi thắng
        } else if (maxConsecutivePieces == 4) {
            return 1000; // 4 dấu liên tiếp, tình huống tốt
        } else if (maxConsecutivePieces == 3) {
            return 100; // 3 dấu liên tiếp, tình huống tiềm năng
        } else if (maxConsecutivePieces == 2) {
            return 10; // 2 dấu liên tiếp, tình huống cần quan tâm
        } else {
            return 0; // Nếu không có trường hợp đặc biệt, không đánh giá điểm
        }
    }
    
}
