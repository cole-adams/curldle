import { createSlice } from "@reduxjs/toolkit"

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        played: 0,
        lastPlayed: '1970-01-01',
        wins: 0,
        currentStreak: 0,
        maxStreak: 0,
        guessDistribution: {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0
        },
        currentGame: {
            input: 0,
            boards: []
        }
    },
    reducers: {
        completeGame: (state, action) => {
            state.played += 1
            state.wins += (action.payload.win?1:0)
            state.currentStreak += 1
            if (state.currentStreak > state.maxStreak) {
                state.maxStreak = state.currentStreak
            }
            if (action.payload.win) {
                state.guessDistribution[action.payload.gueses] += 1
            }
        },
        submitGuess: (state, action) => {
            state.currentGame = action.payload.currentGame
            state.lastPlayed = action.payload.lastPlayed
        }
    }
});

export const { completeGame, submitGuess } = statisticsSlice.actions

export default statisticsSlice.reducer