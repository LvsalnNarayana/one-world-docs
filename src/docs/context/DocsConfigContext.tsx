// External
import React, {
  useMemo,
  useState,
  useContext,
  createContext,
  type ReactNode,
} from "react";

// ----------------------
// Interfaces
// ----------------------
export interface LayoutSettings {
  tableOfContents: boolean;
  outline: boolean;
  pageSetup: boolean;
  comments: boolean;
  showCollaboratorPresence: boolean;
}

export interface DocumentSettings {
  zoom: number;
  wordCount: boolean;
}

export interface EditorSettings {
  spellingGrammar: boolean;
}

export interface DocSettings {
  layout: LayoutSettings;
  document: DocumentSettings;
  editor: EditorSettings;
}

// Unified key structure for updating
type SettingSection = keyof DocSettings;
type SettingKey = string; // dynamic string indexing

interface UpdateSettingKey {
  section: SettingSection;
  key: SettingKey;
}

// ----------------------
// Initial State
// ----------------------
const initialSettingsState: DocSettings = {
  editor: {
    spellingGrammar: true,
  },
  document: {
    zoom: 100,
    wordCount: false,
  },
  layout: {
    comments: true,
    pageSetup: false,
    tableOfContents: false,
    outline: false,
    showCollaboratorPresence: false,
  },
};

// ----------------------
// Context Type
// ----------------------
interface DocConfigContextType {
  settings: DocSettings;
  updateSetting: (
    target: UpdateSettingKey,
    value: boolean | string | number
  ) => void;
}

// ----------------------
// Create Context
// ----------------------
const DocConfigContext = createContext<DocConfigContextType | undefined>(
  undefined
);

// ----------------------
// Provider Component
// ----------------------
export const DocConfigProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<DocSettings>(initialSettingsState);

  const updateSetting = (
    { key, section }: UpdateSettingKey,
    value: boolean | string | number
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const value = useMemo(
    () => ({
      settings,
      updateSetting,
    }),
    [settings]
  );

  return (
    <DocConfigContext.Provider value={value}>
      {children}
    </DocConfigContext.Provider>
  );
};

// ----------------------
// Hook for Consumers
// ----------------------
export const useDocConfig = (): DocConfigContextType => {
  const context = useContext(DocConfigContext);
  if (!context) {
    throw new Error("useDocConfig must be used within a DocConfigProvider");
  }
  return context;
};
