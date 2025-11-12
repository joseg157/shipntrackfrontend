export interface NavigationPageItem {
  kind?: 'page';
  title?: string;
  icon?: React.ReactNode;
  path?: string;
  children?: NavigationItems;
}

export interface NavigationHeaderItem {
  kind: 'header';
  title: string;
}

export interface NavigationDividerItem {
  kind: 'divider';
}

export type NavigationItem = NavigationPageItem | NavigationHeaderItem | NavigationDividerItem;

export type NavigationItems = NavigationItem[];
