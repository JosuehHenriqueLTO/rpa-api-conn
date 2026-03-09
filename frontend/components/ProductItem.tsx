"use client";

import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "./ui/button";
import { deleteProduct } from "@/actions/auth";

interface ProductItemProps {
  id: string;
  name: string;
  type: string;
}

const ProductItem = ({ id, name, type }: ProductItemProps) => {
  const handleDelete = async () => {
    const confirm = window.confirm(`Tem certeza que deseja excluir ${name}?`);
    if (confirm) {
      const result = await deleteProduct(id);
      if (result?.error) {
        alert(result.error);
      }
    }
  };

  return (
    <div>
      <Item>
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription>{type}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline">Edit</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
};

export default ProductItem;
