import { FunctionComponent } from 'react'
import { Entypo, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { Button, HStack, Image, ScrollView, Text, theme, View, VStack } from 'native-base'

import { DogImageOne, DogImageThree, DogImageTwo, WomanAndPet } from 'assets'
import { TouchableOpacity } from 'react-native'

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

export const PhotoDog: FunctionComponent = () => {
  return (
    <ScrollView>
      <View mt={5} p={5}>
        <Text textAlign="justify" fontSize={18} mb={5} color={theme.colors.primary[600]}>
          <Text fontWeight="bold">Animais resgatados</Text> pelas ONGs ou por cuidadores autônomos e
          estão <Text fontWeight="bold">para adoção</Text>!
        </Text>
        <View display="flex" flexDirection="row" flexWrap="wrap">
          {petsForAdotpion.map((pet) => {
            return (
              <TouchableOpacity
                key={pet.id}
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
                  {pet.name}
                </Text>
                <VStack alignItems="center">
                  <HStack fontSize={15} color={theme.colors.primary[500]} justifyContent="center">
                    {pet.gender === 'm' ? (
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
                      {pet.isVaccinated ? 'Vacinado' : 'Não vacinado'}
                    </Text>
                  </HStack>
                </VStack>
                <View alignItems="center">
                  <Image
                    source={pet.image}
                    alt="dog image"
                    height={32}
                    mt={2}
                    w={32}
                    borderRadius={70}
                  />
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
        <Text fontSize={20} fontWeight="bold" color={theme.colors.primary[600]} my={5}>
          Saiba mais...
        </Text>
        <HStack
          borderRadius={30}
          bgColor={theme.colors.primary[400]}
          p={3}
          flexDirection="row"
          justifyContent="flex-end"
          mb={20}>
          <View borderBottomColor={theme.colors.primary[600]} borderBottomWidth={2} left={-15}>
            <Image alt="Woman with a dog" height={250} width={150} source={WomanAndPet} top={5} />
          </View>
          <View width="50%">
            <Text color="white" fontSize={17} fontWeight="bold" my={2}>
              Nosso Objetivo
            </Text>
            <Text color="white" textAlign="justify" fontSize={15}>
              Aplicação para facilitar o trabalho de ONGs e protetores autônomos em localizar
              animais em situação de abandono, através de localização aproximada.
            </Text>
            <Button h={12} alignSelf="center" bgColor={theme.colors.white}>
              <Entypo
                name="chevron-with-circle-right"
                size={24}
                color={theme.colors.primary[500]}
              />
            </Button>
          </View>
        </HStack>
      </View>
    </ScrollView>
  )
}
