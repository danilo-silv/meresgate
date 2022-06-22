import { useCallback, useEffect, useRef, useState } from 'react'

import Layouts from 'layouts'
import { Avatar, Button, Center, HStack, Image, Text, View, VStack } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Keyboard, TouchableOpacity } from 'react-native'
import { AvatarPic, Gallery, Laura, RemovePhoto, SheetCamera } from 'assets'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { theme } from 'src/theme'
import { Camera, CameraType } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const CreateAccountImageScreen: RootStackScreenComponent<'CreateAccountImage'> = ({
  navigation,
  route
}) => {
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false)

  const camRef = useRef<any>()

  const [hasPermission, setHasPermission] = useState<any>(null)

  const [type, setType] = useState<CameraType>(CameraType.back)

  const [image, setImage] = useState<any>(null)

  const sheetRef = useRef<BottomSheet>(null)
  const snapPoints = [1, '27.5%']

  const safeAreaInsets = useSafeAreaInsets()

  const onSubmit = useCallback(() => {
    Keyboard.dismiss()

    navigation.navigate('CreateAccountCreatePassword', route.params)
  }, [navigation, route.params])

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
      <Layouts.Internal typeTwo>
        <VStack space={40} alignItems="center" justifyContent="space-around">
          <Center alignItems="center" justifyContent="center" mt={6} mb={6}>
            <Text fontSize={14} color="#2B748E" bold>
              Cadastre a sua foto de perfil em nossa plataforma
            </Text>
          </Center>
          {!isCameraVisible && (
            <Center w="100%" alignItems="center" justifyContent="center" mb={-100} mt={-125}>
              <TouchableOpacity
                onPress={() => {
                  sheetRef.current?.expand()
                }}>
                <Avatar
                  bg="#ccc"
                  alignSelf="center"
                  size={200}
                  source={image ? { uri: image } : AvatarPic}
                />
              </TouchableOpacity>
            </Center>
          )}
          {isCameraVisible && (
            <Camera
              ref={camRef}
              style={{
                width: '100%',
                height: safeAreaInsets.top + 500,
                justifyContent: 'flex-end',
                marginTop: -150
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
          {!isCameraVisible && (
            <Center w="100%">
              <Button onPress={onSubmit} style={{ backgroundColor: '#2B748E', width: '100%' }}>
                <Text fontSize={12} color="white" bold>
                  Salvar imagem
                </Text>
              </Button>
            </Center>
          )}
        </VStack>
      </Layouts.Internal>
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
