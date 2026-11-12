import { forwardRef, type ReactNode } from 'react'
import type { TamaguiElement } from 'tamagui'
import { Button } from '../Button'
import { Dialog } from '../Dialog'

export type ConfirmDialogTone = 'primary' | 'danger'

/** Buttons share the row equally and wrap to full width once they would get narrower than this. */
const ACTION_MIN_WIDTH = 140

export interface ConfirmDialogProps {
  /** Controlled open state. */
  open: boolean
  /** Fired when the dialog asks to close (cancel, close button, `Escape`, backdrop press). */
  onOpenChange: (open: boolean) => void
  /** Called when the confirm button is pressed. The dialog does not close itself — the caller decides. */
  onConfirm: () => void
  /** The question being asked, e.g. "Leave the chat?". */
  title: string
  /** Consequences of confirming, in one or two sentences. */
  description?: string
  /** Extra body content below the description. */
  children?: ReactNode
  /** Label of the confirm button. Pass a localised string. */
  confirmLabel: string
  /** Label of the cancel button. Pass a localised string. */
  cancelLabel: string
  /** Accessible label of the header close button. Pass a localised string. */
  closeLabel?: string
  /** `'danger'` for destructive or irreversible actions. Defaults to `'primary'`. */
  tone?: ConfirmDialogTone
  /** Disables both actions and blocks dismissal while the confirmed action runs. */
  loading?: boolean
}

/**
 * ConfirmDialog — a `Dialog` preset for "are you sure?" decisions.
 *
 * Renders the question, its consequences and two actions: a quiet cancel and a
 * confirm button in the chosen tone. On narrow screens the actions stack to
 * full width so both stay comfortable touch targets.
 *
 * ```tsx
 * <ConfirmDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Leave the chat?"
 *   description="Your conversation stays saved."
 *   confirmLabel="Leave"
 *   cancelLabel="Stay"
 *   onConfirm={leave}
 * />
 * ```
 */
export const ConfirmDialog = forwardRef<TamaguiElement, ConfirmDialogProps>(function ConfirmDialog(
  {
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    children,
    confirmLabel,
    cancelLabel,
    closeLabel,
    tone = 'primary',
    loading = false,
  },
  ref,
) {
  return (
    <Dialog
      ref={ref}
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      closeLabel={closeLabel}
      dismissible={!loading}
      footer={
        <>
          <Button
            variant="mutedPrimary"
            outlined
            flexGrow={1}
            flexBasis={0}
            minWidth={ACTION_MIN_WIDTH}
            disabled={loading}
            onPress={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={tone}
            flexGrow={1}
            flexBasis={0}
            minWidth={ACTION_MIN_WIDTH}
            disabled={loading}
            aria-busy={loading || undefined}
            onPress={onConfirm}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      {children}
    </Dialog>
  )
})
