import { FunctionComponent } from 'react'

import { GreyPawUserProfile, ManAndCat } from 'assets'
import { Image, Text, View } from 'native-base'
import { theme } from 'src/theme'

type person = {
  name: string
  email: string
  phoneNumber: string
  gender: string
}

export const ProfileScreen: FunctionComponent = () => {
  const person: person = {
    name: 'Laura Nibrali',
    email: 'lauranibrali@gmail.com',
    phoneNumber: '11 99999-9999',
    gender: 'fm'
  }

  return (
    <View>
      <View p={5}>
        <Image alt="grey paw" source={GreyPawUserProfile} position="absolute" left={-50} />
        <Text fontSize={25} fontWeight={700} color={theme.colors.primary[500]} alignSelf="flex-end">
          {person.name}
        </Text>
        <Text color="grey" alignSelf="flex-end">
          {person.gender === 'ms' ? 'Amigo dos animais' : 'Amiga dos animais'}
        </Text>
        <View mt={5} alignSelf="flex-end">
          <Text fontSize={17} color={theme.colors.primary[500]} fontWeight={700}>
            Algumas informações sobre Laura
          </Text>
          <View flexDirection="row" justifyContent="flex-end" alignItems="center" mt={5}>
            <Text bottom={3} alignSelf="flex-end" color="grey" fontSize={15}>
              {person.email}
            </Text>
          </View>
          <View flexDirection="row" justifyContent="flex-end" alignItems="center" mt={2}>
            <Text bottom={3} alignSelf="flex-end" color="grey" fontSize={15}>
              {person.phoneNumber}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={ManAndCat}
            alt="a man with a cat"
            position="absolute"
            left={-30}
            top={125}
          />
          <View>
            <Text
              width="50%"
              alignSelf="flex-end"
              color={theme.colors.primary[500]}
              lineHeight={40}
              fontSize={27}>
              “Faça parte de um mundo que acolha os animais e não os abandone...”
            </Text>
            <Text
              width="50%"
              alignSelf="flex-end"
              fontSize={17}
              color={theme.colors.primary[500]}
              mt={5}>
              Time Me Resgate
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
