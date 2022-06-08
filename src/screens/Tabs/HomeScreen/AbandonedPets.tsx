import { FunctionComponent } from 'react'

import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import {
  CaoSemDonoImage,
  DogImageFive,
  DogImageOFour,
  DogImageOne,
  DogImageThree,
  DogImageTwo,
  LuizaMellImage,
  OngSOSImage,
  WomanAndPet
} from 'assets'
import { HStack, Image, Text, theme, View, VStack } from 'native-base'
import { FlatList, TouchableOpacity } from 'react-native'

const organizationsImages = [
  {
    id: 1,
    image: LuizaMellImage,
    ongName: 'Instituto Luiza Mel'
  },
  {
    id: 2,
    image: OngSOSImage,
    ongName: 'ONG SOS'
  },
  {
    id: 3,
    image: CaoSemDonoImage,
    ongName: 'ONG Cão sem dono'
  }
]

const petsForAdotpion = [
  {
    id: 1,
    name: 'Guto',
    gender: 'm',
    isVaccinated: true,
    image: DogImageOne,
    foundAt: 'R. Baluarte, 711'
  },
  {
    id: 2,
    name: 'Paçoca',
    gender: 'f',
    isVaccinated: false,
    image: DogImageTwo,
    foundAt: 'R. Alvorada, 199'
  },
  {
    id: 3,
    name: 'Luz',
    gender: 'f',
    isVaccinated: true,
    image: DogImageThree,
    foundAt: 'R. Quatá, 166'
  },
  {
    id: 4,
    name: 'Jack',
    gender: 'm',
    isVaccinated: true,
    image: DogImageOFour,
    foundAt: 'R. Casa do Ator, 275'
  },
  {
    id: 5,
    name: 'Luz',
    gender: 'f',
    isVaccinated: false,
    image: DogImageFive,
    foundAt: 'R. Gomes de Carvalho, 125'
  }
]

export const AbandonedPets: FunctionComponent = () => {
  return (
    <View mt={5}>
      <Text textAlign="justify" fontSize={18} color={theme.colors.primary[900]}>
        Pets
        <Text fontWeight="bold"> abandonados</Text> próximos a você:
      </Text>
      <View mt={5}>
        <FlatList
          data={petsForAdotpion}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={{
                marginHorizontal: 5,
                marginVertical: 5,
                borderRadius: 20,
                backgroundColor: 'rgba(0, 183, 255, 0.04)',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 2,
                borderColor: theme.colors.primary[200]
              }}>
              <Text
                color={theme.colors.primary[700]}
                fontSize={16}
                fontWeight="bold"
                mb={3}
                maxW={40}
                textAlign="center">
                {item.foundAt}
              </Text>
              <VStack alignItems="center">
                <HStack fontSize={15} color={theme.colors.primary[500]} justifyContent="center">
                  {item.gender === 'm' ? (
                    <>
                      <Ionicons name="male" size={15} color={theme.colors.primary[700]} />
                      <Text ml={2} color={theme.colors.primary[700]}>
                        Macho
                      </Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="female" size={15} color={theme.colors.primary[700]} />
                      <Text ml={2} color={theme.colors.primary[700]}>
                        Fêmea
                      </Text>
                    </>
                  )}
                </HStack>
                <HStack fontSize={15} color={theme.colors.primary[500]}>
                  <FontAwesome5 name="syringe" size={15} color={theme.colors.primary[700]} />
                  <Text ml={2} color={theme.colors.primary[700]}>
                    {item.isVaccinated ? 'Vacinado' : 'Não vacinado'}
                  </Text>
                </HStack>
              </VStack>
              <View alignItems="center">
                <Image
                  source={item.image}
                  alt="dog image"
                  height={32}
                  mt={2}
                  w={32}
                  borderRadius={70}
                />
              </View>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text my={5}>Mapa</Text>
      <Text fontSize={20} fontWeight="bold" color={theme.colors.primary[900]} my={3}>
        ONGs
      </Text>
      <Text fontSize={15} color={theme.colors.primary[900]}>
        Algumas das organizações que ajudam esses doguinhos abandonados:
      </Text>
      <View mt={5}>
        <FlatList
          data={organizationsImages}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Image alt={item.ongName} source={item.image} mx={2} />
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text fontSize={22} fontWeight="bold" color={theme.colors.primary[900]} my={5}>
        Saiba mais...
      </Text>
      <HStack
        borderRadius={30}
        bgColor="#46CBD3"
        p={3}
        flexDirection="row"
        justifyContent="flex-end"
        mb={20}>
        <View borderBottomColor={theme.colors.primary[900]} borderBottomWidth={2} left={-15}>
          <Image alt="Woman with a dog" height={250} width={150} source={WomanAndPet} />
        </View>
        <View width="50%">
          <HStack alignItems="center">
            <Text color="white" fontSize={17} fontWeight="bold" my={2}>
              Nosso Objetivo
            </Text>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <FontAwesome5 name="chevron-circle-right" size={24} color="white" />
            </TouchableOpacity>
          </HStack>
          <Text color="white" textAlign="justify" fontSize={15} mt={3}>
            Aplicação para facilitar o trabalho de ONGs e protetores autônomos em localizar animais
            em situação de abandono, através de localização aproximada.
          </Text>
        </View>
      </HStack>
    </View>
  )
}
