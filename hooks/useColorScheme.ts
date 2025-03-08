// export { useColorScheme } from 'react-native';
import { useColorScheme as useRNColorScheme, ColorSchemeName } from 'react-native';

// 排除掉 null 和 undefined 类型
export type ColorScheme = Exclude<ColorSchemeName, null | undefined>;

export function useColorScheme(): ColorScheme {
  return useRNColorScheme() ?? 'light';
}

// **利用 TypeScript 的命名空间合并**
// export namespace useColorScheme {
//   // 排除掉 null 和 undefined 类型
//   export type ColorScheme = Exclude<ColorSchemeName, null | undefined>;
// }
