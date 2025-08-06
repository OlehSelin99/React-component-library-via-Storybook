import { useState } from 'react';
import { Input, Toast, SidebarMenu } from './components';
import type { MenuItem } from './components';
import './App.scss';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('success');
  const [toastMessage, setToastMessage] = useState('');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      onClick: () => {
        setToastMessage('Dashboard clicked!');
        setToastType('info');
        setShowToast(true);
      },
    },
    {
      id: 'products',
      label: 'Products',
      icon: '📦',
      children: [
        {
          id: 'all-products',
          label: 'All Products',
          onClick: () => {
            setToastMessage('All Products clicked!');
            setToastType('success');
            setShowToast(true);
          },
        },
        {
          id: 'categories',
          label: 'Categories',
          children: [
            {
              id: 'electronics',
              label: 'Electronics',
              onClick: () => {
                setToastMessage('Electronics clicked!');
                setToastType('warning');
                setShowToast(true);
              },
            },
            {
              id: 'clothing',
              label: 'Clothing',
              onClick: () => {
                setToastMessage('Clothing clicked!');
                setToastType('info');
                setShowToast(true);
              },
            },
          ],
        },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      onClick: () => {
        setToastMessage('Settings clicked!');
        setToastType('info');
        setShowToast(true);
      },
    },
  ];

  const handleShowToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: 'Operation completed successfully!',
      error: 'Something went wrong. Please try again.',
      warning: 'Please review your input before proceeding.',
      info: 'Here is some helpful information.',
    };
    setToastType(type);
    setToastMessage(messages[type]);
    setShowToast(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Component Library Demo</h1>
        <p>
          A showcase of reusable UI components built with TypeScript and
          Storybook
        </p>
      </header>

      <main className="app-main">
        <section className="component-section">
          <h2>Input Component</h2>
          <div className="component-demo">
            <div className="input-group">
              <label>Text Input:</label>
              <Input
                placeholder="Enter your name..."
                value={inputValue}
                onChange={setInputValue}
                clearable
              />
            </div>

            <div className="input-group">
              <label>Password Input:</label>
              <Input
                type="password"
                placeholder="Enter password..."
                value={passwordValue}
                onChange={setPasswordValue}
                clearable
              />
            </div>

            <div className="input-group">
              <label>Number Input:</label>
              <Input type="number" placeholder="Enter a number..." clearable />
            </div>

            <div className="input-group">
              <label>Email Input:</label>
              <Input type="email" placeholder="Enter email..." clearable />
            </div>
          </div>
        </section>

        <section className="component-section">
          <h2>Toast Component</h2>
          <div className="component-demo">
            <div className="toast-buttons">
              <button
                onClick={() => handleShowToast('success')}
                className="btn btn-success"
              >
                Show Success Toast
              </button>
              <button
                onClick={() => handleShowToast('error')}
                className="btn btn-error"
              >
                Show Error Toast
              </button>
              <button
                onClick={() => handleShowToast('warning')}
                className="btn btn-warning"
              >
                Show Warning Toast
              </button>
              <button
                onClick={() => handleShowToast('info')}
                className="btn btn-info"
              >
                Show Info Toast
              </button>
            </div>
          </div>
        </section>

        <section className="component-section">
          <h2>Sidebar Menu Component</h2>
          <div className="component-demo">
            <button
              onClick={() => setSidebarOpen(true)}
              className="btn btn-primary"
            >
              Open Sidebar Menu
            </button>
          </div>
        </section>

        <section className="component-section">
          <h2>Storybook Documentation</h2>
          <div className="component-demo">
            <p>
              For detailed component documentation and interactive examples,
              visit Storybook:
            </p>
            <a
              href="http://localhost:6006"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Open Storybook
            </a>
          </div>
        </section>
      </main>

      {showToast && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}

      <SidebarMenu
        items={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title="Navigation Menu"
      />
    </div>
  );
}

export default App;
