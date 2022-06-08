import { KnowMoreScreen, NotFoundScreen, PetInformationScreen } from 'screens'

import { RootStackScreenComponent } from '.'
import { RootStackParamList } from '../types'
import TabStackNavigator from './TabStackNavigator'

export const loggedScreens: Partial<{
  [K in keyof RootStackParamList]: RootStackScreenComponent<K>
}> = {
  Tabs: TabStackNavigator,
  KnowMore: KnowMoreScreen,
  NotFound: NotFoundScreen,
  PetInformation: PetInformationScreen
}
