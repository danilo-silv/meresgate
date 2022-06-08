import { FunctionComponent, useState } from 'react'

import Layouts from 'layouts'
import {
  Box,
  Button,
  HStack,
  Input,
  ScrollView,
  Select,
  Switch,
  Text,
  TextArea,
  View,
  VStack
} from 'native-base'
import { Platform, StyleSheet } from 'react-native'
import { theme } from 'src/theme'

export const PetRegister: FunctionComponent = () => {
  const [isVacinated, setIsVacinated] = useState<boolean>(false)

  const [isRescued, setIsRescued] = useState<boolean>(false)

  const toggleSwitch = (switchKey: string): void =>
    switchKey === 'vacinated' ? setIsVacinated(!isVacinated) : setIsRescued(!isRescued)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Layouts.Internal typeTwo>
        <VStack alignItems="center" justifyContent="center" paddingX={3} paddingBottom={100}>
          <Text style={styles.createAccountText}>
            Preencha o máximo de dados a respeito do pet encontrado..
          </Text>
          <Text fontSize={15} color={theme.colors.primary[600]} my={2}>
            Informações de endereço:
          </Text>

          <View>
            <Input
              placeholder="CEP*"
              style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
              my={2}
            />
            <Input
              placeholder="Endereço*"
              style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
              my={2}
            />
            <Input
              placeholder="Bairro*"
              style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
              my={2}
            />
            <Input
              placeholder="Cidade*"
              style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
              my={2}
            />
            <Input
              placeholder="Estado*"
              style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
              my={2}
            />
            <Input
              placeholder="Número*"
              style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
              my={2}
            />
            <Text fontSize={15} color={theme.colors.primary[600]} mt={5}>
              Informações do pet:
            </Text>
            <Input
              placeholder="Nome(opcional)"
              style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
              my={2}
            />
            <Select
              minWidth="200"
              accessibilityLabel="sexo"
              style={{ backgroundColor: 'white', opacity: 0.9, height: 51 }}
              my={1}
              placeholder="Selecione o sexo"
              mt="1">
              <Select.Item label="Macho" value="macho" />
              <Select.Item label="Fêmea" value="femea" />
            </Select>
            <Input
              placeholder="Idade(opcional)"
              style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
              my={2}
            />
            <Input
              placeholder="Raça(opcional)"
              style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
              my={2}
            />
            <Box alignItems="center" w="100%">
              <TextArea
                h={20}
                placeholder="Descrição sobre o pet...*"
                my={2}
                fontSize={15}
                autoCompleteType="off"
              />
            </Box>

            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize={14} color={theme.colors.primary[600]}>
                Vacinado?
              </Text>
              <Switch
                size={Platform.OS === 'ios' ? 'sm' : 'md'}
                trackColor={{ true: theme.colors.primary[100] }}
                thumbColor={isVacinated ? theme.colors.primary[600] : '#fff'}
                onValueChange={() => toggleSwitch('vacinated')}
                value={isVacinated}
              />
            </HStack>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize={14} color={theme.colors.primary[600]}>
                Resgatado?
              </Text>
              <Switch
                size={Platform.OS === 'ios' ? 'sm' : 'md'}
                trackColor={{ true: theme.colors.primary[100] }}
                thumbColor={isRescued ? theme.colors.primary[600] : '#fff'}
                onValueChange={() => toggleSwitch('rescued')}
                value={isRescued}
              />
            </HStack>
            <Button
              style={{
                marginTop: 20,
                marginBottom: 40,
                backgroundColor: theme.colors.primary[700]
              }}>
              Salvar
            </Button>
          </View>
        </VStack>
      </Layouts.Internal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  createAccountText: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '400',
    paddingTop: 40,
    paddingBottom: 20,
    color: theme.colors.primary[600],
    textAlign: 'left'
  }
})