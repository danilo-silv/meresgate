import { useCallback } from 'react'

import { FontAwesome } from '@expo/vector-icons'
import {
  BlueCamera,
  BlueHand,
  BlueLeftPaw,
  BluePawCamera,
  Danilo,
  DogPhoto,
  Guilherme,
  Laura,
  NoBgBluePaw,
  Sued,
  Victoria,
  WhitePaw,
  WomanAndPet
} from 'assets'
import Layouts from 'layouts'
import { HStack, Image, ScrollView, Text, theme, View } from 'native-base'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from 'src/types'

const devs = [
  {
    social: '@lauranibrali',
    image: Laura
  },
  {
    social: '@guilhermeeps',
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

export const KnowMoreScreen = ({ navigation }: RootStackScreenProps<'KnowMore'>) => {
  const gotBack = useCallback(() => navigation.goBack(), [navigation])

  return (
    <ScrollView showsVerticalScrollIndicator={false} position="relative">
      <Layouts.Internal typeTwo>
        <View>
          <View position="absolute" top={-60} left={-10}>
            <TouchableOpacity
              onPress={gotBack}
              style={{
                borderRadius: 50,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <FontAwesome name="arrow-circle-left" size={30} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.body} position="relative">
            <View height={380}>
              <Text fontWeight={700} fontSize={20} pt={15} color="#2B748E">
                Nosso objetivo!
              </Text>
              <Image source={WomanAndPet} position="absolute" right={-80} top={33} alt="woman" />
              <Text width={200} fontWeight="bold" mt={5} color="#2B748E" lineHeight={18}>
                Existe um grande número de animais abandonados nas ruas, porém os métodos existentes
                para ONGs e protetores resgatarem esses animais são eficazes? De que forma os meios
                digitais podem melhorar esse processo? Nossa aplicação visa facilitar esse processo,
                ajudando ONGs e protetores autônomos a localizar animais em situação de abandono,
                através de localização aproximada.
              </Text>
              <View position="absolute" left={-80} bottom={-140}>
                <Image source={WhitePaw} resizeMode="contain" alt="whitePaw" opacity={0.3} />
              </View>
            </View>

            <View paddingTop={24} paddingBottom={5}>
              <Text fontWeight="800" fontSize={20} color="#2B748E" alignSelf="flex-end">
                Como funciona?
              </Text>
            </View>

            <View height={380} paddingX={36} position="relative">
              <HStack justifyContent="center" alignItems="center">
                <Image
                  alt="photographic camera in a paw format"
                  width={75}
                  height={75}
                  source={BluePawCamera}
                />
                <Text style={styles.orderedListText}>
                  1. Clique no ícone exemplificado ao lado para cadastrar um pet que encontrou
                  abandonado.
                </Text>
              </HStack>
              <HStack justifyContent="center" alignItems="center" pt={4}>
                <Text style={styles.orderedListText}>
                  2. Tire uma foto do pet encontrado abandonado.
                </Text>
                <Image
                  alt="photographic camera"
                  resizeMode="contain"
                  width={55}
                  height={55}
                  source={BlueCamera}
                  marginLeft={2}
                />
              </HStack>
              <HStack justifyContent="center" alignItems="center" pt={4}>
                <Image
                  alt="dog photo"
                  resizeMode="contain"
                  width={55}
                  height={55}
                  source={DogPhoto}
                  marginRight={2}
                />
                <Text style={styles.orderedListText}>
                  3. Coloque o máximo de informações sobre o pet, criando consequentemente um perfil
                  pra ele.
                </Text>
              </HStack>
              <HStack justifyContent="center" alignItems="center" pt={4}>
                <Text style={styles.orderedListText}>
                  4. Após o perfil criado, uma ONG ou cuidador autônomo pode resgatá-lo com as
                  informações que você preencheu.
                </Text>
                <Image
                  alt="blue hand"
                  resizeMode="contain"
                  width={55}
                  height={55}
                  source={BlueHand}
                  marginLeft={2}
                />
              </HStack>
              <HStack justifyContent="center" alignItems="center" pt={4}>
                <Image
                  alt="blue paw"
                  resizeMode="contain"
                  width={55}
                  height={55}
                  source={NoBgBluePaw}
                  marginRight={2}
                />
                <Text style={styles.orderedListText}>
                  5. Pronto! Agora o pet será levado para adoção no sistema dessas instituições ou
                  já será acolhido por um cuidador autônomo!
                </Text>
              </HStack>

              <View position="absolute" right={-60} bottom={-170}>
                <Image
                  source={BlueLeftPaw}
                  resizeMode="contain"
                  width={130}
                  height={130}
                  alt="blueLeftPaw"
                  opacity={0.3}
                />
              </View>
            </View>
          </View>
        </View>
      </Layouts.Internal>
      <View
        style={{
          width: '100%',
          backgroundColor: theme.colors.primary[800],
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingTop: 23,
          padding: 36,
          marginTop: 80
        }}>
        <Text color="white" fontWeight="700" fontSize={20}>
          Em caso de dúvidas, acesse as redes sociais dos desenvolvedores!
        </Text>
        <HStack flexDirection="row" flexWrap="wrap" justifyContent="center" space={6} py={10}>
          {devs.map(({ social, image }) => {
            return (
              <View pt={5} alignItems="center" key={social}>
                <Image alt={social} source={image} width={55} height={57} />
                <Text color="white">{social}</Text>
              </View>
            )
          })}
        </HStack>
        <Text color="white" fontSize={15} alignSelf="center">
          Ou mande em{' '}
          <Text color="white" fontWeight="700" fontSize={15}>
            meResgate@gmail.com
          </Text>
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 25,
    marginBottom: 75
  },
  orderedList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  orderedListText: {
    width: 'auto',
    color: '#2B748E',
    marginTop: 10,
    lineHeight: 22,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  }
})
