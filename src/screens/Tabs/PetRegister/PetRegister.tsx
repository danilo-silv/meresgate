import { FunctionComponent, useEffect, useRef, useState } from 'react'

import Layouts from 'layouts'
import {
  Box,
  HStack,
  Image,
  Input,
  ScrollView,
  Select,
  Switch,
  Text,
  TextArea,
  View,
  VStack
} from 'native-base'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { theme } from 'src/theme'
import { AddDogPhoto, Gallery, RemovePhoto, SheetCamera } from 'assets'
import { Camera, CameraType } from 'expo-camera'
import { MaterialIcons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

export const PetRegister: FunctionComponent = () => {
  const [isVacinated, setIsVacinated] = useState<boolean>(false)
  const [isRescued, setIsRescued] = useState<boolean>(false)
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false)
  const [hasPermission, setHasPermission] = useState<any>(null)
  const [type, setType] = useState<CameraType>(CameraType.back)
  const [image, setImage] = useState<any>(null)

  const camRef = useRef<any>()
  const sheetRef = useRef<BottomSheet>(null)
  const snapPoints = [1, '35%']

  const toggleSwitch = (switchKey: string): void =>
    switchKey === 'vacinated' ? setIsVacinated(!isVacinated) : setIsRescued(!isRescued)

  // const goToPetInformation = useCallback(() => navigation.navigate('PetInformation'), [navigation])

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const takePicture = async () => {
    const options = {
      quality: 1,
      exif: false
    }

    const newPhoto = await camRef.current.takePictureAsync(options)
    console.log(newPhoto)

    setImage(newPhoto.uri)
    setIsCameraVisible(false)
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layouts.Internal typeTwo>
          <VStack alignItems="center" justifyContent="center" paddingX={3} paddingBottom={100}>
            {isCameraVisible && (
              <Camera
                ref={camRef}
                style={{ width: '100%', height: 540, justifyContent: 'flex-end' }}
                type={type}>
                <HStack justifyContent="space-around">
                  <TouchableOpacity
                    style={{ paddingVertical: 20 }}
                    onPress={() => {
                      setType(type === CameraType.back ? CameraType.front : CameraType.back)
                    }}>
                    <MaterialIcons name="flip-camera-android" size={36} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ paddingVertical: 20 }}
                    onPress={() => {
                      takePicture()
                    }}>
                    <MaterialIcons name="photo-camera" size={36} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ paddingVertical: 20 }}
                    onPress={() => {
                      setIsCameraVisible(false)
                    }}>
                    <MaterialIcons name="cancel" size={36} color="white" />
                  </TouchableOpacity>
                </HStack>
              </Camera>
            )}
            <Text style={styles.createAccountText}>
              Preencha o máximo de dados a respeito do pet encontrado...
            </Text>
            <TouchableOpacity
              onPress={() => {
                sheetRef.current?.expand()
              }}>
              <Image
                source={image ? { uri: image } : AddDogPhoto}
                alt="dog icon and a camera"
                mb={3}
                style={{ width: 125, height: 125, borderRadius: 20 }}
              />
            </TouchableOpacity>
            <Text fontSize={15} color={theme.colors.primary[900]} my={2}>
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
              <Text fontSize={15} color={theme.colors.primary[900]} mt={5}>
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
                <Text fontSize={14} color={theme.colors.primary[900]}>
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
                <Text fontSize={14} color={theme.colors.primary[900]}>
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
              <TouchableOpacity
                // onPress={goToPetInformation}
                style={{
                  marginTop: 50,
                  marginBottom: 40,
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor: theme.colors.primary[700]
                }}>
                <Text textAlign="center" color={theme.colors.white} bold>
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </VStack>
        </Layouts.Internal>
      </ScrollView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: theme.colors.primary[800] }}
        handleIndicatorStyle={{ backgroundColor: '#CCC' }}
        index={0}>
        <BottomSheetView
          style={{
            backgroundColor: theme.colors.primary[800],
            height: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 25,
            paddingHorizontal: 20
          }}>
          <HStack justifyContent="space-around">
            <TouchableOpacity
              onPress={() => {
                setIsCameraVisible(true)
                sheetRef.current?.close()
              }}>
              <Image alt="camera" source={SheetCamera} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                pickImageFromGallery()
                sheetRef.current?.close()
              }}>
              <Image alt="gallery" source={Gallery} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setImage(null)
              }}>
              <Image alt="remove photo" source={RemovePhoto} />
            </TouchableOpacity>
          </HStack>
        </BottomSheetView>
      </BottomSheet>
    </>
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
