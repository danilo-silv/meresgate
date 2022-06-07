import { FunctionComponent, useState } from 'react'

import { View, StyleSheet, Text, TextInput, Switch, TouchableOpacity } from 'react-native'
import { theme } from 'src/theme'

export const PersonRegister: FunctionComponent = () => {
  const [isOng, setIsOng] = useState<boolean>(false)

  const [firstName, setFirstName] = useState<string>('')

  const [lastName, setLastName] = useState<string>('')

  const [email, setEmail] = useState<string>('')

  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const toggleSwitch = () => setIsOng(!isOng)

  return (
    <View style={styles.body}>
      <View style={styles.inputContainer}>
        <Text style={styles.createAccountText}>
          Vamos criar a sua conta! Insira os dados abaixo:
        </Text>
        <TextInput
          placeholder="Primeiro nome"
          style={styles.textInput}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          placeholder="último nome"
          style={styles.textInput}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          placeholder="E-mail"
          style={styles.textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Número de contato"
          style={styles.textInput}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Text>{`${firstName} ${lastName} ${email} ${phoneNumber}`}</Text>
        <Text style={styles.checkboxText}>
          Em caso de ONGs ou cuidadores autônomos, marcar a opção abaixo:
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: theme.colors.primary[100] }}
          thumbColor={isOng ? theme.colors.primary[600] : '#CCC'}
          onValueChange={toggleSwitch}
          value={isOng}
        />
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center'
  },
  createAccountText: {
    fontSize: 17,
    paddingTop: 40,
    paddingBottom: 20,
    color: '#2B748E',
    alignSelf: 'center'
  },
  checkboxText: {
    marginTop: 15,
    fontSize: 14,
    color: '#2B748E'
  },
  inputContainer: {
    width: 300
  },
  textInput: {
    width: 300,
    height: 45,
    color: 'gray',
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 7
  },
  createButton: {
    backgroundColor: '#2B748E',
    marginTop: 30,
    padding: 10,
    borderRadius: 30
  },
  createButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold'
  }
})
