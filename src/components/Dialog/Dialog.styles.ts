import { Stack, styled, Text, XStack } from 'tamagui'
import { shadows } from '../../tokens/shadows'

/**
 * Dialog styles — pure visual config, no behaviour.
 *
 * Tamagui's `Dialog.Overlay` / `Dialog.Content` own focus trapping, scroll
 * locking, dismissal and portalling, so their visual props live in plain
 * objects that `Dialog.tsx` spreads onto them. Everything else is `styled()`.
 */

export type DialogSize = 'sm' | 'md' | 'lg'

/** Max content width (px) per size. The dialog is always full width below that. */
export const DIALOG_MAX_WIDTH: Record<DialogSize, number> = {
  sm: 420,
  md: 560,
  lg: 760,
}

/** Backdrop — themed scrim with a fade. */
export const dialogOverlay = {
  backgroundColor: '$overlay',
  animation: 'quick',
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
} as const

/** Surface — a raised card that fades + scales in. */
export const dialogSurface = {
  width: '100%',
  maxHeight: '100%',
  backgroundColor: '$background',
  borderRadius: '$lg',
  borderWidth: 0,
  padding: '$xl',
  gap: '$lg',
  animation: 'quick',
  enterStyle: { opacity: 0, scale: 0.96, y: 8 },
  exitStyle: { opacity: 0, scale: 0.96, y: 8 },
  ...shadows.large,
} as const

/** Keeps the dialog off the screen edges on small viewports. */
export const dialogPortal = {
  padding: '$lg',
} as const

export const DialogHeader = styled(XStack, {
  name: 'DialogHeader',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '$md',
})

export const DialogTitleText = styled(Text, {
  name: 'DialogTitleText',
  fontFamily: '$body',
  fontSize: 24,
  lineHeight: 32,
  fontWeight: '700',
  color: '$color',
  flexShrink: 1,
})

export const DialogDescriptionText = styled(Text, {
  name: 'DialogDescriptionText',
  fontFamily: '$body',
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400',
  color: '$colorMuted',
})

export const DialogFooter = styled(XStack, {
  name: 'DialogFooter',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  gap: '$sm',
})

/** Round, icon-only close control in the header. */
export const DialogCloseFrame = styled(Stack, {
  name: 'DialogCloseFrame',
  tag: 'button',
  role: 'button',
  cursor: 'pointer',
  width: 32,
  height: 32,
  flexShrink: 0,
  // Optically align the 32px control with the 32px title line.
  marginRight: -6,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$full',
  borderWidth: 0,
  backgroundColor: '$backgroundTransparent',
  hoverStyle: { backgroundColor: '$backgroundHover' },
  pressStyle: { backgroundColor: '$backgroundPress' },
  focusVisibleStyle: {
    outlineColor: '$borderColorFocus',
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineOffset: 2,
  },
})

/** One stroke of the "×" glyph — drawn with views so it renders identically everywhere. */
export const DialogCloseStroke = styled(Stack, {
  name: 'DialogCloseStroke',
  position: 'absolute',
  width: 14,
  height: 2,
  borderRadius: '$full',
  backgroundColor: '$colorMuted',
})
