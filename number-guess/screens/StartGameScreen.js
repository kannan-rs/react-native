import React, { useState } from "react";
import {
	Button,
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	ColorPropType,
} from "react-native";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberDisplay from "../components/NumberDisplay";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

import DefaultStyles from "../constants/defaultStyles";

const StartGameScreen = (props) => {
	const numberOfDigit = 100;
	const initialNumberToGuess = parseInt(Math.random() * numberOfDigit).toString();
	const [numberToBeGuessed, setnumberToBeGuessed] = useState(initialNumberToGuess);

	const [confirmed, setConfirmed] = useState(false);

	const [selectedNumber, setSelectedNumber] = useState(false);

	const setGuessNumber = (value) => {
		value = value.replace(/[^0-9]/g, "");
		setnumberToBeGuessed(value);
	};

	const resetInputHandler = () => {
		setConfirmed(false);
		setnumberToBeGuessed("");
	};

	const confirmInputHandler = () => {
		const choosenNumber = parseInt(numberToBeGuessed);
		if (
			isNaN(choosenNumber) ||
			choosenNumber == "" ||
			choosenNumber <= 0 ||
			choosenNumber >= numberOfDigit
		) {
			Alert.alert("Invalid Number", "Number has to be between 1 and 99.", [
				{ text: "Okey", style: "destructive", onPress: resetInputHandler },
			]);
			setConfirmed(false);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(parseInt(numberToBeGuessed));
		setnumberToBeGuessed("");
		Keyboard.dismiss();
	};

	const handleStartGamePress = () => {
		props?.onStartGamePress(selectedNumber);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.gameStartScreen}>
				<Text style={styles.title}>Start a New Game</Text>
				<Card style={styles.contentContainer}>
					<BodyText>Key In a Number</BodyText>
					<Text style={{ ...DefaultStyles?.bodyText }}>Computer is going to guess this number</Text>
					<Input
						placeholder="Enter The Number"
						style={styles?.input}
						blurOnSubmit
						// autoCapitalize="none" // Needed for text input and not for number input
						// autoCorrect={false}
						keyboardType="number-pad"
						maxLength={2}
						value={numberToBeGuessed}
						onChangeText={setGuessNumber}
					/>
					<View style={styles.buttonContainers}>
						<View style={styles.button}>
							<Button
								color={Colors.COLOR_BUTTON_PRIMARY}
								title="Confirm"
								onPress={() => confirmInputHandler()}
							/>
						</View>
						<View style={styles.button}>
							<Button
								style={styles.buttonCancel}
								color={Colors.COLOR_BUTTON_SECONDARY}
								title="Reset"
								onPress={() => resetInputHandler()}
							/>
						</View>
					</View>
				</Card>

				{confirmed ? (
					<Card style={styles?.choosenNumberDisplayCard}>
						<Text style={styles?.choosenNumberText}>You Selected</Text>
						<NumberDisplay style={styles.numberDisplayContainer}>{selectedNumber}</NumberDisplay>
						<View style={{ ...styles?.buttonContainers, ...styles?.startGameButtonContainer }}>
							{/* <Button
								style={{ ...styles?.button, ...styles?.startGameButton }}
								color={Colors.COLOR_PRIMARY}
								onPress={() => handleStartGamePress()}
								title="Start Game"
							/> */}
							<MainButton onPress={handleStartGamePress}>Start Game</MainButton>
						</View>
					</Card>
				) : null}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	gameStartScreen: {
		alignItems: "center",
		padding: 10,
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: "open-sans-bold",
	},

	contentContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},

	buttonContainers: {
		width: "80%",
		flexDirection: "row-reverse",
		justifyContent: "space-between",
		paddingTop: 15,
	},

	button: {
		width: 100,
	},

	input: {
		borderBottomWidth: 1,
		height: 40,
		width: "80%",
		marginHorizontal: "10%",
		textAlign: "center",
		justifyContent: "center",
		marginVertical: 10,
	},

	choosenNumberDisplayCard: {
		width: "100%",
		marginVertical: 20,
	},

	choosenNumberText: {
		width: "80%",
		textAlign: "center",
		marginHorizontal: "10%",
		fontSize: 22,
		color: Colors.COLOR_PRIMARY,
	},

	numberDisplayContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "80%",
		marginHorizontal: "10%",
	},

	startGameButtonContainer: {
		justifyContent: "center",
		marginHorizontal: "10%",
	},

	startGameButton: {},
});
export default StartGameScreen;
