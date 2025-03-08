import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, SafeAreaView } from "react-native";
import { Link } from "expo-router";
export default function App() {
  
  return (
    <SafeAreaView>
      <Link href="/personal/category-management">Category Management</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});
