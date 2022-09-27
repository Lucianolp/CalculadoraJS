const Static_Cache = "static";
const App_Shell = [
    "/",
    // "index.html",
    // "style.css",
    // "main.js",
    "images/js.png"
];

self.addEventListener("install", e =>{
    const cacheStatic = caches.open(Static_Cache).then(cache => cache.addAll(App_Shell));
    e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) =>{
    e.respondWith(
        fetch(e.request)
    )
})