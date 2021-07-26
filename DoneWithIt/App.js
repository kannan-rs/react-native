import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
} from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
	const initalGoalsList = [];
	const initalAddModelDisplay = false;
	
	const [goalsList, setGoalList] = useState(initalGoalsList);
	const [addModelDisplay, setAddModelDisplay] = useState(initalAddModelDisplay);

	const handleAddGoalClick = goal => {
		toggleAddGoalModel();
		setGoalList((currentGoals) => [
			...goalsList,
			{ key: Math.random().toString(), value: goal },
		]);
	};

	const deleteHandler = key => {
		setGoalList(goalsList => {
			return goalsList.filter( goal => goal.key != key);
		});
	}

	const toggleAddGoalModel = () => setAddModelDisplay(!addModelDisplay);

	return (
		<View style={styles.screen}>
			<Button title="Add New Goal" onPress={toggleAddGoalModel}></Button>
			<GoalInput
				display={addModelDisplay}
				onAddGoal={handleAddGoalClick}
				onCancelGoal={toggleAddGoalModel}
			/>
			<FlatList
				data={goalsList}
				renderItem={(itemData) => (
					<GoalItem id={itemData.item.key} title={itemData.item.value} onDelete={deleteHandler} />
				)}
			/>
		</View>
	);
}

{
	/* <View style={styles.parentView}>
		<View style={styles.redView}>
			<Text>1</Text>
		</View>
		<View style={styles.blueView}>
			<Text>2</Text>
		</View>
		<View style={styles.greenView}>
			<Text>3</Text>
		</View>
	</View> */
}

const styles = StyleSheet.create({
	screen: { padding: 30, paddingTop: 50 },

	bottomSpacing: {
		marginBottom: 30,
	},

	// parentView: {
	// 	flexDirection: "row",
	// 	height: 100,
	// 	borderWidth: 2,
	// 	justifyContent: "space-around",
	// 	alignItems: "stretch",
	// },

	// redView: {
	// 	backgroundColor: "red",
	// 	flex: 1,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },

	// blueView: {
	// 	backgroundColor: "blue",
	// 	flex: 1,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },

	// greenView: {
	// 	backgroundColor: "green",
	// 	flex: 1,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
});
