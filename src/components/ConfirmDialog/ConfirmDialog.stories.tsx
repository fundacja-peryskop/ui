import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { ConfirmDialog, type ConfirmDialogProps } from './ConfirmDialog'

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    tone: { control: 'inline-radio', options: ['primary', 'danger'] },
    loading: { control: 'boolean' },
  },
  args: {
    title: 'Leave the chat?',
    description: 'Your conversation stays saved - you can come back at any time.',
    confirmLabel: 'Leave',
    cancelLabel: 'Stay',
    closeLabel: 'Close',
    tone: 'primary',
    loading: false,
  },
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof ConfirmDialog>

function ConfirmDemo(args: Omit<ConfirmDialogProps, 'open' | 'onOpenChange' | 'onConfirm'>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant={args.tone} onPress={() => setOpen(true)}>
        Open
      </Button>
      <ConfirmDialog
        {...args}
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => setOpen(false)}
      />
    </>
  )
}

export const Playground: Story = {
  render: (args) => <ConfirmDemo {...args} />,
}

export const Danger: Story = {
  args: {
    tone: 'danger',
    title: 'Close this chat?',
    description: 'The conversation will be archived and cannot be reopened.',
    confirmLabel: 'Close chat',
    cancelLabel: 'Cancel',
  },
  render: (args) => <ConfirmDemo {...args} />,
}

/** While the action runs, both buttons are disabled and the dialog cannot be dismissed. */
export const Loading: Story = {
  args: { loading: true },
  render: (args) => <ConfirmDemo {...args} />,
}
