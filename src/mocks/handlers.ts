import { http, HttpResponse } from "msw";

// actual url https://rbwcjzwdjrimcvgbribk.supabase.co/auth/v1/token?grant_type=password\

export const handlers = [
  http.post("https://test.supabase.co/auth/v1/token", async () => {
    console.log("MSW handler triggered");
    return HttpResponse.json(
      {
        error: "invalid_grant",
        error_description: "Invalid login credentials",
      },
      { status: 400 }
    );
  }),
];
