/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#3466dd';
const tintColorDark = '#fff';
const themeColor = '#3466de';

export const Colors = {
  light: {
    text: '#11181C',
    primaryColor: themeColor, // 主题颜色
    background: '#fff',
    tint: tintColorLight,
    bottomBarColor: '#3466dd',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    categoryListBackground: '#f0f0f0',
  },
  dark: {
    text: '#ECEDEE',
    primaryColor: themeColor,
    background: 'black',
    tint: tintColorDark,
    bottomBarColor: 'white',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    categoryListBackground: '#1c1c1e',
  },
};
