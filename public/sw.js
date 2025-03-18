self.addEventListener("install", (event) => {
  console.log("Service Worker установлен");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker активирован");
});

// self.addEventListener("push", (event) => {
//   const data = event.data ? event.data.text() : "Без данных";
//   event.waitUntil(
//     self.registration.showNotification("Push-уведомление", {
//       body: data,
//       icon: "/vite.svg",
//     })
//   );
// });

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    console.log("🔔 Получено сообщение, показываем уведомление...");
    self.registration.showNotification("Привет, macOS! 🖥️", {
      body: "Это тестовое уведомление 🎉",
      icon: "/vite.svg",
    });
  }
});
