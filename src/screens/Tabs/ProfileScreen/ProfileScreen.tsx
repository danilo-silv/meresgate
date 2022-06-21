import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'

import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import {
  AvatarPic,
  EditIcon,
  Gallery,
  GreyPawUserProfile,
  Laura,
  ManAndCat,
  RemovePhoto,
  SheetCamera
} from 'assets'
import Layouts from 'layouts'
import { Avatar, HStack, Image, ScrollView, Text, View, VStack } from 'native-base'
import { StyleSheet, TouchableOpacity, Image as RNImage } from 'react-native'
import { useSetAuthAtom } from 'src/store/auth'
import { theme } from 'src/theme'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { Camera, CameraType } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type person = {
  name: string
  email: string
  phoneNumber: string
  gender: string
}

export const ProfileScreen: FunctionComponent = () => {
  const setAuthAtom = useSetAuthAtom()

  const onExit = useCallback(() => setAuthAtom(null), [setAuthAtom])

  const safeAreaInsets = useSafeAreaInsets()

  const camRef = useRef<any>()
  const sheetRef = useRef<BottomSheet>(null)
  const snapPoints = [1, '35%']

  const [image, setImage] = useState<any>(RNImage.resolveAssetSource(Laura).uri)

  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false)

  const [hasPermission, setHasPermission] = useState<any>(null)

  const [type, setType] = useState<CameraType>(CameraType.back)

  const person: person = {
    name: 'Laura Nibrali',
    email: 'lauranibrali@gmail.com',
    phoneNumber: '(11) 97070-6734',
    gender: 'fm'
  }

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layouts.External>
          <VStack backgroundColor={theme.colors.primary[400]}>
            <View paddingBottom={150} padding={5} mt={5} style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  sheetRef.current?.expand()
                }}>
                <Avatar
                  bg="#ccc"
                  alignSelf="center"
                  size={116}
                  source={image ? { uri: image } : AvatarPic}
                  style={{
                    position: 'absolute',
                    top: -60,
                    right: 20
                  }}
                />
              </TouchableOpacity>
              <Image alt="edit icon" source={EditIcon} right={-335} top={-10} w={7} h={7} />
              {isCameraVisible && (
                <Camera
                  ref={camRef}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: safeAreaInsets.top + 450,
                    justifyContent: 'flex-end',
                    marginTop: 70,
                    zIndex: 10
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
              <Image alt="grey paw" source={GreyPawUserProfile} position="absolute" left={-50} />
              <View mt={81}>
                <Text fontSize={27} fontWeight={700} color="#03063A" alignSelf="flex-end">
                  {person.name}
                </Text>
                <Text color="#70717B" alignSelf="flex-end">
                  {person.gender === 'ms' ? 'Amigo dos animais' : 'Amiga dos animais'}
                </Text>
                <View mt={8} alignSelf="flex-end">
                  <Text fontSize={18} color="#2B748E" fontWeight={700}>
                    Algumas informações sobre Laura
                  </Text>
                  <HStack height={10} mt={4} alignItems="center" justifyContent="flex-end">
                    <Text bottom={3} alignSelf="flex-end" color="#2B748E" fontSize={15} underline>
                      {person.email}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#2B748E',
                        marginLeft: 15,
                        borderRadius: 7,
                        padding: 2
                      }}>
                      <AntDesign name="down" size={24} color="white" />
                    </TouchableOpacity>
                  </HStack>
                  <HStack height={10} mt={1} alignItems="center" justifyContent="flex-end">
                    <Text bottom={3} alignSelf="flex-end" color="#2B748E" fontSize={15}>
                      {person.phoneNumber}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#2B748E',
                        marginLeft: 15,
                        borderRadius: 7,
                        padding: 2
                      }}>
                      <MaterialIcons name="call" size={24} color="white" />
                    </TouchableOpacity>
                  </HStack>
                  <HStack height={10} mt={8} alignItems="center" justifyContent="flex-end">
                    <TouchableOpacity onPress={onExit}>
                      <HStack alignItems="center" justifyContent="center">
                        <Text color="#2B748E" fontSize={15}>
                          Sair
                        </Text>
                        <MaterialIcons
                          name="logout"
                          size={24}
                          color="white"
                          style={{
                            backgroundColor: '#2B748E',
                            marginLeft: 15,

                            padding: 2
                          }}
                        />
                      </HStack>
                    </TouchableOpacity>
                  </HStack>
                </View>
                <View>
                  <Image
                    source={ManAndCat}
                    alt="a man with a cat"
                    position="absolute"
                    left={-55}
                    top={-150}
                  />
                  <View>
                    <Text
                      mt={60}
                      width="60%"
                      fontWeight="500"
                      alignSelf="flex-end"
                      textAlign="right"
                      color="#2B748E"
                      lineHeight={40}
                      fontSize={25}>
                      “Faça parte de um mundo que acolha os animais e não os abandone...”
                    </Text>
                    <Text
                      width="50%"
                      textAlign="right"
                      alignSelf="flex-end"
                      fontSize={15}
                      color="#2B748E"
                      mt={3}>
                      Time Me Resgate
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </VStack>
        </Layouts.External>
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
  container: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'relative'
  }
})
