import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availabeSizes: Size[];
  onSizeSelected: (size: Size) => void;
}

export const SizeSelector = ({
  selectedSize,
  availabeSizes,
  onSizeSelected,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex">
        {availabeSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelected(size)}
            className={clsx("mx-2 hover:underline hover:text-sm text-lg", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
