import { FunctionComponent, useCallback } from 'react'

import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { GreyPawUserProfile, Laura, ManAndCat } from 'assets'
import Layouts from 'layouts'
import { Avatar, HStack, Image, ScrollView, Text, View, VStack } from 'native-base'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useSetAuthAtom } from 'src/store/auth'
import { theme } from 'src/theme'

type person = {
  name: string
  email: string
  phoneNumber: string
  gender: string
}

export const ProfileScreen: FunctionComponent = () => {
  const setAuthAtom = useSetAuthAtom()

  const onExit = useCallback(() => setAuthAtom(null), [setAuthAtom])

  const person: person = {
    name: 'Laura Nibrali',
    email: 'lauranibrali@gmail.com',
    phoneNumber: '(11) 97070-6734',
    gender: 'fm'
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Layouts.External>
        <VStack backgroundColor={theme.colors.primary[400]}>
          <View paddingBottom={150} padding={5} mt={5} style={styles.container}>
            <Avatar
              bg="#ccc"
              alignSelf="center"
              size={116}
              source={Laura}
              style={{
                position: 'absolute',
                top: -60,
                right: 20
              }}
            />
            <Image alt="grey paw" source={GreyPawUserProfile} position="absolute" left={-50} />
            <View mt={81}>
              <Text fontSize={27} fontWeight={700} color="#03063A" alignSelf="flex-end">
                {person.name}
              </Text>
              <Text color="#70717B" alignSelf="flex-end">
                {person.gender === 'ms' ? 'Amigo dos animais' : 'Amiga dos animais'}
              </Text>
              <View mt={8} alignSelf="flex-end">
                <Text fontSize={18} color="#2B748E" fontWeight={700}>
                  Algumas informações sobre Laura
                </Text>
                <HStack height={10} mt={4} alignItems="center" justifyContent="flex-end">
                  <Text bottom={3} alignSelf="flex-end" color="#2B748E" fontSize={15} underline>
                    {person.email}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#2B748E',
                      marginLeft: 15,
                      borderRadius: 7,
                      padding: 2
                    }}>
                    <AntDesign name="down" size={24} color="white" />
                  </TouchableOpacity>
                </HStack>
                <HStack height={10} mt={1} alignItems="center" justifyContent="flex-end">
                  <Text bottom={3} alignSelf="flex-end" color="#2B748E" fontSize={15}>
                    {person.phoneNumber}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#2B748E',
                      marginLeft: 15,
                      borderRadius: 7,
                      padding: 2
                    }}>
                    <MaterialIcons name="call" size={24} color="white" />
                  </TouchableOpacity>
                </HStack>
                <HStack height={10} mt={8} alignItems="center" justifyContent="flex-end">
                  <TouchableOpacity onPress={onExit}>
                    <HStack alignItems="center" justifyContent="center">
                      <Text color="#2B748E" fontSize={15}>
                        Sair
                      </Text>
                      <MaterialIcons
                        name="logout"
                        size={24}
                        color="white"
                        style={{
                          backgroundColor: '#2B748E',
                          marginLeft: 15,

                          padding: 2
                        }}
                      />
                    </HStack>
                  </TouchableOpacity>
                </HStack>
              </View>
              <View>
                <Image
                  source={ManAndCat}
                  alt="a man with a cat"
                  position="absolute"
                  left={-55}
                  top={-150}
                />
                <View>
                  <Text
                    mt={60}
                    width="60%"
                    fontWeight="500"
                    alignSelf="flex-end"
                    textAlign="right"
                    color="#2B748E"
                    lineHeight={40}
                    fontSize={25}>
                    “Faça parte de um mundo que acolha os animais e não os abandone...”
                  </Text>
                  <Text
                    width="50%"
                    textAlign="right"
                    alignSelf="flex-end"
                    fontSize={15}
                    color="#2B748E"
                    mt={3}>
                    Time Me Resgate
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </VStack>
      </Layouts.External>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'relative'
  }
})
