import { forwardRef, type ReactElement, type ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  Popover as TPopover,
  type PopoverProps as TPopoverProps,
  type TamaguiElement,
} from 'tamagui'
import {
  PopoverBody,
  POPOVER_OFFSET,
  POPOVER_VIEWPORT_GUTTER,
  popoverMotion,
  popoverSurface,
} from './Popover.styles'

/** Preferred side / alignment relative to the trigger (floating-ui placement). */
export type PopoverPlacement = NonNullable<TPopoverProps['placement']>

const DEFAULT_WIDTH = 320

export interface PopoverProps {
  /**
   * The element that toggles the popover. Rendered as-is (`asChild`), so it
   * must accept a `ref` and press handlers — a `Button`, a pressable `Stack`
   * or a native `<button>` all work. It receives `aria-expanded` automatically.
   */
  trigger: ReactElement
  /** Popover content. */
  children: ReactNode
  /** Controlled open state. Omit for uncontrolled. */
  open?: boolean
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean
  /** Fired whenever the popover opens or closes (trigger, outside press, Escape). */
  onOpenChange?: (open: boolean) => void
  /** Preferred placement. Flips / shifts automatically to stay on screen. Defaults to `'bottom-start'`. */
  placement?: PopoverPlacement
  /**
   * Preferred width in px. Always clamped to the viewport minus a gutter, so
   * the popover never overflows a narrow phone screen. Defaults to 320.
   */
  width?: number
  /** Apply the standard inner padding. Set to `false` for edge-to-edge content. Defaults to `true`. */
  padded?: boolean
  /** Accessible name of the popover surface (announced when focus moves into it). */
  'aria-label'?: string
  /** Id of an element inside the content that names the popover (alternative to `aria-label`). */
  'aria-labelledby'?: string
}

/**
 * Popover — a small floating card anchored to a trigger.
 *
 * Built on Tamagui's `Popover`, which uses floating-ui under the hood
 * (`@floating-ui/react-dom` on web, `@floating-ui/react-native` on native), so
 * the same component works in the web app and the React Native app.
 *
 * Behaviour:
 *   - Opens on trigger press; closes on a second press, an outside press or `Escape`.
 *   - Flips to the opposite side and shifts along the edge when it would leave
 *     the viewport, keeping a gutter from the screen edges.
 *   - Width is clamped to the viewport, and on web the height is capped to the
 *     available space (content scrolls), so it fits small screens too.
 *   - Focus moves into the content on open and returns to the trigger on close.
 *
 * ```tsx
 * <Popover trigger={<Button>Details</Button>} aria-label="User details">
 *   <Typography>…</Typography>
 * </Popover>
 * ```
 */
export const Popover = forwardRef<TamaguiElement, PopoverProps>(function Popover(
  {
    trigger,
    children,
    open,
    defaultOpen,
    onOpenChange,
    placement = 'bottom-start',
    width = DEFAULT_WIDTH,
    padded = true,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  },
  ref,
) {
  const { width: viewportWidth } = useWindowDimensions()
  // `resize` already clamps the width on web; native has no size middleware,
  // so the clamp is computed here for both platforms.
  const contentWidth = Math.max(0, Math.min(width, viewportWidth - POPOVER_VIEWPORT_GUTTER * 2))

  return (
    <TPopover
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
      placement={placement}
      offset={POPOVER_OFFSET}
      allowFlip={{ padding: POPOVER_VIEWPORT_GUTTER }}
      stayInFrame={{ padding: POPOVER_VIEWPORT_GUTTER }}
      resize={{ padding: POPOVER_VIEWPORT_GUTTER }}
    >
      <TPopover.Trigger asChild>{trigger}</TPopover.Trigger>

      <TPopover.Content
        ref={ref as never}
        role="dialog"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        width={contentWidth}
        {...popoverSurface}
        {...popoverMotion}
      >
        <TPopover.ScrollView>
          <PopoverBody padded={padded}>{children}</PopoverBody>
        </TPopover.ScrollView>
      </TPopover.Content>
    </TPopover>
  )
})
