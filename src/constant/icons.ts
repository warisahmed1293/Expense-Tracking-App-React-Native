// constants/icons.ts
import * as SolidIcons from 'react-native-heroicons/solid';
import * as OutlineIcons from 'react-native-heroicons/outline';
import {IconsMap} from '../components/types';

export const ICONS: IconsMap = {
  Home: {solid: SolidIcons.HomeIcon, outline: OutlineIcons.HomeIcon},
  Statistics: {
    solid: SolidIcons.ChartBarIcon,
    outline: OutlineIcons.ChartBarIcon,
  },
  Wallet: {solid: SolidIcons.WalletIcon, outline: OutlineIcons.WalletIcon},
  Profile: {solid: SolidIcons.UserIcon, outline: OutlineIcons.UserIcon},
};
