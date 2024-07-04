const staticDevCoffee = "er-sujan-gainju"
const assets = [
  "/",
  "/css",
  "/js",
  "/fonts",
  "/index.html",
  "/css/main.css",
  "/css/bootstrap.css",
  "/css",
  "/css/font-awesome.css",
  "/Documents/cv.pdf",
  "/js/main.js",
  "/images",
  "/images/main.png",
  "/images/portfolio/kritisha_construction.png",
  "/images/portfolio/ntc_ncell_smart_cell_helplines.png",
  "/images/portfolio/ipo_results_nepal.png",
  "/images/portfolio/kalimati_price_nepal.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

  self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })