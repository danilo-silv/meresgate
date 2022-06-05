import { FunctionComponent, memo } from 'react'

import { Icon, IIconProps } from 'native-base'
import { Path } from 'react-native-svg'

export const Profile: FunctionComponent<IIconProps & { filled?: boolean }> = ({
  filled,
  ...props
}) => (
  <Icon {...{ viewBox: '0 0 24 24', ...props }}>
    <Path
      key={Math.random()}
      d="M17.294 7.773C17.294 10.8917 14.9391 13.3924 12 13.3924C9.0619 13.3924 6.70601 10.8917 6.70601 7.773C6.70601 4.6543 9.0619 2.15466 12 2.15466C14.9391 2.15466 17.294 4.6543 17.294 7.773ZM12 23.3918C7.66237 23.3918 4 22.6432 4 19.7549C4 16.8655 7.68538 16.1435 12 16.1435C16.3386 16.1435 20 16.8921 20 19.7804C20 22.6697 16.3146 23.3918 12 23.3918Z"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
    />
  </Icon>
)

export default memo(Profile)
