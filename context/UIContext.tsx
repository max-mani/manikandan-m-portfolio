'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ViewType = 
  | 'landing' 
  | 'about' 
  | 'projects' 
  | 'project' 
  | 'skills' 
  | 'experience' 
  | 'ctfs' 
  | 'certifications' 
  | 'contact';

interface UIContextType {
  currentView: ViewType;
  currentProject: string | null;
  commandHistory: string[];
  setView: (view: ViewType, projectId?: string) => void;
  executeCommand: (command: string) => void;
  clearView: () => void;
  addToHistory: (command: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const setView = (view: ViewType, projectId?: string) => {
    setCurrentView(view);
    setCurrentProject(projectId || null);
  };

  const clearView = () => {
    setCurrentView('landing');
    setCurrentProject(null);
  };

  const addToHistory = (command: string) => {
    setCommandHistory(prev => [...prev, command]);
  };

  const executeCommand = (command: string) => {
    addToHistory(command);
    // Command execution logic will be handled by commands.ts
  };

  return (
    <UIContext.Provider
      value={{
        currentView,
        currentProject,
        commandHistory,
        setView,
        executeCommand,
        clearView,
        addToHistory,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}


