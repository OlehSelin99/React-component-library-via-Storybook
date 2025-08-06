import React, { useState } from 'react';
import styles from './SidebarMenu.module.scss';

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  children?: MenuItem[];
  onClick?: () => void;
}

export interface SidebarMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items,
  isOpen,
  onClose,
  title = 'Menu',
  className = '',
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id);
    } else {
      item.onClick?.();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id} className={styles.menuItemContainer}>
        <div
          className={`${styles.menuItem} ${styles[`menuItemLevel${level}`]} ${hasChildren ? styles.hasChildren : ''} ${isExpanded ? styles.expanded : ''}`}
          onClick={() => handleItemClick(item)}
        >
          <div className={styles.menuItemContent}>
            {item.icon && (
              <span className={styles.menuItemIcon}>{item.icon}</span>
            )}
            <span className={styles.menuItemLabel}>{item.label}</span>
          </div>
          {hasChildren && (
            <span
              className={`${styles.menuItemArrow} ${isExpanded ? styles.expanded : ''}`}
            >
              ▶
            </span>
          )}
        </div>

        {hasChildren && (
          <div
            className={`${styles.submenu} ${isExpanded ? styles.expanded : ''}`}
          >
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div className={styles.sidebarBackdrop} onClick={handleBackdropClick} />
      )}
      <div
        className={`${styles.sidebarMenu} ${isOpen ? styles.open : ''} ${className}`}
      >
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>{title}</h2>
          <button
            className={styles.sidebarClose}
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <div className={styles.sidebarContent}>
          {items.map(item => renderMenuItem(item))}
        </div>
      </div>
    </>
  );
};
