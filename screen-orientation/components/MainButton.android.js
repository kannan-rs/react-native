import React from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback,
} from "react-native";
import Colors from "../constants/colors";

const MainButton = (props) => {
	let ButtonComponent = TouchableOpacity;

	if (Platform.OS === "android" && Platform.Version >= 21) {
		ButtonComponent = TouchableNativeFeedback;
	}
	return (
		<View style={styles.buttonContainer}>
			<ButtonComponent
				activeOpacity={0.6}
				onPress={() => {
					props?.onPress();
				}}
			>
				<View style={{ ...styles.button, ...props?.buttonOuterStyle }}>
					<Text style={{ ...styles.buttonText, ...props?.buttonTextStyle }}>{props.children}</Text>
				</View>
			</ButtonComponent>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 25,
		overflow: "hidden",
	},
	button: {
		backgroundColor: Colors.COLOR_PRIMARY,
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 25,
	},
	buttonText: {
		color: "#FFFFFF",
		fontFamily: "open-sans",
		fontSize: 18,
		textShadowColor: "#D3D3D3",
	},
});
export default MainButton;
