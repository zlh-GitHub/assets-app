import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type IconName = import('expo-symbols').SymbolViewProps['name'];

/**
 * Add your SFSymbol to MaterialIcons mappings here.
 * key 是 ios 的图标
 * value 是 android 对应的图标，选用 expo/vector-icons/MaterialIcons
 */
export const ICON_MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'plus.circle.fill': 'add-circle',
  'minus.circle.fill': 'remove-circle',
  'creditcard.fill': 'credit-card',
  'person.fill': 'person',
  'chevron.right': 'keyboard-arrow-right',
  'chevron.down': 'keyboard-arrow-down',
  'magnifyingglass': 'search',
  'arrow.up.arrow.down': 'sort',
  'camera.aperture': 'camera',
  'iphone': 'phone-iphone',
  'macbook': 'laptop-mac',
  'applewatch.watchface': 'watch',
  'airpods.pro': 'headphones',
  'appletv.fill': 'tv',
  'homepod.and.homepod.mini': 'multitrack-audio',
  'pencil': 'edit',
  'star': 'star-border',
  'star.fill': 'star',
  'trash': 'delete-outline',
  'photo.on.rectangle.angled': 'photo-library',
  'xmark.circle': 'remove-circle-outline',
} as Partial<
  Record<
  IconName,
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export const ICONS = Object.keys(ICON_MAPPING) as IconName[];

export const ICON = ICONS.reduce((res, icon) => {
  res[icon] = icon;
  return res;
}, {} as Record<IconName, IconName>);