import { styled, YStack } from 'tamagui'
import { shadows } from '../../tokens/shadows'

/**
 * Popover styles — pure visual config, no behaviour.
 *
 * The floating container itself is Tamagui's `Popover.Content` (it owns
 * positioning, dismissal and focus handling), so the surface props live in a
 * plain object that `Popover.tsx` spreads onto it. Everything inside the
 * surface is laid out by `PopoverBody`.
 */

/** Distance (px) kept between the popover and the viewport edges. */
export const POPOVER_VIEWPORT_GUTTER = 12

/** Gap (px) between the trigger and the popover. */
export const POPOVER_OFFSET = 8

/** Surface treatment for `Popover.Content` — the raised "card" look. */
export const popoverSurface = {
  backgroundColor: '$background',
  borderRadius: '$lg',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '$borderColor',
  padding: 0,
  overflow: 'hidden',
  ...shadows.large,
} as const

/** Enter / exit motion — a short fade + lift, matching the Select popover. */
export const popoverMotion = {
  animation: 'quick',
  enterStyle: { opacity: 0, y: -4 },
  exitStyle: { opacity: 0, y: -4 },
} as const

export const PopoverBody = styled(YStack, {
  name: 'PopoverBody',
  width: '100%',
  gap: '$md',

  variants: {
    padded: {
      true: { padding: '$lg' },
      false: { padding: 0 },
    },
  } as const,

  defaultVariants: {
    padded: true,
  },
})
