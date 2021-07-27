import React, { useEffect, useState } from "react";
import {
	Button,
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberDisplay from "../components/NumberDisplay";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

import DefaultStyles from "../constants/defaultStyles";

const StartGameScreen = (props) => {
	// console.log(Dimensions.get("window")); // Dimensions API to get the Screen width
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

	useEffect(() => {
		/* 
		Capture Dimention change Event,
		Fires on Screen rotate
		*/
		Dimensions.addEventListener("change", () => {
			console.log("Screen Rotated done");
			updateLayout();
		});

		const updateLayout = () => {
			// Set any changes that need to be updated on layout
			console.log(Dimensions.get("window"));
		};
		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	}, []);

	return (
		<ScrollView>
			<KeyboardAvoidingView behaviour="position" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View style={styles.gameStartScreen}>
						<Text style={styles.title}>Start a New Game</Text>
						<Card style={styles.contentContainer}>
							<BodyText>Key In a Number</BodyText>
							<Text style={{ ...DefaultStyles?.bodyText }}>
								Computer is going to guess this number
							</Text>
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
								<NumberDisplay style={styles.numberDisplayContainer} textStyle={styles?.number}>
									{selectedNumber}
								</NumberDisplay>
								<View style={{ ...styles?.buttonContainers, ...styles?.startGameButtonContainer }}>
									{/* <Button
								style={{ ...styles?.button, ...styles?.startGameButton }}
								color={Colors.COLOR_PRIMARY}
								onPress={() => handleStartGamePress()}
								title="Start Game"
							/> */}
									<MainButton
										onPress={handleStartGamePress}
										buttonOuterStyle={styles.startGameButton}
									>
										Start Game
									</MainButton>
								</View>
							</Card>
						) : null}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	gameStartScreen: {
		alignItems: "center",
		padding: 10,
		minHeight: 500,
	},

	title: {
		fontSize: 20,
		marginBottom: 10,
		fontFamily: "open-sans-bold",
	},

	contentContainer: {
		// width: "100%",
		// justifyContent: "center",
		// alignItems: "center",

		width: "100%",
		alignItems: "center",
	},

	input: {
		borderBottomWidth: 1,
		height: Dimensions.get("window").height <= 500 ? 35 : 40,
		// width: "80%",
		marginHorizontal: "10%",
		textAlign: "center",
		// justifyContent: "center",
		marginVertical: Dimensions.get("window").height <= 500 ? 0 : 10,
	},

	buttonContainers: {
		width: "80%",
		flexDirection: "row-reverse",
		justifyContent: "space-between",
		paddingTop: Dimensions.get("window").height <= 500 ? 5 : 15,
	},

	button: {
		// width: 100,

		minWidth: 100 > Dimensions.get("window").width / 4 ? Dimensions.get("window").width / 4 : 100,
		maxWidth: 100,
	},

	choosenNumberDisplayCard: {
		width: "100%",
		alignItems: "center",
		marginVertical: Dimensions.get("window").height <= 550 ? 10 : 20,
	},

	choosenNumberText: {
		width: "80%",
		textAlign: "center",
		marginHorizontal: "10%",
		fontSize: Dimensions.get("window").height <= 550 ? 15 : 22,
		color: Colors.COLOR_PRIMARY,
	},

	numberDisplayContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "80%",
		marginHorizontal: "10%",
	},

	number: { fontSize: Dimensions.get("window").height <= 550 ? 15 : 22 },

	startGameButtonContainer: {
		justifyContent: "center",
		marginHorizontal: "10%",
	},

	startGameButton: {},
});
export default StartGameScreen;
