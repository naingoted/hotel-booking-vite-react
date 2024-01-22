import { http, HttpResponse, Request } from "msw";

//https://rbwcjzwdjrimcvgbribk.supabase.co/auth/v1/token?grant_type=password
export const handlers = [
  http.post(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token`, async () => {
    return HttpResponse.json(
      {
        error: "invalid_grant",
        error_description: "Invalid login credentials",
      },
      { status: 400 }
    );
  }),
];
