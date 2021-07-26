import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const GoalItem = props => {
    const deleteGoal = () => {
        props.onDelete(props.id);
    };

    return (
			// Works with bind // <TouchableOpacity onPress={ props.onDelete.bind(this, props.id) } activeOpacity={ .5 }>
			// Works with Arrow function // <TouchableOpacity onPress={() => props.onDelete(props.id)} activeOpacity={0.5}>
            <TouchableOpacity onPress={deleteGoal} activeOpacity={0.5}>
				<View style={styles.listItem}>
					<Text>{props.title}</Text>
				</View>
			</TouchableOpacity>
		);
};



const styles = StyleSheet.create({
	listItem: {
		padding: 10,
		marginVertical: 5,
		borderWidth: 1,
		backgroundColor: "#CDCDCD",
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default GoalItem;
