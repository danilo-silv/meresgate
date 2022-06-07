import {
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Select,
  Switch,
  Text,
  View
} from 'native-base'
import { FunctionComponent, useState } from 'react'
import { theme } from 'src/theme'

import { StyleSheet } from 'react-native'

export const PhotoDog: FunctionComponent = () => {
  const [isVacinated, setIsVacinated] = useState<boolean>(false)
  const [isRescued, setIsRescued] = useState<boolean>(false)

  const toggleSwitch = (switchKey: string): void => {
    switchKey === 'vacinated' ? setIsVacinated(!isVacinated) : setIsRescued(!isRescued)
  }

  return (
    <ScrollView>
      <View>
        <View style={styles.body}>
          <View>
            <Text style={styles.createAccountText}>
              Preencha o máximo de dados a respeito do pet encontrado:
            </Text>
            <Text fontSize={15} color={theme.colors.primary[600]} my={2}>
              Informações de endereço:
            </Text>
            <Input placeholder="CEP" fontSize={13} my={2} />
            <Input placeholder="Endereço" fontSize={13} my={2} />
            <Input placeholder="Bairro" fontSize={13} my={2} />
            <Input placeholder="Cidade" fontSize={13} my={2} />
            <Input placeholder="Estado" fontSize={13} my={2} />
            <Input placeholder="Número" fontSize={13} my={2} />
            <Text fontSize={15} color={theme.colors.primary[600]} mt={5}>
              Informações do pet:
            </Text>
            <Input placeholder="Nome(opcional)" fontSize={13} my={2} />
            <Select
              minWidth="200"
              accessibilityLabel="sexo"
              fontSize={13}
              my={1}
              placeholder="Selecione o sexo"
              mt="1">
              <Select.Item label="Macho" value="macho" />
              <Select.Item label="Fêmea" value="femea" />
            </Select>
            <Input placeholder="Idade(opcional)" fontSize={13} my={2} />
            <Input placeholder="Raça(opcional)" fontSize={13} my={2} />
            <Input
              placeholder="Descrição sobre o pet..."
              fontSize={13}
              style={{ textAlignVertical: 'top' }}
              multiline={true}
              numberOfLines={10}
              my={2}
            />
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Text fontSize={14} color={theme.colors.primary[600]}>
                Vacinado?
              </Text>
              <Switch
                trackColor={{ false: '#767577', true: theme.colors.primary[100] }}
                thumbColor={isVacinated ? theme.colors.primary[600] : '#CCC'}
                onValueChange={() => toggleSwitch('vacinated')}
                value={isVacinated}
              />
            </HStack>
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Text fontSize={14} color={theme.colors.primary[600]}>
                Resgatado?
              </Text>
              <Switch
                trackColor={{ false: '#767577', true: theme.colors.primary[100] }}
                thumbColor={isRescued ? theme.colors.primary[600] : '#CCC'}
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
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    marginBottom: 70
  },
  createAccountText: {
    fontSize: 17,
    paddingTop: 40,
    paddingBottom: 20,
    color: theme.colors.primary[600],
    alignSelf: 'center'
  }
})
