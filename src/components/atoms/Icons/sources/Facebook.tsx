import { FunctionComponent, memo } from 'react'

import { Icon, IIconProps } from 'native-base'
import { Path } from 'react-native-svg'

export const Facebook: FunctionComponent<IIconProps & { filled?: boolean }> = ({
  filled,
  ...props
}) => (
  <Icon {...{ viewBox: '0 0 30 30', ...props, fill: 'none' }}>
    <Path
      key={Math.random()}
      d="M15 30C23.2842 30 30 23.2842 30 15C30 6.71572 23.2842 0 15 0C6.71572 0 0 6.71572 0 15C0 23.2842 6.71572 30 15 30Z"
      fill="#1977F3"
    />
    <Path
      key={Math.random()}
      d="M20.8389 19.337L21.5033 15H17.3436V12.1861C17.3436 11.0006 17.9237 9.84252 19.7884 9.84252H21.6805V6.15106C21.6805 6.15106 19.9634 5.85785 18.3223 5.85785C14.8967 5.85785 12.6565 7.93351 12.6565 11.6946V15H8.84689V19.337H12.6565V29.8186C13.4201 29.9388 14.2027 30 15 30C15.7974 30 16.58 29.9367 17.3436 29.8186V19.337H20.8389Z"
      fill="white"
    />
  </Icon>
)

export default memo(Facebook)
