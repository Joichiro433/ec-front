import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ locals }) => {
  console.log(locals);
  return locals;
};
