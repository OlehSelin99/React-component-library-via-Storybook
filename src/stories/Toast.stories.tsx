import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from '../components/Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A toast notification component with different types and customizable options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'The type of toast notification',
    },
    duration: {
      control: { type: 'number' },
      description: 'Duration in milliseconds (0 = no auto-dismiss)',
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: 'Show the close button',
    },
    message: {
      control: { type: 'text' },
      description: 'The message to display in the toast',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const toastContainerStyle = {
  minHeight: '200px',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  padding: '20px',
  background: '#f5f5f5',
};

const toastDecorator = (Story: React.ComponentType) => (
  <div style={toastContainerStyle}>
    <Story />
  </div>
);

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Operation completed successfully!',
    duration: 10000,
  },
  parameters: {
    docs: {
      description: {
        story: 'A success toast notification with green styling.',
      },
    },
  },
  decorators: [toastDecorator],
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Something went wrong. Please try again.',
    duration: 5000,
  },
  parameters: {
    docs: {
      description: {
        story: 'An error toast notification with red styling.',
      },
    },
  },
  decorators: [toastDecorator],
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Please review your input before proceeding.',
    duration: 5000,
  },
  parameters: {
    docs: {
      description: {
        story: 'A warning toast notification with yellow styling.',
      },
    },
  },
  decorators: [toastDecorator],
};

export const Info: Story = {
  args: {
    type: 'info',
    message: 'Here is some helpful information.',
    duration: 5000,
  },
  parameters: {
    docs: {
      description: {
        story: 'An info toast notification with blue styling.',
      },
    },
  },
  decorators: [toastDecorator],
};

export const LongDuration: Story = {
  args: {
    type: 'info',
    message: 'This toast will stay visible for 10 seconds.',
    duration: 10000,
  },
  parameters: {
    docs: {
      description: {
        story: 'A toast with extended duration (10 seconds).',
      },
    },
  },
  decorators: [toastDecorator],
};

export const NoAutoDismiss: Story = {
  args: {
    type: 'warning',
    message: 'This toast will not auto-dismiss.',
    duration: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'A toast that will not automatically dismiss (duration: 0).',
      },
    },
  },
  decorators: [toastDecorator],
};

export const NoCloseButton: Story = {
  args: {
    type: 'success',
    message: 'This toast has no close button.',
    duration: 5000,
    showCloseButton: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'A toast without a close button (showCloseButton: false).',
      },
    },
  },
  decorators: [toastDecorator],
};
