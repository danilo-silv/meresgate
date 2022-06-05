import * as SecureStore from 'expo-secure-store'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import client from 'src/integration/client'
import { AuthData } from 'src/integration/resources/auth'

const authAtom = atomWithStorage<(AuthData & { skipOnboarding?: boolean }) | null | undefined>(
  'auth',
  undefined,
  {
    delayInit: true,
    removeItem: (key) => SecureStore.deleteItemAsync(key),
    getItem: async (key) => {
      const item = await SecureStore.getItemAsync(key) //await AsyncStorage.getItem(key)

      const itemParsed = item ? (JSON.parse(item) as AuthData) : null

      client.defaults.headers.common[
        'Authorization'
      ] = `${itemParsed?.auth.type} ${itemParsed?.auth.token}`

      return itemParsed
    },
    setItem: (key, value) => {
      client.defaults.headers.common['Authorization'] = `${value?.auth.type} ${value?.auth.token}`

      return SecureStore.setItemAsync(key, JSON.stringify(value), {}) //AsyncStorage.setItem(key, JSON.stringify(value))
    }
  }
)

export const useAuthAtom = () => useAtom(authAtom)

export const useAuthAtomValue = () => useAtomValue(authAtom)

export const useSetAuthAtom = () => useSetAtom(authAtom)
