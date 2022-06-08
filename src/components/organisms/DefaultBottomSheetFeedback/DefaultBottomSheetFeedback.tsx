import { memo } from 'react'

import { Box, Button, Heading, Text } from 'native-base'
import { ContentFunctionComponent } from 'src/contexts/BottomSheetContext'

export type DefaultBottomSheetFeedbackProps = {
  buttonDescription?: string
  description: string
  title: string
}

export const DefaultBottomSheetFeedback: ContentFunctionComponent<DefaultBottomSheetFeedbackProps> =
  memo(({ buttonDescription = 'OK', close, description, title }) => (
    <Box flex={1} p={5}>
      <Heading textAlign="center">{title}</Heading>
      <Text textAlign="center" my={5}>
        {description}
      </Text>
      <Button onPress={close} testID="closeButton" my={5}>
        {buttonDescription}
      </Button>
    </Box>
  ))
