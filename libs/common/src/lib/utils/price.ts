import { Price, PriceRange } from "@carolineaugier/api-types";

export function getPrice(price: Price) {
  return `${price.amount} ${price.currencyCode}`;
}

export function getPriceRange(priceRange: PriceRange) {
  if (priceRange.minVariantPrice.amount === priceRange.maxVariantPrice.amount) {
    return getPrice(priceRange.minVariantPrice);
  }

  return `${getPrice(priceRange.minVariantPrice)} - ${getPrice(priceRange.maxVariantPrice)}`;
}
