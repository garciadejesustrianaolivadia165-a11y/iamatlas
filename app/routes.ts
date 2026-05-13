import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("signup", "routes/auth/signup.tsx"),

  layout("routes/dashboard/layout.tsx", [
    route("dashboard", "routes/dashboard/overview.tsx"),
    route("profile", "routes/dashboard/profile.tsx"),

    ...prefix("settings", [
      index("routes/dashboard/settings/edit-profile.tsx"),
      route("avatar", "routes/dashboard/settings/avatar.tsx"),
      route("security", "routes/dashboard/settings/security.tsx"),
    ]),

    ...prefix("calendar", [
      index("routes/dashboard/calendar/index.tsx"),
      route("week", "routes/dashboard/calendar/week.tsx"),
      route("month", "routes/dashboard/calendar/month.tsx"),
    ]),

    ...prefix("business-hub", [
      index("routes/dashboard/business-hub/index.tsx"),
      route("billing/:id", "routes/dashboard/business-hub/billing.tsx"),
    ]),

    ...prefix("clubs", [
      index("routes/dashboard/clubs/index.tsx"),
      route("add", "routes/dashboard/clubs/add.tsx"),
      route(":id", "routes/dashboard/clubs/detail.tsx"),
    ]),

    route("legal", "routes/legal.tsx"),
  ]),
] satisfies RouteConfig;