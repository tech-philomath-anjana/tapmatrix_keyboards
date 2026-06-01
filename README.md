**TapMatrix**

An interactive storefront for mechanical keyboards, built with Next.js, 3D product visualization, and a headless CMS.

**What is TapMatrix?**

TapMatrix is a product showcase and e-commerce site for mechanical keyboards and components. The goal was to build something that actually does justice to the tactile, visual nature of the hobby — so instead of flat product images, customers can rotate and inspect keyboards in 3D before they buy.
The project covers the full stack: a content-managed product catalogue, interactive 3D scenes, animated page transitions, and a complete Stripe checkout flow.

**Features**

3D product viewer — keyboards rendered with React Three Fiber / three.js, interactive in-browser
Headless CMS — product listings and page content managed via Prismic Slice Machine; no code change needed to add or update products
Smooth page transitions — GSAP-powered animations between routes for a polished feel
Stripe checkout — full payment integration with server-side session creation
Type-safe end-to-end — Prisma-generated types flow from the database all the way to the UI via Next.js server functions; no manual type maintenance
Accessible UI primitives — Radix UI for dropdowns, dialogs, and interactive components

**Tech Stack**

Framework — Next.js 15 (App Router)
Language — TypeScript
Styling — Tailwind CSS · PostCSS
3D — React Three Fiber · three.js · Leva (dev controls)
Animation — GSAP
CMS — Prismic (Slice Machine)
UI Primitives — Radix UI
Payments — Stripe
Linting — ESLint · Prettier

**Under the hood**

App Router + Server Components — data fetching happens server-side wherever possible. Prismic queries and product lookups run in server components; only interactive 3D and animation layers are client components.
Slice Machine — page sections are modelled as Prismic slices. Adding a new content block means defining a slice type and dropping it into the CMS — no new routes, no new components needed.
Type safety — Next.js server functions handle mutations (cart updates, checkout session creation) with inferred TypeScript types, so the boundary between server and client is fully typed without a separate API schema.
3D scenes — product models are loaded lazily and rendered inside a <Canvas> with React Three Fiber. Leva controls are stripped in production builds.
