import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { print } from "graphql";

import { Cart, Operations } from "@carolineaugier/api-types";
import { queryKeyFactory } from "@carolineaugier/api-util";

import { AddCartLinesDocument, CreateCartDocument } from "../api";
import { client } from "../client";

const cartQueryKey = queryKeyFactory("CART");

type CartLineVariables = {
  merchandiseId: string;
  quantity: number;
};

function getCartMutationErrorMessage(userErrors: Array<{ message: string }>) {
  return userErrors.map(({ message }) => message).join(", ");
}

export function useCreateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      lines,
    }: {
      lines: CartLineVariables[];
    }): Promise<Cart> => {
      const { data } = await client.request<Operations.CreateCartMutation>(
        print(CreateCartDocument),
        {
          variables: { lines },
        },
      );

      const payload = data?.cartCreate;

      if (payload?.userErrors.length) {
        throw new Error(getCartMutationErrorMessage(payload.userErrors));
      }

      if (!payload?.cart) {
        throw new Error("Fail to create cart");
      }

      return payload.cart;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: cartQueryKey.all,
      });
    },
  });
}

export function useAddCartLines() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cartId,
      lines,
    }: {
      cartId: string;
      lines: CartLineVariables[];
    }): Promise<Cart> => {
      const { data } = await client.request<Operations.AddCartLinesMutation>(
        print(AddCartLinesDocument),
        {
          variables: {
            cartId,
            lines,
          },
        },
      );

      const payload = data?.cartLinesAdd;

      if (payload?.userErrors.length) {
        throw new Error(getCartMutationErrorMessage(payload.userErrors));
      }

      if (!payload?.cart) {
        throw new Error("Fail to update cart");
      }

      return payload.cart;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: cartQueryKey.all,
      });
    },
  });
}
