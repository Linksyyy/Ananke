import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-neutral-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-neutral-400 hover:text-neutral-200 hover:border-b-2 hover:border-neutral-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grow">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`h-full ${activeTab === tab.id ? '' : 'hidden'}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
