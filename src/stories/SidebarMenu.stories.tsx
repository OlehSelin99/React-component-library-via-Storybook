import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SidebarMenu } from '../components/SidebarMenu';
import type { MenuItem } from '../components/SidebarMenu';

const meta: Meta<typeof SidebarMenu> = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive sidebar menu component with nested navigation support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'The title displayed in the sidebar header',
    },
    isOpen: {
      control: { type: 'boolean' },
      description: 'Controls whether the sidebar is open or closed',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the sidebar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const simpleMenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    onClick: () => console.log('Dashboard clicked'),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: '👤',
    onClick: () => console.log('Profile clicked'),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    onClick: () => console.log('Settings clicked'),
  },
];

const nestedMenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    onClick: () => console.log('Dashboard clicked'),
  },
  {
    id: 'products',
    label: 'Products',
    icon: '📦',
    children: [
      {
        id: 'all-products',
        label: 'All Products',
        onClick: () => console.log('All Products clicked'),
      },
      {
        id: 'categories',
        label: 'Categories',
        children: [
          {
            id: 'electronics',
            label: 'Electronics',
            onClick: () => console.log('Electronics clicked'),
          },
          {
            id: 'clothing',
            label: 'Clothing',
            onClick: () => console.log('Clothing clicked'),
          },
        ],
      },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    icon: '👥',
    children: [
      {
        id: 'all-users',
        label: 'All Users',
        onClick: () => console.log('All Users clicked'),
      },
      {
        id: 'user-groups',
        label: 'User Groups',
        onClick: () => console.log('User Groups clicked'),
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    onClick: () => console.log('Settings clicked'),
  },
];

const complexMenuItems: MenuItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: '🏠',
    onClick: () => console.log('Overview clicked'),
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📈',
    children: [
      {
        id: 'sales',
        label: 'Sales Analytics',
        children: [
          {
            id: 'daily-sales',
            label: 'Daily Sales',
            onClick: () => console.log('Daily Sales clicked'),
          },
          {
            id: 'monthly-sales',
            label: 'Monthly Sales',
            onClick: () => console.log('Monthly Sales clicked'),
          },
        ],
      },
      {
        id: 'user-analytics',
        label: 'User Analytics',
        children: [
          {
            id: 'user-retention',
            label: 'User Retention',
            onClick: () => console.log('User Retention clicked'),
          },
          {
            id: 'user-growth',
            label: 'User Growth',
            onClick: () => console.log('User Growth clicked'),
          },
        ],
      },
    ],
  },
  {
    id: 'management',
    label: 'Management',
    icon: '👨‍💼',
    children: [
      {
        id: 'employees',
        label: 'Employees',
        onClick: () => console.log('Employees clicked'),
      },
      {
        id: 'departments',
        label: 'Departments',
        onClick: () => console.log('Departments clicked'),
      },
    ],
  },
];

const containerStyle = {
  padding: '20px',
  height: '100vh',
  background: '#f5f5f5',
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  marginBottom: '20px',
};

function createButtonStyle(color: string) {
  return {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: color,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: `0 4px 12px ${color}40`,
    transition: 'all 0.2s ease',
  };
}

function handleButtonHover(
  e: React.MouseEvent<HTMLButtonElement>,
  color: string
) {
  e.currentTarget.style.transform = 'translateY(-2px)';
  e.currentTarget.style.boxShadow = `0 6px 16px ${color}60`;
}

function handleButtonLeave(
  e: React.MouseEvent<HTMLButtonElement>,
  color: string
) {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.boxShadow = `0 4px 12px ${color}40`;
}

const SidebarMenuWrapper = ({
  items,
  isOpen,
  onClose,
  title,
}: {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}) => (
  <SidebarMenu items={items} isOpen={isOpen} onClose={onClose} title={title} />
);

export const Simple: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    const buttonStyle = createButtonStyle('#667eea');

    return (
      <div style={containerStyle}>
        <div style={buttonContainerStyle}>
          <button
            onClick={() => setIsOpen(true)}
            style={buttonStyle}
            onMouseEnter={e => handleButtonHover(e, '#667eea')}
            onMouseLeave={e => handleButtonLeave(e, '#667eea')}
          >
            🚀 Open Simple Menu
          </button>
        </div>
        <SidebarMenuWrapper
          {...args}
          items={simpleMenuItems}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Simple Menu"
        />
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'A simple sidebar menu with basic navigation items.',
      },
    },
  },
};

export const Nested: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    const buttonStyle = createButtonStyle('#28a745');

    return (
      <div style={containerStyle}>
        <div style={buttonContainerStyle}>
          <button
            onClick={() => setIsOpen(true)}
            style={buttonStyle}
            onMouseEnter={e => handleButtonHover(e, '#28a745')}
            onMouseLeave={e => handleButtonLeave(e, '#28a745')}
          >
            📂 Open Nested Menu
          </button>
        </div>
        <SidebarMenuWrapper
          {...args}
          items={nestedMenuItems}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Nested Menu"
        />
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'A sidebar menu with nested navigation items and expandable sections.',
      },
    },
  },
};

export const Complex: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    const buttonStyle = createButtonStyle('#dc3545');

    return (
      <div style={containerStyle}>
        <div style={buttonContainerStyle}>
          <button
            onClick={() => setIsOpen(true)}
            style={buttonStyle}
            onMouseEnter={e => handleButtonHover(e, '#dc3545')}
            onMouseLeave={e => handleButtonLeave(e, '#dc3545')}
          >
            🎯 Open Complex Menu
          </button>
        </div>
        <SidebarMenuWrapper
          {...args}
          items={complexMenuItems}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Complex Menu"
        />
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'A complex sidebar menu with multiple levels of nested navigation.',
      },
    },
  },
};

export const Open: Story = {
  render: args => (
    <div
      style={{
        height: '100vh',
        background: '#f5f5f5',
        position: 'relative' as const,
        overflow: 'hidden' as const,
      }}
    >
      <SidebarMenuWrapper
        {...args}
        items={nestedMenuItems}
        isOpen={true}
        onClose={() => {}}
        title="Open Menu"
      />
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'A sidebar menu in its open state, showing the full navigation structure.',
      },
    },
  },
};

export const WithControls: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    const buttonStyle = createButtonStyle('#17a2b8');

    return (
      <div style={containerStyle}>
        <div style={buttonContainerStyle}>
          <button
            onClick={() => setIsOpen(true)}
            style={buttonStyle}
            onMouseEnter={e => handleButtonHover(e, '#17a2b8')}
            onMouseLeave={e => handleButtonLeave(e, '#17a2b8')}
          >
            ⚙️ Open Menu
          </button>
        </div>
        <SidebarMenuWrapper
          {...args}
          items={nestedMenuItems}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
  args: {
    title: 'Custom Menu',
    isOpen: false,
    className: '',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Customize the menu title',
    },
    isOpen: {
      control: { type: 'boolean' },
      description: 'Toggle menu visibility',
    },
    className: {
      control: { type: 'text' },
      description: 'Add custom CSS classes',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive story with controls to customize the sidebar menu properties.',
      },
    },
  },
};
