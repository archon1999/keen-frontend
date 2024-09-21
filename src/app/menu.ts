import { CoreMenu } from '@core/types';
import { Resources } from "@app/resources";

export const menu: CoreMenu[] = [
  {
    id: 'home',
    translate: 'Menu.Home',
    type: 'item',
    icon: 'home',
    url: Resources.Home,
    exactMatch: true,
  },
  {
    id: 'problems',
    translate: 'Menu.Problems',
    type: 'item',
    icon: 'file',
    url: Resources.Problems,
    exactMatch: true,
  },
];
