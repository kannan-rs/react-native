import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberDisplay from "../components/NumberDisplay";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const GameOverScreen = (props) => {
	const playAgain = () => {
		props?.playAgain();
	};

	return (
		<Card style={styles.screen}>
			<View>
				<TitleText>Game Over</TitleText>
			</View>
			<View style={styles.imageContainer}>
				{
					// Loading images from local assets
					<Image
						style={styles.image}
						source={require("../assets/images/success.png")}
						resizeMode="cover"
					/>
				}
				{/* <Image
					source={{
						uri: "https://cdn.pixabay.com/photo/2021/07/20/04/26/lily-6479701_960_720.jpg",
					}}
					style={styles.image}
					resizeMode="cover"
				/> */}
			</View>
			<View style={styles.resultContainer}>
				<BodyText style={styles.resultText}>
					Well Done!!!! - The Game is Over !. Your Phone took{" "}
					<Text style={styles.highlight}>{props?.numberOfAttempts}</Text>
					attempts to guess <Text style={styles.highlight}>{props?.gussedNumber}</Text>
				</BodyText>
				{/* <NumberDisplay>{props?.gussedNumber}</NumberDisplay> */}
			</View>
			{/* <View>
				<BodyText>Number of attempts</BodyText>
				<NumberDisplay>{props?.numberOfAttempts}</NumberDisplay>
			</View> */}
			<View>
				<MainButton onPress={playAgain}>Play Again !!</MainButton>
				{/* <Button title="Play Again !!" onPress={playAgain} /> */}
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	screen: {
		// borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
		height: "85%",
	},

	imageContainer: {
		width: "75%",
		height: 270,
		borderWidth: 3,
		borderRadius: 250,
		overflow: "hidden",
		marginVertical: 20,
	},
	image: {
		// Image Height and width is Must needed for images downaloaded from Web
		// For Local images if the image is in perfect size then Height and Width settings is not needed
		width: "100%",
		height: "100%",
	},

	highlight: {
		color: Colors.COLOR_PRIMARY,
		fontFamily: "open-sans-bold",
	},
	resultContainer: {
		width: "80%",
		marginVertical: 15,
	},

	resultText: {
		textAlign: "center",
		fontSize: 16,
	},
});
export default GameOverScreen;
