import { error } from '@sveltejs/kit';

export function load({ params }: any) {
  if (params.productId) {
    return {
      productId: params.productId
    };
  }

  throw error(404, 'Not found');
}
