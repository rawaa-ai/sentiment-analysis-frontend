import React from 'react';
import { Sun, Moon, Zap } from 'lucide-react';
import { useColorDropdown } from '../Context/Theme';

export default function ThemeDropdown() {
    const { selectedSchemeKey, selectScheme, selectedScheme } = useColorDropdown();

    const icons = [
        {
            key: 'green',
            Icon: Zap,
            className: 'text-green-900',
        },
        {
            key: 'dark',
            Icon: Moon,
            className: 'text-gray-700',
        },
        {
            key: 'light',
            Icon: Sun,
            className: 'text-yellow-400',
        },
    ];

    return (
        <div
            className="flex gap-2 p-1 rounded-full items-center justify-center w-fit border dark:border-gray-800 border-gray-300"
            style={{
                background: selectedScheme.backgroundColor,
                color: selectedScheme.textColor,
            }}
        >
            {icons.map(({ key, Icon, className }) => (
                <button
                    key={key}
                    onClick={() => selectScheme(key)}
                    className={`transition duration-200 p-1 rounded-full ${
                        selectedSchemeKey === key ? `ring-2 ring-${selectedScheme.iconBorder}` : ''
                    } cursor-pointer`}
                >
                    <Icon size={18} className={className} />
                </button>
            ))}
        </div>
    );
}
