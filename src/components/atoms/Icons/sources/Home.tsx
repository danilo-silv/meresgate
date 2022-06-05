import { FunctionComponent, memo } from 'react'

import { Icon, IIconProps } from 'native-base'
import { Path } from 'react-native-svg'

export const Home: FunctionComponent<IIconProps & { filled?: boolean }> = ({
  filled,
  ...props
}) => (
  <Icon {...{ viewBox: '0 0 24 24', ...props }}>
    <Path
      key={Math.random()}
      d="M9.13478 22.0892V18.8424C9.13478 18.0135 9.77217 17.3416 10.5584 17.3416H13.4326C13.8102 17.3416 14.1723 17.4998 14.4393 17.7812C14.7063 18.0626 14.8563 18.4444 14.8563 18.8424V22.0892C14.8539 22.4338 14.9821 22.7652 15.2124 23.0097C15.4427 23.2542 15.7561 23.3918 16.0829 23.3918H18.0438C18.9596 23.3943 19.8388 23.0125 20.4872 22.3308C21.1356 21.649 21.5 20.7233 21.5 19.7579V10.5081C21.5 9.72831 21.1721 8.9886 20.6046 8.48828L13.934 2.87234C12.7737 1.88767 11.1111 1.91946 9.98539 2.94785L3.46701 8.48828C2.87274 8.97385 2.51755 9.71575 2.5 10.5081V19.7485C2.5 21.7606 4.04738 23.3918 5.95617 23.3918H7.87229C8.55123 23.3918 9.103 22.8144 9.10792 22.0987L9.13478 22.0892Z"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
    />
  </Icon>
)

export default memo(Home)
