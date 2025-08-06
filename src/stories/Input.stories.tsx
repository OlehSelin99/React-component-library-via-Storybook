import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible input component with various types and features like password toggle and clear functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'number', 'email'],
      description: 'The type of input field',
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Show clear button when input has value',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the input field',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the input',
    },
    value: {
      control: { type: 'text' },
      description: 'Initial value of the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
    type: 'text',
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic text input with placeholder.',
      },
    },
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
    value: 'secretpassword',
  },
  parameters: {
    docs: {
      description: {
        story: 'A password input with toggle visibility feature.',
      },
    },
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number...',
    value: '42',
  },
  parameters: {
    docs: {
      description: {
        story: 'A number input for numeric values.',
      },
    },
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email...',
    value: 'user@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'An email input with email validation.',
      },
    },
  },
};

export const Clearable: Story = {
  args: {
    type: 'text',
    placeholder: 'Type and clear...',
    value: 'Clear me!',
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'An input with clear button functionality.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Disabled input',
    value: 'Cannot edit this',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled input that cannot be edited.',
      },
    },
  },
};
