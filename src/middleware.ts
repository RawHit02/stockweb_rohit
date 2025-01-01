import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Define public and private routes
  const publicRoutes = ["/", "/login"];
  const privateRoutes = [
    "/dashboard",
    "/vender-management",
    "/employee",
    "/stock-management",
    "/admin-management",
  ];

  // Extract token from cookies
  const token = req.cookies.get("authToken")?.value;

  console.log("Pathname:", url.pathname);
  console.log("Token Present:", !!token);

  // Check if the request is for a private route
  const isPrivateRoute = privateRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // Check if the request is for a public route
  const isPublicRoute = publicRoutes.includes(url.pathname);

  // Redirect to login if accessing a private route without a token
  if (isPrivateRoute && !token) {
        console.log(
          "Redirecting to login because the route is private and no token."
        );

    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // If the user is logged in and tries to access public routes like login, redirect to dashboard
  if (publicRoutes.includes(url.pathname) && token) {
        console.log(
          "Redirecting to dashboard because the user is already authenticated."
        );

    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

    console.log("Allowing request to proceed.");
  // Allow the request to proceed for valid cases
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/:path*"], // Matches all routes
};




// Export an empty middleware function to satisfy Next.js requirements
// export function middleware(req: any) {
//   return NextResponse.next();
// }