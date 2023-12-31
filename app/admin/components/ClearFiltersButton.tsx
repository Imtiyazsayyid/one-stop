import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React from "react";

interface Props {
  filters: any;
  resetFilters: () => void;
}

const ClearFiltersButton = ({ filters, resetFilters }: Props) => {
  let filterExists = false;

  for (const key in filters) {
    if (Array.isArray(filters[key])) {
      if (filters[key].length !== 0) {
        filterExists = true;
      }
    } else {
      if (filters[key] !== "" || filters[key]) {
        filterExists = true;
      }
    }
  }

  if (filterExists) {
    return (
      <Button variant="soft" color="crimson" onClick={resetFilters}>
        <Cross2Icon />
        Clear Filters
      </Button>
    );
  } else {
    return null;
  }
};

export default ClearFiltersButton;
