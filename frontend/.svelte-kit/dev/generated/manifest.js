const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/admin/__layout.svelte"),
	() => import("../../../src/routes/admin/index.svelte"),
	() => import("../../../src/routes/admin/products/index.svelte"),
	() => import("../../../src/routes/admin/users/index.svelte"),
	() => import("../../../src/routes/user/index.svelte"),
	() => import("../../../src/routes/user/register.svelte"),
	() => import("../../../src/routes/user/login.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/admin/index.svelte
	[/^\/admin\/?$/, [c[0], c[3], c[4]], [c[1]]],

	// src/routes/admin/products/index.svelte
	[/^\/admin\/products\/?$/, [c[0], c[3], c[5]], [c[1]]],

	// src/routes/admin/users/index.svelte
	[/^\/admin\/users\/?$/, [c[0], c[3], c[6]], [c[1]]],

	// src/routes/user/index.svelte
	[/^\/user\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/user/register.svelte
	[/^\/user\/register\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/user/login.svelte
	[/^\/user\/login\/?$/, [c[0], c[9]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];