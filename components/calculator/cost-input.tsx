"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { CostItem } from "@/types/calculator";

interface CostInputProps {
  item: CostItem;
  onChange: (id: string, value: number) => void;
}

export function CostInput({ item, onChange }: CostInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    onChange(item.id, value ? parseInt(value, 10) : 0);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={item.id} className="text-sm">
          {item.label}
        </Label>
        {item.tooltip && (
          <Tooltip content={item.tooltip}>
            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
          </Tooltip>
        )}
      </div>
      <div className="relative">
        <Input
          id={item.id}
          type="text"
          inputMode="numeric"
          value={item.value || ""}
          onChange={handleChange}
          placeholder="0"
          className="pr-16"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          kr/år
        </span>
      </div>
    </div>
  );
}
