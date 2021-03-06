import { useCallback, useEffect, useRef, useState } from 'react'

import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { AddDogPhoto, Gallery, RemovePhoto, SheetCamera } from 'assets'
import { Camera, CameraType } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
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
import { RootTabScreenProps } from 'navigation'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from 'src/theme'

export const PetRegister: RootTabScreenProps<'PetRegister'> = ({ navigation }) => {
  const [isVacinated, setIsVacinated] = useState<boolean>(false)

  const [isRescued, setIsRescued] = useState<boolean>(false)

  const sheetRef = useRef<BottomSheet>(null)

  const snapPoints = [1, '35%']

  const safeAreaInsets = useSafeAreaInsets()

  const camRef = useRef<any>()

  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false)

  const [hasPermission, setHasPermission] = useState<any>(null)

  const [type, setType] = useState<CameraType>(CameraType.back)

  const [image, setImage] = useState<any>(null)

  const toggleSwitch = (switchKey: string): void =>
    switchKey === 'vacinated' ? setIsVacinated(!isVacinated) : setIsRescued(!isRescued)

  const goToHome = useCallback(() => navigation.navigate('Home'), [navigation])

  const gotBack = useCallback(() => navigation.goBack(), [navigation])

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
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
      <ScrollView showsVerticalScrollIndicator={false} position="relative">
        <Layouts.Internal typeTwo>
          <View position="absolute" top={-90} left={2}>
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
          <VStack alignItems="center" justifyContent="center" paddingX={3} paddingBottom={100}>
            {isCameraVisible && (
              <Camera
                ref={camRef}
                style={{
                  flex: 1,
                  width: '100%',
                  height: safeAreaInsets.top + 450,
                  justifyContent: 'flex-end'
                }}
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
              Preencha o m??ximo de dados a respeito do pet encontrado...
            </Text>
            <TouchableOpacity
              onPress={() => {
                sheetRef.current?.expand()
              }}>
              <Image
                source={image ? { uri: image } : AddDogPhoto}
                alt="dog icon and a camera"
                mb={3}
                style={{
                  width: image ? 200 : 100,
                  height: image ? 200 : 100,
                  borderRadius: image ? 100 : 20
                }}
              />
            </TouchableOpacity>
            <Text fontSize={15} color={theme.colors.primary[900]} my={2}>
              Informa????es de endere??o:
            </Text>

            <View>
              <Input
                placeholder="CEP*"
                style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
                my={2}
              />
              <Input
                placeholder="Endere??o*"
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
                placeholder="N??mero*"
                style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
                my={2}
              />
              <Text fontSize={15} color={theme.colors.primary[900]} mt={5}>
                Informa????es do pet:
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
                <Select.Item label="F??mea" value="femea" />
              </Select>
              <Input
                placeholder="Idade(opcional)"
                style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
                my={2}
              />
              <Input
                placeholder="Ra??a(opcional)"
                style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
                my={2}
              />
              <Box alignItems="center" w="100%">
                <TextArea
                  h={20}
                  placeholder="Descri????o sobre o pet...*"
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
                onPress={goToHome}
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
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#2B748E' }}
        handleIndicatorStyle={{ backgroundColor: '#CCC' }}
        index={0}>
        <BottomSheetView
          style={{
            backgroundColor: '#2B748E',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 25,
            paddingHorizontal: 20
          }}>
          <HStack justifyContent="space-around" alignItems="center">
            <TouchableOpacity
              onPress={() => {
                setIsCameraVisible(true)

                sheetRef.current?.close()
              }}>
              <Image
                alt="camera"
                source={SheetCamera}
                width={75}
                height={75}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                pickImageFromGallery()

                sheetRef.current?.close()
              }}>
              <Image alt="gallery" source={Gallery} width={75} height={75} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setImage(null)
              }}>
              <Image
                alt="remove photo"
                source={RemovePhoto}
                width={75}
                height={75}
                resizeMode="contain"
              />
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
