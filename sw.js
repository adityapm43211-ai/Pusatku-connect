const CACHE="pusatku-cache-v3";

const ASSETS=[
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icon.svg"
];

self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(
        keys
          .filter(k=>k!==CACHE)
          .map(k=>caches.delete(k))
      ))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;

  e.respondWith(
    fetch(e.request)
      .then(response=>{
        const copy=response.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
        return response;
      })
      .catch(()=>caches.match(e.request))
  );
});

self.addEventListener("notificationclick",e=>{
  e.notification.close();
  e.waitUntil(
    clients.matchAll({
      type:"window",
      includeUncontrolled:true
    }).then(cs=>
      cs.length
        ? cs[0].focus()
        : clients.openWindow("./")
    )
  );
});

self.addEventListener("push",e=>{
  let d={
    title:"PusatKu",
    body:"Ada pengingat baru"
  };

  try{
    d={...d,...e.data.json()};
  }catch{}

  e.waitUntil(
    self.registration.showNotification(
      d.title,
      {
        body:d.body,
        icon:"icon.svg",
        badge:"icon.svg"
      }
    )
  );
});
