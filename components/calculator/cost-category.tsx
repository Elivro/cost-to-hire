"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CostInput } from "./cost-input";
import { CostCategory as CostCategoryType } from "@/types/calculator";
import { cn } from "@/lib/utils";

interface CostCategoryProps {
  category: CostCategoryType;
  onItemChange: (categoryId: string, itemId: string, value: number) => void;
  defaultExpanded?: boolean;
}

export function CostCategory({
  category,
  onItemChange,
  defaultExpanded = false,
}: CostCategoryProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  const handleItemChange = (itemId: string, value: number) => {
    onItemChange(category.id, itemId, value);
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader
        className="cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{category.title}</CardTitle>
            <CardDescription className="mt-1">
              {category.description}
            </CardDescription>
          </div>
          <div className="ml-4">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent
        className={cn(
          "grid gap-4 transition-all",
          isExpanded ? "block" : "hidden"
        )}
      >
        {category.items.map((item) => (
          <CostInput
            key={item.id}
            item={item}
            onChange={handleItemChange}
          />
        ))}
      </CardContent>
    </Card>
  );
}
