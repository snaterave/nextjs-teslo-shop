"use client";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantitySelected: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantitySelected }: Props) => {
  // const [count, setCount] = useState(quantity);
  const onQuantityChanged = (value: number) => {
    if (quantity + value < 1) return;
    onQuantitySelected(quantity + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
      </span>
      <button onClick={() => onQuantityChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
