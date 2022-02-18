import { createSlice } from "@reduxjs/toolkit"

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        gamesPlayed: 0,
        lastGameId: 0,
        wins: 0,
        currentStreak: 0,
        maxStreak: 0,
        guessDistribution: [0,0,0,0,0,0],
        currentGame: {
            gameId: 0,
            gameGuesses: []
        },
        finished: false,
        won: false
    },
    reducers: {
        startGame: (state, action) => {
            if (!state.won || state.currentGame.gameId + 1 !== action.payload.gameId) {
                state.currentStreak = 0;
            }
            state.finished = false;
            state.won = false;
            state.currentGame = {
                gameId: action.payload.gameId,
                gameGuesses: []
            }
        },
        completeGame: (state, action) => {
            state.finished = true;
            state.won = action.payload.win;

            state.gamesPlayed += 1

            if (action.payload.win) {
                state.wins+=1
                state.guessDistribution[action.payload.guesses-1]+=1
                state.currentStreak += 1
                if (state.currentStreak > state.maxStreak) {
                    state.maxStreak = state.currentStreak
                }
            } else {
                state.currentStreak = 0
            }
        },
        submitGuess: (state, action) => {
            state.currentGame.gameGuesses.push(action.payload.guess)
            state.currentGame.gameId = action.payload.id
            state.lastGameId = action.payload.id
        }
    }
});

export const { startGame, completeGame, submitGuess } = statisticsSlice.actions

export default statisticsSlice.reducer