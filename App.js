import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList, Alert, Text } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    Alert.alert("Are you sure?", "Do you want to delete this goal?", [
      {
        text: "Yes",
        onPress: () => {
          setCourseGoals((currentGoals) => {
            return currentGoals.filter((goal) => goal.id !== goalId);
          });
        },
        style: "cancel",
      },
      {
        text: "No",
      },
    ]);
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <View style={styles.Goalsdescription}>
        <Text style={styles.TextDecor}>Your Goals</Text>
      </View>
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 15,
    padding: 35,
  },
  Goalsdescription: {
    padding: 10,
    alignItems: "center",
  },
  TextDecor: {
    fontWeight: "bold",
    color: "#f0f",
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "#000",
    width: "80%",
  },
});
