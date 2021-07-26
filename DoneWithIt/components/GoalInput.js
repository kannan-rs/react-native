import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Modal } from "react-native";


const GoalInput = props => {
    const initialGoalInput = "";
    const [enteredGoal, setEnteredGoal] = useState(initialGoalInput);

    const goalInputChange = (value) => {
		setEnteredGoal(value);
    };

    const handleAddButtonClick = () => {
        if (enteredGoal != "") {
            props.onAddGoal(enteredGoal);
            setEnteredGoal(initialGoalInput);
        }
    }
    

    return (
			<Modal visible={props.display} animationType="slide">
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="Enter your Goal"
						style={styles.input}
						value={enteredGoal}
						onChangeText={goalInputChange}
					/>
					{/* This Works*/
					/* <Button title="ADD" onPress={props.onAddGoal.bind(this, enteredGoal)} /> */}
					{/* This Works*/
					/* <Button title="ADD" onPress={ () => props.onAddGoal(enteredGoal)} /> */}
					<View style={styles.buttonContent}>
						<View style={ styles.button}>
							<Button title="ADD" onPress={handleAddButtonClick} />
						</View>
						<View style={ styles.button}>
							<Button
								title="Cancel"
								style={styles.cancelButton}
                            onPress={props.onCancelGoal}
                            color = "red"
							/>
						</View>
					</View>
				</View>
			</Modal>
		);
}

const styles = StyleSheet.create({
	inputContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	input: {
		borderColor: "black",
		borderBottomWidth: 1,
		marginBottom: 10,
		height: 35,
		width: "80%",
	},

	buttonContent: {
		flexDirection: "row-reverse",
		justifyContent: "space-between",
		width: "80%",
	},

	button: {
		width: "30%",
	},

});


export default GoalInput
