import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/_layout.tsx", [
        index("routes/index.tsx"),
        route("admin", "routes/admin.tsx"),
        route("vote", "routes/vote.tsx"),
        route("proposals", "routes/proposals.tsx"),
        route("results", "routes/results.tsx"),
    ]),
] satisfies RouteConfig;
