import { Redirect } from "expo-router";
import * as ASSETS_ACTIONS from "@/store/actions/assetsActions";

export default function Add() {
  return <Redirect href={{ pathname: "/(tabs)/assets/edit-asset", params: { type: ASSETS_ACTIONS.ADD_ASSET } }} />;
}