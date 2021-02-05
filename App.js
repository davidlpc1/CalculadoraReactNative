import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import buttons from './buttons';

export default function App() {
  const [themeIsDark, setThemeIsDark] = useState(false);

  const [ currentNumber,setCurrentNumber] = useState("");
  const [ lastNumber,setLastNumber] = useState("")
  const actionsOfDiferentButtons = {
    DEL:() => {},
    AC:() => {
      setCurrentNumber('')
      setLastNumber('')
      return
    },
  }

  const getColorOfButton = (button) => {
    if (button === "=") return "#9DBC7B";
    return typeof button === "number"
      ? themeIsDark === true
        ? "#303946"
        : "#fff"
      : themeIsDark === true
      ? "#414853"
      : "#ededed";
  };

  const styles = StyleSheet.create({
    results: {
      backgroundColor: themeIsDark ? "#282f3b" : "#f5f5f5",
      width: "100%",
      minHeight: 260,
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },

    historyText: {
      color: themeIsDark ? "#b5b7bb" : "#7c7c7c",
      fontSize: 20,
      alignSelf: "flex-end",
      marginRight: 10,
    },

    resultText: {
      margin: 10,
      fontSize: 40,
      color: themeIsDark ? "#f5f5f5" : "#282f3b",
    },

    themeButton: {
      alignSelf: "flex-start",
      bottom: 60,
      margin: 15,
      backgroundColor: themeIsDark ? "#7b8084" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },

    buttons: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    button: {
      borderColor: themeIsDark ? "#3f4d5b" : "#e5e5e5",
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      minWidth: 83,
      minHeight: 83,
      flex: 2,
      fontSize: 24,
    },

    textButton: {
      color: themeIsDark ? "#b5b7bb" : "#7c7c7c",
      fontSize: 20,
    },
  });

  function handleInput(buttonPressed) {
    console.warn("buttonPressed", buttonPressed);
    if(buttonPressed == "+" || buttonPressed == "-" || buttonPressed == "*" || buttonPressed == "/"){
      return setCurrentNumber(`${currentNumber}  ${buttonPressed} `);
    }
    if(actionsOfDiferentButtons[buttonPressed] != undefined) return actionsOfDiferentButtons[buttonPressed]()
    return setCurrentNumber(currentNumber + buttonPressed)
  }

  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => {
            setThemeIsDark(!themeIsDark);
          }}
        >
          <Entypo
            name={themeIsDark ? "light-up" : "moon"}
            size={24}
            color={themeIsDark ? "white" : "black"}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((button, index) =>
          button === "=" ? (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: getColorOfButton(button) },
              ]}
              key={`button:${button}--${index}`}
              onPress={() => handleInput(button)}
            >
              <Text
                style={[styles.textButton, { color: "white", fontSize: 28 }]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: getColorOfButton(button) },
              ]}
              key={`button:${button}--${index}`}
              onPress={() => handleInput(button)}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}
