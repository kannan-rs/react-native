import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

const Input = (props) => {
	const initialValue = ""; //parseInt(Math.random() * 100000).toString();
	const [value, setValue] = useState(initialValue);

	const setValueFromInput = (value) => {
		setValue(value);
	};

	return (
		<View style={styles?.inputContainer}>
			<TextInput {...props} style={{ ...styles?.input, ...props?.style }} />
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		textAlign: "center",
	},
});
export default Input;
