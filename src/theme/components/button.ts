export const Button = {
  defaultProps: {
    size: 'lg'
  },
  sizes: {
    lg: {
      borderRadius: 'full',
      h: 13,
      _text: {
        fontSize: 'md',
        fontWeight: 'normal',
        lineHeight: 'sm'
      }
    }
  },
  variants: {
    solid: (props: Record<string, any>) =>
      props.colorScheme === 'primary'
        ? {
            bg: 'primary.700'
          }
        : {}
  }
}
