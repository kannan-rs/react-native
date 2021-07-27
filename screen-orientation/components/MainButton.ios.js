import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";

const MainButton = (props) => {
	return (
		<View style={styles.buttonContainer}>
			<TouchableOpacity
				activeOpacity={0.6}
				onPress={() => {
					props?.onPress();
				}}
			>
				<View style={{ ...styles.button, ...props?.buttonOuterStyle }}>
					<Text style={{ ...styles.buttonText, ...props?.buttonTextStyle }}>{props.children}</Text>
				</View>
			</TouchableOpacity>
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
