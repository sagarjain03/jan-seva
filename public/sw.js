const CACHE_NAME = "janseva-v1"
const urlsToCache = ["/", "/manifest.json", "/icon-192x192.png", "/icon-512x512.png"]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }),
  )
})

self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

function doBackgroundSync() {
  const offlineData = localStorage.getItem("janseva-offline-submissions")
  if (offlineData) {
    const submissions = JSON.parse(offlineData)
    return Promise.all(
      submissions.map((submission) =>
        fetch("/api/submit-application", {
          method: "POST",
          body: JSON.stringify(submission),
        }),
      ),
    ).then(() => {
      localStorage.removeItem("janseva-offline-submissions")
    })
  }
}
