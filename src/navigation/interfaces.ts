import {
  CompositeNavigationProp,
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NavigationPages, TabPages} from './pages';

export type RootStackParamList = {
  [NavigationPages.home]: undefined;
  [NavigationPages.homeStack]: undefined;
  [NavigationPages.profileScreen]: undefined;
  [NavigationPages.profileStack]: undefined;
  [NavigationPages.historyScreen]: undefined;
  [NavigationPages.historyStack]: undefined;
};
export type IRootNavigation<P extends NavigationPages> = StackNavigationProp<
  RootStackParamList,
  P
>;
export type IRootRoute<P extends NavigationPages> = RouteProp<
  RootStackParamList,
  P
>;

export type MainTabParamList = {
  [TabPages.tabHome]: {};
  [TabPages.historyTab]: {};
  [TabPages.profileTab]: {};
};

export type IMainTabNavigation<P extends TabPages> = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, P>,
  StackNavigationProp<RootStackParamList, NavigationPages.home>
>;
type AllNavParams = RootStackParamList & MainTabParamList;
export type INavigate = <RouteName extends keyof AllNavParams>(
  ...args: AllNavParams[RouteName] extends undefined
    ? [RouteName]
    : [RouteName, AllNavParams[RouteName]]
) => void;
export interface IRootNav extends NavigationContainerRef {
  navigate: INavigate;
}
export class Ref<T> {
  private _ref!: T | null;
  get ref(): T | null {
    const ref = this._ref || this.current;
    if ((ref as any).getNode) {
      return (ref as any).getNode();
    } else {
      return ref;
    }
  }
  get(ref: T): void {
    if (ref != null) {
      this._ref = ref;
    }
  }
  current: T | null = null;
}
