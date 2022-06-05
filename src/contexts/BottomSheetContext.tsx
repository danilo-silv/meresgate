import {
  createContext,
  FunctionComponent,
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
  ReactNode
} from 'react'

import BottomSheet from '@gorhom/bottom-sheet'
import {
  CustomBottomSheet,
  DefaultBottomSheetFeedback,
  DefaultBottomSheetFeedbackProps
} from 'organisms'

type BottomSheetContextValues = {
  close(): void
  open(): void
  setContent(content: ReactNode): void
}

interface Props {
  children: React.ReactNode
}

export type ContentFunctionComponent<P = object> = FunctionComponent<
  Pick<BottomSheetContextValues, 'close'> & P
>

const BottomSheetContext = createContext<BottomSheetContextValues>({} as BottomSheetContextValues)

let currentKey: string | null

export const useBottomSheetContext = (content?: { [k: string]: ContentFunctionComponent }) => {
  const { close, ...context } = useContext(BottomSheetContext)

  // was used `useMemo` to avoid re-renders
  const cachedContent = useMemo(() => content, [content])

  // whenever the `content` prop has any changes the content of bottom sheet component will be rendered again
  useEffect(() => {
    if (cachedContent && currentKey) {
      context.setContent(cachedContent[currentKey]({ close }))
    }
  }, [cachedContent, close, context])

  return {
    close,
    open: (value?: DefaultBottomSheetFeedbackProps | string) => {
      if (typeof value === 'string' && cachedContent && cachedContent[value]) {
        currentKey = value

        context.setContent(cachedContent[value]({ close }))
      } else {
        currentKey = null

        context.setContent(
          value ? (
            <DefaultBottomSheetFeedback
              {...{ close, ...(value as DefaultBottomSheetFeedbackProps) }}
            />
          ) : (
            cachedContent
          )
        )
      }

      context.open()
    }
  }
}

export const BottomSheetProvider: FunctionComponent<Props> = ({ children }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const [content, setContent] = useState<ReactNode>()

  const close = useCallback(() => bottomSheetRef.current?.close(), [])

  const open = useCallback(() => bottomSheetRef.current?.expand(), [])

  const contextValues = useMemo(
    () => ({
      close,
      open,
      setContent
    }),
    [close, open]
  )

  return (
    <BottomSheetContext.Provider value={contextValues}>
      {children}
      <CustomBottomSheet ref={bottomSheetRef}>{content}</CustomBottomSheet>
    </BottomSheetContext.Provider>
  )
}
