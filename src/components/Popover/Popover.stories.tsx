import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { XStack, YStack } from 'tamagui'
import { Avatar } from '../Avatar'
import { Badge } from '../Badge'
import { Button } from '../Button'
import { Typography } from '../Typography'
import { Popover } from './Popover'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right',
      ],
    },
    width: { control: { type: 'number', min: 160, max: 640, step: 20 } },
    padded: { control: 'boolean' },
  },
  args: {
    placement: 'bottom-start',
    width: 320,
    padded: true,
    'aria-label': 'Example popover',
  },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Playground: Story = {
  args: {
    trigger: <Button>Open popover</Button>,
    children: (
      <Typography variant="regularRegular" width="100%">
        Popovers float next to their trigger, close on an outside press or Escape, and always stay
        inside the viewport.
      </Typography>
    ),
  },
}

/** A profile card — the main use case (a chat participant's details). */
export const ProfileCard: Story = {
  render: (args) => (
    <Popover
      {...args}
      aria-label="Joe Doe"
      trigger={
        <Button variant="mutedPrimary" aria-label="Show details of Joe Doe">
          <Avatar name="Joe Doe" size={32} />
        </Button>
      }
    >
      <XStack gap="$md" alignItems="center">
        <Avatar name="Joe Doe" size={48} />
        <YStack flex={1} minWidth={0}>
          <Typography variant="regularBold">Joe Doe</Typography>
          <Typography variant="smallRegular" color="$colorMuted">
            joe.doe@example.com
          </Typography>
        </YStack>
      </XStack>
      <XStack gap="$xs" flexWrap="wrap">
        <Badge>Volunteer</Badge>
      </XStack>
    </Popover>
  ),
}

/** Placed near the right edge: the popover shifts left instead of overflowing. */
export const NearViewportEdge: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <XStack justifyContent="flex-end" padding="$sm">
      <Popover {...args} trigger={<Button>Edge</Button>} placement="bottom-start">
        <Typography variant="regularRegular" width="100%">
          This popover prefers `bottom-start`, but shifts to stay on screen.
        </Typography>
      </Popover>
    </XStack>
  ),
}

/** Owning the open state, e.g. to close the popover after an action inside it. */
export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [open, setOpen] = useState(false)
    return (
      <YStack gap="$md" alignItems="center">
        <Popover {...args} open={open} onOpenChange={setOpen} trigger={<Button>Toggle</Button>}>
          <Typography variant="regularRegular" width="100%">
            Controlled content.
          </Typography>
          <Button variant="mutedPrimary" onPress={() => setOpen(false)}>
            Done
          </Button>
        </Popover>
        <Typography variant="smallRegular" color="$colorMuted">
          open: {String(open)}
        </Typography>
      </YStack>
    )
  },
}
