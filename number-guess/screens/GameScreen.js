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
} from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberDisplay from "../components/NumberDisplay";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

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

const GameScreen = (props) => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);

	// const [lowerNumberGuessed, setLowerNumberGuessed] = useState(1);
	// const [higherNumberGuessed, setHigherNumberGuessed] = useState(100);
	const lowerNumberGuessed = useRef(1);
	const higherNumberGuessed = useRef(100);

	// const [isGuessedCorrectly, setIsGuessedCorrectly] = useState(false);

	const [attempts, setAttempts] = useState(0);
	const [pastGuess, setpastGuess] = useState([initialGuess, 24, 3, 22]);

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

	return (
		<View style={styles?.screen}>
			<NumberDisplay>{currentGuess}</NumberDisplay>
			{
				//!isGuessedCorrectly ? (
				<Card style={styles?.buttonContainer}>
					<View style={styles?.button}>
						{/* <Button title="Lower" onPress={() => nextGuessHandler("lower")} /> */}
						{/* <MainButton onPress={() => nextGuessHandler("lower")}>Lower</MainButton> */}
						<MainButton onPress={() => nextGuessHandler("lower")}>
							<Ionicons name="md-remove" size={24} color="white" />
						</MainButton>
					</View>
					<View style={styles?.button}>
						{/* <Button title="Greater" onPress={() => nextGuessHandler("higher")} /> */}
						{/* <MainButton onPress={() => nextGuessHandler("higher")}>Greater</MainButton> */}
						<MainButton onPress={() => nextGuessHandler("higher")}>
							<Ionicons name="md-add" size={24} color="white" />
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
					<TitleText>Guessed Numbers</TitleText>
				</View>
				<View style={styles?.guessedList}>
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

	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: "100%",
	},

	button: {
		//width: 100,
	},

	playContainer: {
		width: "100%",
		alignItems: "center",
	},

	guessedListContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 20,
		width: "100%",
	},

	guessedList: {
		width: "80%",
		justifyContent: "space-between",
		alignItems: "center",
		flexGrow: 0,
		maxHeight: 350,
	},

	scrollList: {
		alignItems: "center",
		flexGrow: 1,
		justifyContent: "flex-end",
	},

	list: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		height: 40,
		marginVertical: 10,
		paddingHorizontal: 20,
		width: "80%",
		alignItems: "center",
	},
});
export default GameScreen;
