import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MODELS } from "@/config/agents";

type Props = {
  value: string;
  onChange: (model: string) => void;
  placeholder?: string;
};

export default function ModelSelector({ value, onChange, placeholder = "Select a model" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (model: string) => {
    onChange(model);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border-1 border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors duration-300 hover:border-white/20 focus:border-white/50 focus:bg-white/10 focus:outline-none sm:text-base lg:text-sm 2xl:text-base"
      >
        <span className={value ? "" : "font-light text-white/40 italic"}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-800 shadow-lg">
          <div className="max-h-36 overflow-y-auto">
            {MODELS.map((providerGroup) => (
              <div key={providerGroup.provider}>
                <p className="px-3 pt-2 text-[14px] font-semibold tracking-wider text-white/90">
                  {providerGroup.provider}
                </p>

                <ul>
                  {providerGroup.models.map((model) => (
                    <button
                      key={model}
                      type="button"
                      onClick={() => handleSelect(model)}
                      className={`flex w-full items-center px-4 py-2 text-left text-xs font-light transition-colors duration-200 hover:bg-white/10 sm:text-base lg:text-sm 2xl:text-base ${
                        value === model
                          ? "font-medium text-white"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {model}
                      {value === model && <Check size={15} className="ml-2 inline" />}
                    </button>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
