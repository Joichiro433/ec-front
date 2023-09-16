import { redirect } from '@sveltejs/kit';
import Api from '$lib/api/index.js';

interface FormData {
  get: (key: 'email' | 'password') => FormDataEntryValue | null;
}

export const actions = {
  default: async ({ cookies, request }) => {
    const formData: FormData = await request.formData();
    const email: string = formData.get('email') as string;
    const password: string = formData.get('password') as string;

    const data = new URLSearchParams();
    data.append('username', email);
    data.append('password', password);

    const resp = await Api.post('/login', data, { contentType: 'application/x-www-form-urlencoded' });
    cookies.set('access_token', resp.access_token, { path: '/', httpOnly: true, sameSite: 'none', secure: true });

    throw redirect(302, '/');
  },
};
