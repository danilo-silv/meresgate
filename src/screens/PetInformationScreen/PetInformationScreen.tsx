import { useCallback } from 'react'

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { BluePaw, GrayPaw, YellowPaw, DogPaw, Vaccine, Dog, Hand, WomanExample } from 'assets/index'
import Layouts from 'layouts'
import { Avatar, Button, HStack, Image, ScrollView, Text, View, VStack } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { theme } from 'src/theme'

export const PetInformationScreen: RootStackScreenComponent<'PetInformation'> = ({
  navigation
}) => {
  const pet = {
    name: 'Doguinho 1',
    address: 'Av. Dr. Cardoso de Melo 1467, Vila Olimpia',
    gender: 'Macho',
    age: 2,
    weight: 8,
    breed: false,
    isVaccinated: false,
    isRescued: false,
    rescuer: {
      name: 'Sophia Andrade',
      gender: 'fm',
      image: WomanExample
    },
    description:
      'Esse cachorrinho foi encontrado proximo ao restaurante Hassan Cozinha Árabe aqui na Vila Olímipia. Aparentemente não tem dono, já que não possui nenhuma coleira ou algo que identifique.'
  }

  const goToKnowMore = useCallback(() => navigation.navigate('KnowMore'), [navigation])

  const gotBack = useCallback(() => navigation.goBack(), [navigation])

  return (
    <ScrollView showsVerticalScrollIndicator={false} position="relative">
      <Layouts.External>
        <View position="absolute" top={-180} right={2}>
          <TouchableOpacity
            onPress={goToKnowMore}
            style={{
              borderRadius: 50,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            {/* <FontAwesomeIcon icon="fas fa-" /> */}
            <FontAwesome name="exclamation-circle" size={30} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        <View position="absolute" top={-180} left={2}>
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
        <VStack backgroundColor={theme.colors.primary[400]}>
          <View padding={5} mt={5} style={styles.container}>
            <Avatar
              bg="#ccc"
              alignSelf="center"
              size={230}
              source={{
                uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
              }}
              style={{
                borderWidth: 10,
                borderColor: theme.colors.white,
                position: 'absolute',
                top: -100
              }}
            />

            <Image
              alt="dog paw"
              source={DogPaw}
              resizeMode="contain"
              width={250}
              height={200}
              top={300}
              right={-70}
              opacity={0.8}
              position="absolute"
            />
            <Text fontSize={25} fontWeight={600} color={theme.colors.primary[700]} mb={2} mt={24}>
              {pet.name}
            </Text>
            <HStack alignItems="center">
              <FontAwesome5
                name="map-marker-alt"
                size={20}
                color="#5AA9EF"
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 13, color: '#70717B', fontWeight: '400' }}>
                {pet.address}
              </Text>
            </HStack>
            <View justifyContent="space-between" flexDirection="row" my={5}>
              <View style={styles.petInfoBoxGender}>
                <Image alt="blue paw" source={BluePaw} position="absolute" top={21} opacity={0.5} />
                <Text fontWeight={600} color={theme.colors.primary[700]}>
                  {pet.gender}
                </Text>
                <Text fontSize={14} color="#6A6A6A">
                  Sexo
                </Text>
              </View>
              <View style={styles.petInfoBoxAge}>
                <Image
                  alt="yellow paw"
                  source={YellowPaw}
                  position="absolute"
                  top={21}
                  opacity={0.5}
                />
                <Text fontWeight={600} color="#c1502e">{`${pet.age} ano(s)`}</Text>
                <Text fontSize={14} color="#6A6A6A">
                  Idade
                </Text>
              </View>
              <View style={styles.petInfoBoxWeight}>
                <Image alt="gray paw" source={GrayPaw} position="absolute" top={21} opacity={0.5} />
                <Text fontWeight={600} color="#484f4f">{`${pet.weight} Kg`}</Text>
                <Text fontSize={14} color="#6A6A6A">
                  Peso
                </Text>
              </View>
            </View>
            <View py={5}>
              <HStack my={2} alignItems="center">
                <View width={75} alignItems="center" justifyContent="center">
                  <Image alt="vaccine" source={Vaccine} width={35} height={35} />
                  <Text color="#2B748E" fontSize={15}>
                    Vacinado
                  </Text>
                </View>
                <Text fontSize={15} mx={5}>
                  <Text color="#70717B">{pet.isVaccinated ? 'Vacinado' : 'Não vacinado'}</Text>
                </Text>
              </HStack>
              <HStack my={2} alignItems="center">
                <View width={75} alignItems="center" justifyContent="center">
                  <Image alt="dog" source={Dog} width={37} height={35} />
                  <Text color="#2B748E" fontSize={15}>
                    Raça
                  </Text>
                </View>
                <Text fontSize={15} mx={5}>
                  <Text color="#70717B">{pet.breed ? 'Vacinado' : 'Não informado'}</Text>
                </Text>
              </HStack>
              <HStack my={2} alignItems="center">
                <View width={75} alignItems="center" justifyContent="center">
                  <Image alt="hand" source={Hand} style={{ width: 45, height: 25 }} />
                  <Text color="#2B748E" fontSize={15}>
                    Resgate
                  </Text>
                </View>
                <Text fontSize={15} mx={5}>
                  <Text color="#70717B"> {pet.isRescued ? 'Resgatado' : 'Não resgatado'}</Text>
                </Text>
              </HStack>
            </View>
            <View>
              <Text fontSize={20} color="#2B748E" bold>
                {pet.isRescued ? 'Quem o resgatou!' : 'Quem o achou!'}
              </Text>
              <HStack alignItems="center" justifyContent="space-between" pl={5} my={2}>
                <HStack alignItems="flex-end" alignSelf="center" justifyContent="space-around">
                  <Image
                    source={WomanExample}
                    borderRadius={60}
                    width={60}
                    height={60}
                    alt="rescuer image"
                  />
                  <View ml={3}>
                    <Text color="#2B748E" fontSize={18}>
                      {pet.rescuer.name}
                    </Text>
                    <Text fontSize={13} color="#70717B">
                      {pet.rescuer.gender === 'ms' ? 'Amigo dos animais' : 'Amiga dos animais'}
                    </Text>
                  </View>
                </HStack>

                <Button
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#2B748E',
                    height: 50,
                    width: 50
                  }}>
                  <FontAwesome5 name="phone" size={20} color={theme.colors.white} />
                </Button>
              </HStack>
              <Text lineHeight={20} py={3}>
                {pet.description}
              </Text>
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
  },
  petInfoBoxGender: {
    width: 95,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(70, 203, 211, 0.26)'
  },
  petInfoBoxAge: {
    width: 95,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#F3EFE3'
  },
  petInfoBoxWeight: {
    width: 95,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#DADADA'
  }
})
