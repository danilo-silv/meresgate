import { FunctionComponent } from 'react'

import {
  BlueCamera,
  BlueHand,
  BluePawCamera,
  Danilo,
  DogPhoto,
  Guilherme,
  Laura,
  NoBgBluePaw,
  Sued,
  Victoria,
  WomanAndPet
} from 'assets'
import { HStack, Image, ScrollView, Text, theme, View } from 'native-base'
import { StyleSheet } from 'react-native'

const devs = [
  {
    social: '@lauranibrali',
    image: Laura
  },
  {
    social: 'guilhermeeps',
    image: Guilherme
  },
  {
    social: '@__daniloss',
    image: Danilo
  },
  {
    social: '@suedm1',
    image: Sued
  },
  {
    social: '@victoriaguizi_',
    image: Victoria
  }
]

export const PhotoDog: FunctionComponent = () => {
  return (
    <ScrollView>
      <View>
        <View style={styles.body}>
          <View height={380} borderBottomWidth={5} borderBottomColor="#2B748E">
            <Text fontWeight={700} fontSize={20} pt={15} color="#2B748E">
              Nosso objetivo!
            </Text>
            <Image source={WomanAndPet} position="absolute" left={160} top={33} />
            <Text width="49%" fontWeight="bold" mt={5} color="#2B748E" lineHeight={18}>
              Existe um grande número de animais abandonados nas ruas, porém os métodos existentes
              para ONGs e protetores resgatarem esses animais são eficazes? De que forma os meios
              digitais podem melhorar esse processo?
            </Text>
            <Text width="60%" color="#2B748E" mt={2} fontWeight="bold" lineHeight={18}>
              Nossa aplicação visa facilitar esse processo, ajudando ONGs e protetores autônomos a
              localizar animais em situação de abandono, através de localização aproximada.
            </Text>
          </View>
          <View height={380} pt={25}>
            <Text fontWeight="700" fontSize={20} color="#2B748E" alignSelf="flex-end" py={5}>
              Como funciona?
            </Text>
            <HStack justifyContent="space-between">
              <Image
                alt="photographic camera in a paw format"
                width={75}
                height={75}
                source={BluePawCamera}
              />
              <Text style={styles.orderedListText}>
                1. Clique no ícone exemplificado ao lado para cadastrar um doguinho que encontrou
                abandonado
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text style={styles.orderedListText}>
                2. Clique no ícone ao lado para cadastrar um doguinho que encontrou abandonado
              </Text>
              <Image alt="photographic camera" width={55} height={55} source={BlueCamera} />
            </HStack>
            <HStack justifyContent="space-between" pt={3}>
              <Image alt="dog photo" width={50} height={50} source={DogPhoto} />
              <Text style={styles.orderedListText}>
                3. Clique no ícone ao lado para cadastrar um doguinho que encontrou abandonado
              </Text>
            </HStack>
            <HStack justifyContent="space-between" pt={3}>
              <Text style={styles.orderedListText}>
                4. Clique no ícone ao lado para cadastrar um doguinho que encontrou abandonado
              </Text>
              <Image alt="blue hand" width={50} height={50} source={BlueHand} />
            </HStack>
            <HStack justifyContent="space-between" pt={3}>
              <Image alt="blue paw" resizeMode="center" source={NoBgBluePaw} />
              <Text style={styles.orderedListText}>
                5. Clique no ícone ao lado para cadastrar um doguinho que encontrou abandonado
              </Text>
            </HStack>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: theme.colors.primary[800],
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          padding: 20,
          paddingBottom: 125
        }}>
        <Text color="white" fontWeight="700" fontSize={20}>
          Em caso de dúvidas, acesse as redes sociais dos desenvolvedores!
        </Text>
        <HStack space={1} justifyContent="space-between" flexWrap="wrap" py={10}>
          {devs.map((dev) => {
            return (
              <View width={100} pt={5} flex={1} alignItems="center">
                <Image alt={dev.social} source={dev.image} width={55} height={57} />
                <Text color="white">{dev.social}</Text>
              </View>
            )
          })}
        </HStack>
        <Text color="white" fontSize={15} alignSelf="center">
          Ou mande em{' '}
          <Text color="white" fontWeight="700" fontSize={15}>
            meresgate@gmail.com
          </Text>
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingTop: 25,
    marginBottom: 75
  },
  orderedList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  orderedListText: {
    width: '80%',
    color: '#2B748E',
    marginTop: 10,
    lineHeight: 21
  }
})
