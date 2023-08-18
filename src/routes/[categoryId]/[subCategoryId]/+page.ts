import { error } from '@sveltejs/kit';

export function load({ params }: any) {
  if (params.categoryId) {
    return {
      categoryId: params.categoryId
    };
  }

  throw error(404, 'Not found');
}
