import { forwardRef, type ReactNode } from 'react'
import { Dialog as TDialog, ScrollView, type TamaguiElement, YStack } from 'tamagui'
import {
  DIALOG_MAX_WIDTH,
  DialogCloseFrame,
  DialogCloseStroke,
  DialogDescriptionText,
  DialogFooter,
  DialogHeader,
  DialogTitleText,
  dialogOverlay,
  dialogPortal,
  dialogSurface,
  type DialogSize,
} from './Dialog.styles'

export interface DialogProps {
  /** Controlled open state. Omit for uncontrolled. */
  open?: boolean
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean
  /** Fired when the dialog requests to open or close (close button, `Escape`, backdrop press). */
  onOpenChange?: (open: boolean) => void
  /** Heading — also the dialog's accessible name. */
  title: string
  /** Supporting text under the title — also the dialog's accessible description. */
  description?: string
  /** Body content, rendered below the description. Scrolls when taller than the viewport. */
  children?: ReactNode
  /** Actions row (usually `Button`s), aligned to the end and wrapping on narrow screens. */
  footer?: ReactNode
  /** Max width of the surface. Defaults to `'sm'`. */
  size?: DialogSize
  /** Accessible label of the close button. Pass a localised string. Defaults to `'Close'`. */
  closeLabel?: string
  /** Hide the close button in the header. */
  hideCloseButton?: boolean
  /**
   * When `false`, `Escape`, backdrop presses and the close button do not close
   * the dialog — use while a confirmed action is in flight. Defaults to `true`.
   */
  dismissible?: boolean
}

/**
 * Dialog — a modal surface for focused tasks and confirmations.
 *
 * Built on Tamagui's `Dialog`, which handles portalling, focus trapping, scroll
 * locking and `Escape` / backdrop dismissal on web and native. This wrapper adds
 * the Peryskop look (themed scrim, raised card, title / description / footer
 * slots) and keeps the card inside the viewport on small screens.
 *
 * ```tsx
 * <Dialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Leave the chat?"
 *   description="You can come back at any time."
 *   closeLabel="Close"
 *   footer={<Button onPress={leave}>Leave</Button>}
 * />
 * ```
 *
 * For the common "are you sure?" case use `ConfirmDialog`.
 */
export const Dialog = forwardRef<TamaguiElement, DialogProps>(function Dialog(
  {
    open,
    defaultOpen,
    onOpenChange,
    title,
    description,
    children,
    footer,
    size = 'sm',
    closeLabel = 'Close',
    hideCloseButton = false,
    dismissible = true,
  },
  ref,
) {
  const handleOpenChange = (next: boolean) => {
    if (!next && !dismissible) return
    onOpenChange?.(next)
  }

  const preventWhenLocked = (event: { preventDefault: () => void }) => {
    if (!dismissible) event.preventDefault()
  }

  return (
    <TDialog modal open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
      <TDialog.Portal {...dialogPortal}>
        <TDialog.Overlay key="overlay" {...dialogOverlay} />

        <TDialog.Content
          key="content"
          ref={ref as never}
          maxWidth={DIALOG_MAX_WIDTH[size]}
          {...dialogSurface}
          // Opt out of Tamagui's "missing Description" warning when there is none.
          {...(description ? null : { 'aria-describedby': undefined })}
          onEscapeKeyDown={preventWhenLocked}
          onPointerDownOutside={preventWhenLocked}
        >
          <DialogHeader>
            <TDialog.Title asChild>
              <DialogTitleText tag="h2">{title}</DialogTitleText>
            </TDialog.Title>

            {hideCloseButton ? null : (
              <TDialog.Close asChild>
                <DialogCloseFrame
                  aria-label={closeLabel}
                  disabled={!dismissible}
                  aria-disabled={!dismissible || undefined}
                  opacity={dismissible ? 1 : 0.4}
                  cursor={dismissible ? 'pointer' : 'not-allowed'}
                >
                  <DialogCloseStroke rotate="45deg" />
                  <DialogCloseStroke rotate="-45deg" />
                </DialogCloseFrame>
              </TDialog.Close>
            )}
          </DialogHeader>

          {description || children ? (
            <ScrollView flexShrink={1} showsVerticalScrollIndicator={false}>
              <YStack gap="$md">
                {description ? (
                  <TDialog.Description asChild>
                    <DialogDescriptionText tag="p">{description}</DialogDescriptionText>
                  </TDialog.Description>
                ) : null}
                {children}
              </YStack>
            </ScrollView>
          ) : null}

          {footer ? <DialogFooter>{footer}</DialogFooter> : null}
        </TDialog.Content>
      </TDialog.Portal>
    </TDialog>
  )
})
