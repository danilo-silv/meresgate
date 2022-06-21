import { useCallback } from 'react'

import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { DogImageOne, DogImageThree, DogImageTwo, WomanAndPet } from 'assets'
import { HStack, Image, Text, theme, View, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from 'src/types'

const petsForAdotpion = [
  {
    id: 1,
    name: 'Guto',
    gender: 'm',
    isVaccinated: true,
    image: DogImageOne
  },
  {
    id: 2,
    name: 'Paçoca',
    gender: 'f',
    isVaccinated: false,
    image: DogImageTwo
  },
  {
    id: 3,
    name: 'Luz',
    gender: 'f',
    isVaccinated: true,
    image: DogImageThree
  }
]

export const PetsForAdoption = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const goToKnowMore = useCallback(() => navigation.navigate('KnowMore'), [navigation])

  const goToPetInformation = useCallback(() => navigation.navigate('PetInformation'), [navigation])

  return (
    <View mt={5}>
      <Text textAlign="justify" fontSize={18} mb={5} color={theme.colors.primary[900]}>
        <Text fontWeight="bold">Animais resgatados</Text> pelas ONGs ou por cuidadores autônomos e
        estão <Text fontWeight="bold">para adoção</Text>!
      </Text>
      <View display="flex" flexDirection="row" flexWrap="wrap">
        {petsForAdotpion.map((pet) => {
          return (
            <TouchableOpacity
              key={pet.id}
              onPress={goToPetInformation}
              style={{
                marginHorizontal: 5,
                marginVertical: 5,
                borderRadius: 30,
                backgroundColor: '#2B748E',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: '#2B748E'
              }}>
              <Text
                color={theme.colors.white}
                fontSize={16}
                fontWeight="bold"
                mb={3}
                maxW={40}
                textAlign="center">
                {pet.name}
              </Text>
              <VStack alignItems="center">
                <HStack fontSize={15} color={theme.colors.primary[500]} justifyContent="center">
                  {pet.gender === 'm' ? (
                    <>
                      <Ionicons name="male" size={15} color={theme.colors.white} />
                      <Text ml={2} color={theme.colors.white}>
                        Macho
                      </Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="female" size={15} color={theme.colors.white} />
                      <Text ml={2} color={theme.colors.white}>
                        Fêmea
                      </Text>
                    </>
                  )}
                </HStack>
                <HStack fontSize={15} color={theme.colors.primary[500]}>
                  <FontAwesome5 name="syringe" size={15} color={theme.colors.white} />
                  <Text ml={2} color={theme.colors.white}>
                    {pet.isVaccinated ? 'Vacinado' : 'Não vacinado'}
                  </Text>
                </HStack>
              </VStack>
              <View alignItems="center">
                <Image
                  source={pet.image}
                  alt="dog image"
                  height={112}
                  mt={2}
                  w={111}
                  borderRadius={50}
                />
              </View>
            </TouchableOpacity>
          )
        })}
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
          <Image alt="Woman with a dog" height={250} width={150} source={WomanAndPet} top={5} />
        </View>
        <View width="50%">
          <HStack alignItems="center">
            <Text color="white" fontSize={17} fontWeight="bold" my={2}>
              Nosso Objetivo
            </Text>
            <TouchableOpacity onPress={goToKnowMore} style={{ marginLeft: 10 }}>
              <FontAwesome5 name="chevron-circle-right" size={24} color="white" />
            </TouchableOpacity>
          </HStack>

          <Text color="white" fontSize={15}>
            Aplicação para facilitar o trabalho de ONGs e protetores autônomos em localizar animais
            em situação de abandono, através de localização aproximada.
          </Text>
        </View>
      </HStack>
    </View>
  )
}
