package com.example.caro.utils;

import org.springframework.stereotype.Component;

@Component
public class CaroChessUtils {
    private int size = 20;
    private int[][] board;

    public int[][] convertStringToTable(String chessStatus) {
        for (int i = 0; i < size; ++i) {
            for (int j = 0; j < size; ++j) {
                char c = chessStatus.charAt(i * size + j);
                board[i][j] = Character.getNumericValue(c);
            }
        }
        return board;
    }

    public String convertTableToString(int[][] chessTable) {
        String response = "";
        for (int i = 0; i < size; ++i) {
            for (int j = 0; j < size; ++j) {
                response += chessTable[i][j];
            }
        }
        return response;
    }

    public boolean checkWinner(int player) {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j <= size - 5; j++) {
                boolean win = true;
                for (int k = 0; k < 5; k++) {
                    if (board[i][j + k] != player) {
                        win = false;
                        break;
                    }
                }
                if (win) {
                    return true;
                }
            }
        }

        for (int i = 0; i < size; i++) {
            for (int j = 0; j <= size - 5; j++) {
                boolean win = true;
                for (int k = 0; k < 5; k++) {
                    if (board[j + k][i] != player) {
                        win = false;
                        break;
                    }
                }
                if (win) {
                    return true;
                }
            }
        }

        for (int i = 0; i <= size - 5; i++) {
            for (int j = 0; j <= size - 5; j++) {
                boolean win = true;
                for (int k = 0; k < 5; k++) {
                    if (board[i + k][j + k] != player) {
                        win = false;
                        break;
                    }
                }
                if (win) {
                    return true;
                }
            }
        }

        for (int i = 0; i <= size - 5; i++) {
            for (int j = size - 1; j >= 4; j--) {
                boolean win = true;
                for (int k = 0; k < 5; k++) {
                    if (board[i + k][j - k] != player) {
                        win = false;
                        break;
                    }
                }
                if (win) {
                    return true;
                }
            }
        }

        return false;
    }

    private boolean isBoardFull() {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                if (board[i][j] == ' ') {
                    return false;
                }
            }
        }
        return true;
    }

    public boolean checkGameOver() {
        return this.checkWinner(1) || this.checkWinner(2) || this.isBoardFull();
    }

    public boolean checkLegalMove(int row, int col){
        if (row < 0 || row >= size || col < 0 || col >= size || board[row][col] != 0) {
            return false;
        }
        return true;
    }
}
