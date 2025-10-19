// components/LoadingState.tsx
import { ActivityIndicator, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

import { Text, TextProps } from "./Text"

interface LoadingStateProps {
  /**
   * Style override for the container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * The heading text to display if not using `headingTx`.
   */
  heading?: TextProps["text"]
  /**
   * Heading text which is looked up via i18n.
   */
  headingTx?: TextProps["tx"]
  /**
   * Optional heading options to pass to i18n.
   */
  headingTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for heading text.
   */
  headingStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the heading Text component.
   */
  HeadingTextProps?: TextProps
  /**
   * Size of the activity indicator.
   */
  size?: "small" | "large"
}

/**
 * A component to display a loading state with an optional message.
 * @param {LoadingStateProps} props - The props for the `LoadingState` component.
 * @returns {JSX.Element} The rendered `LoadingState` component.
 */
export function LoadingState(props: LoadingStateProps) {
  const {
    theme,
    themed,
    theme: { spacing },
  } = useAppTheme()

  const {
    heading,
    headingTx,
    headingTxOptions,
    style: $containerStyleOverride,
    headingStyle: $headingStyleOverride,
    HeadingTextProps,
    size = "large",
  } = props

  const isHeadingPresent = !!(heading || headingTx)

  const $containerStyles = [themed($container), $containerStyleOverride]
  const $indicatorStyles = [$indicator, isHeadingPresent && { marginBottom: spacing.md }]
  const $headingStyles = [themed($headingText), $headingStyleOverride, HeadingTextProps?.style]

  return (
    <View style={$containerStyles}>
      <ActivityIndicator size={size} color={theme.colors.tint} style={$indicatorStyles} />

      {isHeadingPresent && (
        <Text
          preset="subheading"
          text={heading}
          tx={headingTx}
          txOptions={headingTxOptions}
          {...HeadingTextProps}
          style={$headingStyles}
        />
      )}
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const $indicator: ImageStyle = {
  alignSelf: "center",
}

const $headingText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  paddingHorizontal: spacing.lg,
})
