/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#3466dd';
const tintColorDark = '#fff';
const themeColor = '#3466de';

export const Colors = {
  light: {
    text: '#11181C', // 文字颜色
    primaryColor: themeColor, // 主题颜色
    background: '#fff', // 页面背景颜色
    modalBackground: '#f2f1f5', // 弹窗页面背景颜色
    formBackground: '#fff', // 表单背景颜色
    divider: '#e0e0e0', // 分割线颜色
    placeholderTextColor: 'gray', // 输入框 placeholder 颜色
    addImageButtonBackground: '#f2f2f6', // 添加图片按钮背景颜色
    tint: tintColorLight,
    bottomBarColor: '#3466dd',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    primaryColor: themeColor,
    background: '#000', // 页面背景颜色
    modalBackground: '#1c1c1e', // 弹窗页面背景颜色
    formBackground: '#2c2c2e', // 表单背景颜色
    divider: '#3b3b3d', // 分割线颜色
    placeholderTextColor: 'gray', // 输入框 placeholder 颜色
    addImageButtonBackground: '#1c1c1e', // 添加图片按钮背景颜色
    tint: tintColorDark,
    bottomBarColor: 'white',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
