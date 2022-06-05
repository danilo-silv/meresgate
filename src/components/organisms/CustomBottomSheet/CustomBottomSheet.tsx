import { forwardRef, PropsWithChildren, useCallback } from 'react'

import BottomSheet, { BottomSheetView, useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet'
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import { View } from 'react-native'

import { CustomBottomSheetBackdrop } from '../CustomBottomSheetBackdrop/CustomBottomSheetBackdrop'

type CustomBottomSheetProps = {
  onClose?(): void
}

const initialSnapPoints = ['CONTENT_HEIGHT']

export const CustomBottomSheet = forwardRef<BottomSheet, PropsWithChildren<CustomBottomSheetProps>>(
  ({ children, onClose }, ref) => {
    const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
      useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const renderBackdropComponent = useCallback(
      (backdropComponentProps: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) =>
        children ? <CustomBottomSheetBackdrop {...backdropComponentProps} /> : <View />,
      [children]
    )

    return (
      <BottomSheet
        backdropComponent={renderBackdropComponent}
        contentHeight={animatedContentHeight}
        enablePanDownToClose
        handleHeight={animatedHandleHeight}
        index={-1}
        ref={ref}
        snapPoints={animatedSnapPoints}
        onClose={onClose}>
        <BottomSheetView onLayout={handleContentLayout}>{children}</BottomSheetView>
      </BottomSheet>
    )
  }
)
