import { error } from '@sveltejs/kit';

export function load({ params }: any) {
  if (params.categoryId && params.subCategoryId) {
    return {
      categoryId: params.categoryId,
      subCategoryId: params.subCategoryId,
    };
  }

  throw error(404, 'Not found');
}
