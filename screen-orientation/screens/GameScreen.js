import React, { useState, useRef, useEffect } from "react";
import {
	View,
	StyleSheet,
	Keyboard,
	Button,
	Text,
	Alert,
	FlatList,
	ScrollView,
	Dimensions,
} from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberDisplay from "../components/NumberDisplay";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

// Orientation from expo
import * as ScreenOrientation from "expo-screen-orientation";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.ceil(max);
	const randomNumber = Math.floor(Math.random() * (max - min)) + min;

	// if (randomNumber === exclude) {
	// 	return generateRandomBetween(min, max, exclude);
	// } else {
	return randomNumber;
	//}
};

const windowSize = Dimensions.get("window");
const smallScreen = windowSize.height < 600;

const GameScreen = (props) => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);

	const initialDeviceWidth = Dimensions.get("window").width;
	const initialDeviceHeight = Dimensions.get("window").height;

	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

	const [availableDeviceWidth, setavailableDeviceWidth] = useState(initialDeviceWidth);
	const [availableDeviceHeight, setavailableDeviceHeight] = useState(initialDeviceHeight);

	// const [lowerNumberGuessed, setLowerNumberGuessed] = useState(1);
	// const [higherNumberGuessed, setHigherNumberGuessed] = useState(100);
	const lowerNumberGuessed = useRef(1);
	const higherNumberGuessed = useRef(100);

	// const [isGuessedCorrectly, setIsGuessedCorrectly] = useState(false);

	const [attempts, setAttempts] = useState(0);
	const [pastGuess, setpastGuess] = useState([initialGuess]);

	const numberToGuess = props?.numberToGuess;

	const nextGuessHandler = (direction) => {
		if (
			(direction == "lower" && currentGuess < numberToGuess) ||
			(direction == "higher" && currentGuess > numberToGuess)
		) {
			Alert.alert("Dont Cheat", "Provide the right hint", [{ text: "Sorry!!", style: "cancel" }]);
			return;
		}

		if (direction == "lower") {
			higherNumberGuessed.current = currentGuess;
		} else {
			lowerNumberGuessed.current = currentGuess;
		}

		const number = generateRandomBetween(
			lowerNumberGuessed.current + 1,
			higherNumberGuessed.current - 1,
			currentGuess
		);

		setCurrentGuess(number);
		setAttempts((attempts) => attempts + 1);
		setpastGuess((pastGuess) => [number, ...pastGuess]);
	};

	const { guessedDone } = props;

	useEffect(() => {
		if (numberToGuess === currentGuess) {
			guessedDone(attempts);
		}
		return () => {
			// No Effect callbacks now
		};
	}, [currentGuess, numberToGuess, guessedDone]);

	/* Effect to update the set the state for layout changes based on screen orientation. */
	useEffect(() => {
		const updateLayout = () => {
			setavailableDeviceHeight(Dimensions.get("window").height);
			setavailableDeviceWidth(Dimensions.get("window").width);
		};

		Dimensions.addEventListener("change", () => {
			updateLayout();
		});

		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	return (
		<View style={styles?.screen}>
			{availableDeviceHeight >= 500 ? (
				<NumberDisplay style={smallScreen ? styles?.numberDisplaySmall : ""}>
					{currentGuess}
				</NumberDisplay>
			) : null}

			{
				//!isGuessedCorrectly ? (
				<Card style={{ ...styles?.buttonContainer, ...styles?.smallScreenCard }}>
					<View style={styles?.button}>
						{/* <Button title="Lower" onPress={() => nextGuessHandler("lower")} /> */}
						{/* <MainButton onPress={() => nextGuessHandler("lower")}>Lower</MainButton> */}
						<MainButton
							onPress={() => nextGuessHandler("lower")}
							buttonOuterStyle={smallScreen ? styles.smallButtonIcoicon : ""}
						>
							<Ionicons name="md-remove" size={smallScreen ? 18 : 24} color="white" />
						</MainButton>
					</View>
					{availableDeviceHeight >= 500 ? null : (
						<View style={styles?.button}>
							<NumberDisplay style={styles?.numberDisplaySmall} textStyle={{ fontSize: 15 }}>
								{currentGuess}
							</NumberDisplay>
						</View>
					)}
					<View style={styles?.button}>
						{/* <Button title="Greater" onPress={() => nextGuessHandler("higher")} /> */}
						{/* <MainButton onPress={() => nextGuessHandler("higher")}>Greater</MainButton> */}
						<MainButton
							onPress={() => nextGuessHandler("higher")}
							buttonOuterStyle={smallScreen ? styles.smallButtonIcoicon : ""}
						>
							<Ionicons name="md-add" size={smallScreen ? 15 : 24} color="white" />
						</MainButton>
					</View>
				</Card>

				//) : (
				// <Card style={styles?.playContainer}>
				// 	<Text>You Guessed the user provided number Correctly</Text>
				// 	<View style={styles?.buttonContainer}>
				// 		{/* <View style={styles?.buttonPlay}>
				// 			<Button title="Play again!!" onPress={() => props.playAgain(0)} />
				// 		</View> */}
				// 	</View>
				// </Card>
				//)
			}
			<Card style={styles?.guessedListContainer}>
				<View>
					<TitleText textStyle={smallScreen ? styles.smallText : ""}>Guessed Numbers</TitleText>
				</View>
				<View
					style={
						availableDeviceHeight >= 500 ? styles?.guessedList : styles?.landscapeMpdeGuessList
					}
				>
					{/* <ScrollView contentContainerStyle={styles?.scrollList}>
						{pastGuess.map((guess, index) => (
							<View key={guess} style={styles.list}>
								<BodyText>#{pastGuess.length - index}</BodyText>
								<Text> - </Text>
								<BodyText>{guess}</BodyText>
							</View>
						))}
					</ScrollView> */}
					<FlatList
						contentContainerStyle={styles?.scrollList}
						data={pastGuess}
						KeyExtractor={(item) => item.toString()}
						renderItem={(itemData) => (
							<View key={itemData.index.toString()} style={styles.list}>
								<BodyText>#{pastGuess.length - itemData.index}</BodyText>
								<Text> - </Text>
								<BodyText>{itemData.item}</BodyText>
							</View>
						)}
					></FlatList>
				</View>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		alignItems: "center",
		padding: 10,
		width: "100%",
	},

	smallScreenCard: {
		paddingVertical: 5,
	},

	numberDisplaySmall: {
		padding: 0,
		margin: 0,
	},

	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: smallScreen ? 5 : 20,
		width: "100%",
	},

	button: {
		//width: 70,
		// height: 30,
	},

	smallButtonIcoicon: {
		padding: 5,
		borderRadius: 15,
	},

	playContainer: {
		width: "100%",
		alignItems: "center",
	},

	guessedListContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: smallScreen ? 5 : 20,
		width: "100%",
	},

	smallText: { fontSize: 16 },

	guessedList: {
		width: "80%",
		justifyContent: "space-between",
		alignItems: "center",
		flexGrow: 0,
		maxHeight: smallScreen ? 210 : 350,
	},

	landscapeMpdeGuessList: {
		width: "80%",
		justifyContent: "space-between",
		alignItems: "center",
		flexGrow: 0,
		maxHeight: 120,
	},

	scrollList: {
		alignItems: "center",
		flexGrow: 1,
		justifyContent: "flex-end",
	},

	list: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		height: smallScreen ? 25 : 40,
		marginVertical: smallScreen ? 5 : 10,
		paddingHorizontal: 20,
		width: "80%",
		alignItems: "center",
	},
});
export default GameScreen;
