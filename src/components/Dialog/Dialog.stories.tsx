import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Typography } from '../Typography'
import { Dialog, type DialogProps } from './Dialog'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    hideCloseButton: { control: 'boolean' },
    dismissible: { control: 'boolean' },
  },
  args: {
    title: 'Session summary',
    description: 'A short paragraph that explains what this dialog is about.',
    size: 'sm',
    closeLabel: 'Close',
    hideCloseButton: false,
    dismissible: true,
  },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Dialog>

type DialogDemoProps = DialogProps & {
  /** Receives a `close` callback so footer actions can dismiss the dialog. */
  renderFooter?: (close: () => void) => DialogProps['footer']
}

/** Stories own the open state so the trigger and close controls work in the canvas. */
function DialogDemo({ renderFooter, ...args }: DialogDemoProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onPress={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        {...args}
        open={open}
        onOpenChange={setOpen}
        footer={renderFooter?.(() => setOpen(false))}
      />
    </>
  )
}

export const Playground: Story = {
  render: (args) => (
    <DialogDemo
      {...args}
      renderFooter={(close) => (
        <Button onPress={close} minWidth={120}>
          Got it
        </Button>
      )}
    />
  ),
}

export const WithBody: Story = {
  args: { size: 'md' },
  render: (args) => (
    <DialogDemo {...args}>
      <Typography variant="regularRegular" width="100%">
        Any content can go in the body. When it is taller than the screen it scrolls while the
        header and footer stay in place.
      </Typography>
    </DialogDemo>
  ),
}

export const LongContent: Story = {
  render: (args) => (
    <DialogDemo {...args}>
      {Array.from({ length: 20 }, (_, i) => (
        <Typography key={i} variant="regularRegular" width="100%">
          Paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      ))}
    </DialogDemo>
  ),
}

/** `dismissible={false}` blocks Escape, backdrop presses and the close button. */
export const NotDismissible: Story = {
  args: { dismissible: false, description: 'Only the footer action closes this dialog.' },
  render: function NotDismissibleStory(args) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onPress={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          footer={<Button onPress={() => setOpen(false)}>Close</Button>}
        />
      </>
    )
  },
}
