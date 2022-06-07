import { FunctionComponent } from 'react'

import { BluePaw, GrayPaw, YellowPaw, DogPaw, Vaccine, Dog, Hand, WomanExample } from 'assets/index'
import { Button, HStack, Image, ScrollView, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'
import { theme } from 'src/theme'

export const PetInformation: FunctionComponent = () => {
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

  return (
    <ScrollView>
      <View padding={5} mt={5}>
        <Image
          alt="dog paw"
          source={DogPaw}
          alignSelf="flex-end"
          top={275}
          opacity={0.25}
          position="absolute"
        />
        <Text fontSize={25} fontWeight={600} color={theme.colors.primary[700]} my={5}>
          {pet.name}
        </Text>
        <Text style={{ fontSize: 13 }}>{pet.address}</Text>
        <View justifyContent="space-between" flexDirection="row" my={5}>
          <View style={styles.petInfoBoxGender}>
            <Image alt="blue paw" source={BluePaw} position="absolute" top={21} />
            <Text fontWeight={700} color={theme.colors.primary[700]}>
              {pet.gender}
            </Text>
            <Text fontSize={14}>Sexo</Text>
          </View>
          <View style={styles.petInfoBoxAge}>
            <Image alt="yellow paw" source={YellowPaw} position="absolute" top={21} />
            <Text fontWeight={700} color="#c1502e">{`${pet.age} ano(s)`}</Text>
            <Text fontSize={14}>Idade</Text>
          </View>
          <View style={styles.petInfoBoxWeight}>
            <Image alt="gray paw" source={GrayPaw} position="absolute" top={21} />
            <Text fontWeight={700} color="#484f4f">{`${pet.weight} Kg`}</Text>
            <Text fontSize={14}>Peso</Text>
          </View>
        </View>
        <View py={5}>
          <HStack my={2}>
            <View width={75} alignItems="center" justifyContent="center">
              <Image alt="vaccine" source={Vaccine} width={35} height={35} />
              <Text color="#2B748E" fontSize={15}>
                Vacinado
              </Text>
            </View>
            <Text fontSize={15} mx={5}>
              {pet.isVaccinated ? 'Vacinado' : 'Não vacinado'}
            </Text>
          </HStack>
          <HStack my={2}>
            <View width={75} alignItems="center" justifyContent="center">
              <Image alt="dog" source={Dog} width={37} height={35} />
              <Text color="#2B748E" fontSize={15}>
                Raça
              </Text>
            </View>
            <Text fontSize={15} mx={5}>
              {pet.breed ? 'Vacinado' : 'Não informado'}
            </Text>
          </HStack>
          <HStack my={2}>
            <View width={75} alignItems="center" justifyContent="center">
              <Image alt="hand" source={Hand} style={{ width: 45, height: 25 }} />
              <Text color="#2B748E" fontSize={15}>
                Resgate
              </Text>
            </View>
            <Text fontSize={15} mx={5}>
              {pet.isRescued ? 'Resgatado' : 'Não resgatado'}
            </Text>
          </HStack>
        </View>
        <View>
          <Text fontSize={20} color="#2B748E">
            {pet.isRescued ? 'Quem o resgatou!' : 'Quem o achou!'}
          </Text>
          <View alignItems="center" flexDirection="row" pl={5} my={2}>
            <Image
              source={WomanExample}
              borderRadius={60}
              width={60}
              height={60}
              alt="rescuer image"
            />
            <View mx={5}>
              <Text color="#2B748E" fontSize={16}>
                {pet.rescuer.name}
              </Text>
              <Text fontSize={14}>
                {pet.rescuer.gender === 'ms' ? 'Amigo dos animais' : 'Amiga dos animais'}
              </Text>
            </View>
            <Button px={5}>Ligar</Button>
          </View>
          <Text lineHeight={20} py={3}>
            {pet.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
