import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React from "react";

interface Props {
  filters: {};
  resetFilters: () => void;
}

const ClearFiltersButton = ({ filters, resetFilters }: Props) => {
  const allFiltersNotEmpty = Object.values(filters).every(
    (value) => value !== ""
  );
  if (allFiltersNotEmpty)
    return (
      <Button variant="soft" color="crimson" onClick={resetFilters}>
        <Cross2Icon />
        Clear Filters
      </Button>
    );
  else {
    return null;
  }
};

export default ClearFiltersButton;
