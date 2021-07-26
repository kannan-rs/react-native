import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};

export default function App() {
	const appName = "Guess the Number";
	const initialUserNumber = 0;
	const initialGameOver = false;

	const [initialDataLoaded, setiIitialDataLoaded] = useState(false);

	const [userNumber, setUserNumber] = useState(initialUserNumber);
	const [gameOver, setGameOver] = useState(initialGameOver);

	const [numberOfAttempts, setNumberOfAttempts] = useState(5);

	// Function Call after ASSETS loaded, this helps to load the 1st screen
	const initialLoadingDone = () => {
		setiIitialDataLoaded(true);
	};

	// CallBack to start the Game, to load the Screen #2, play game.
	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber);
	};

	// CallBack once Correct Guess is made, to load the screen #3
	const gameOverHandler = (attempts) => {
		setNumberOfAttempts(attempts);
		setGameOver(true);
	};

	// CallBack once PLAY AGAIN is clicked after the currect Guess
	const resetStartGame = () => {
		setGameOver(false);
		setUserNumber(null);
		setNumberOfAttempts(0);
	};

	return initialDataLoaded ? (
		// Load following if all the assets are loaded succesfully
		<SafeAreaView style={styles.screen}>
			<View>
				<Header title={appName} />

				{gameOver ? (
					// Scree #3 : Load Game over Screen if computer Guessed the number correctly
					<GameOverScreen
						gussedNumber={userNumber}
						numberOfAttempts={numberOfAttempts}
						playAgain={resetStartGame}
					/>
				) : userNumber ? (
					// Scree #2 : Load Game Screen if computer is ready to Guess the number
					<GameScreen numberToGuess={userNumber} guessedDone={gameOverHandler}></GameScreen>
				) : (
					// Screen #1: Provide the initial number (Human input), for the computer to guess
					<StartGameScreen onStartGamePress={startGameHandler}></StartGameScreen>
				)}
			</View>
		</SafeAreaView>
	) : (
		// Check for initial loading, and fetch all the core Assets Needed
		<AppLoading
			startAsync={fetchFonts}
			onFinish={() => initialLoadingDone()}
			onError={(err) => console.log(err)}
		/>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
