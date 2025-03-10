import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export enum HeaderRightText {
  Edit = 'Edit',
  Done = 'Done',
};

export enum CategoryActions {
  Add = 'Add',
  Edit = 'Edit',
};

type CategoryIconMappingKey = import('expo-symbols').SymbolViewProps['name'];

/**
 * key 是 ios 的图标
 * value 是 android 对应的图标，选用 expo/vector-icons/MaterialIcons
 */
export const CategoryIconMapping = {
  'iphone': 'phone-iphone',
  'macbook': 'laptop-mac',
  'applewatch.watchface': 'watch',
  'airpods.pro': 'headphones',
  'appletv.fill': 'tv',
  'homepod.and.homepod.mini': 'multitrack-audio'
} as Partial<
  Record<
  CategoryIconMappingKey,
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export const CategoryIcon = Object.keys(CategoryIconMapping) as CategoryIconMappingKey[];
