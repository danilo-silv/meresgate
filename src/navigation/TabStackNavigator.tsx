import { FunctionComponent } from 'react'

import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { ButtonRegisterDog, Icons } from 'atoms'
import { MotiView } from 'moti'
import { Pressable, useTheme } from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HomeScreen, PhotoDog, ProfileScreen } from 'screens'

import { RootStackScreenComponent, RootTabParamList } from '../types'

export type TabStackScreen<RouteName extends keyof RootTabParamList> = FunctionComponent<
  BottomTabScreenProps<RootTabParamList, RouteName>
>

const Tab = createBottomTabNavigator<RootTabParamList>()

const tabs = [
  {
    component: HomeScreen,
    icon: Icons.Home,
    name: 'Home'
  },
  {
    component: PhotoDog,
    icon: ButtonRegisterDog,
    name: '-'
  },
  {
    component: ProfileScreen,
    icon: Icons.Profile,
    name: 'Profile'
  }
]

const TabStackNavigator: RootStackScreenComponent<'Tabs'> = () => {
  const safeAreaInsets = useSafeAreaInsets()

  const theme = useTheme()

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors.white,
        tabBarStyle: {
          backgroundColor: theme.colors.primary[400],
          height: 56 + safeAreaInsets.bottom,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          position: 'absolute',
          paddingTop: 18
        },
        tabBarLabelStyle: {
          fontSize: 12
        }
      }}
      sceneContainerStyle={{
        backgroundColor: theme.colors.white
      }}>
      {tabs.map(({ component, icon: TabIcon, name }, tabIndex) => (
        <Tab.Screen
          {...{ component }}
          key={name}
          name={name as keyof RootTabParamList}
          options={({ navigation }) => ({
            tabBarIcon: ({ color, focused }) => (
              <MotiView
                from={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                delay={tabIndex * 50}>
                <TabIcon {...{ color, filled: focused }} size={18} />
              </MotiView>
            ),
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Modal')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1
                })}>
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color={theme.colors.white}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            )
          })}
        />
      ))}
    </Tab.Navigator>
  )
}

export default TabStackNavigator
