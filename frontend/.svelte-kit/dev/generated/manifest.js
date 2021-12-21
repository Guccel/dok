const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/products/index.svelte"),
	() => import("../../../src/routes/products/[slugs].svelte"),
	() => import("../../../src/routes/about.svelte"),
	() => import("../../../src/routes/login/index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/products/index.svelte
	[/^\/products\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/products/[slugs].svelte
	[/^\/products\/([^/]+?)\/?$/, [c[0], c[4]], [c[1]], (m) => ({ slugs: d(m[1])})],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/login/index.svelte
	[/^\/login\/?$/, [c[0], c[6]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];