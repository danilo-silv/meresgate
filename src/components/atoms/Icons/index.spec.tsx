import { render } from '@testing-library/react-native'
import AppWrapper from 'src/AppWrapper'

import Icon from '.'

describe('Icon', () => {
  const icons = Object.keys(Icon) as (keyof typeof Icon)[]

  icons.forEach((iconKey) =>
    it(`renders correctly ${iconKey} icon`, () => {
      const IconComponent = Icon[iconKey]

      render(<IconComponent />, { wrapper: AppWrapper })
    })
  )
})
