import React, { useState, KeyboardEvent } from "react";

type SwitchProps = {
    onChange?: (checked: boolean) => void,
    className?: string,
    label?: JSX.Element
};

export default function Switch({
    onChange,
    className,
    label
}: SwitchProps) {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);

        if (onChange) {
            onChange(newCheckedState);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
        }
    };

    return (
        <label 
            className={`switch ${className || ''}`} 
            tabIndex={0} 
            onKeyDown={handleKeyDown}
        >
            <input
                type="checkbox"
                className="peer"
                checked={isChecked}
                onChange={handleToggle}
                aria-checked={isChecked}
            />
            <div className="w-11 h-6 bg-gray-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-900 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-700"></div>
            {label && <span>{label}</span>}
        </label>
    );
}
