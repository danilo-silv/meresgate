import { memo } from 'react'

import { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'

export const CustomBottomSheetBackdrop = memo((props: BottomSheetDefaultBackdropProps) => (
  <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} />
))
