import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const check = () => {
  //     if (!("serviceWorker" in navigator)) {
  //       // throw new Error("No Service Worker support!");
  //       console.error("No Service Worker support!");
  //     }
  //     if (!("PushManager" in window)) {
  //       // throw new Error("No Push API Support!");
  //       console.error("No Push API Support!");
  //     }
  //   };

  //   const registerServiceWorker = async () => {
  //     const swRegistration = await navigator.serviceWorker.register(
  //       "service.js"
  //     );
  //     return swRegistration;
  //   };

  //   const requestNotificationPermission = async () => {
  //     const permission = await window.Notification.requestPermission();
  //     // value of permission can be 'granted', 'default', 'denied'
  //     // granted: user has accepted the request
  //     // default: user has dismissed the notification permission popup by clicking on x
  //     // denied: user has denied the request.
  //     if (permission !== "granted") {
  //       // throw new Error("Permission not granted for Notification");
  //       console.error("Permission not granted for Notification");
  //     }

  //     return permission;
  //   };

  //   const showLocalNotification = (title, body, swRegistration) => {
  //     const options = {
  //       body,
  //       // here you can add more properties like icon, image, vibrate, etc.
  //     };
  //     // swRegistration.showNotification(title, options);
  //     // new Notification("jello");

  //     navigator.serviceWorker.getRegistration().then(reg => {
  //       if (reg) {
  //         reg.showNotification("Привет!", { body: "Тест уведомлений" });
  //       }
  //     });
  //     console.log("jello");
  //   };

  //   const main = async () => {
  //     //notice I changed main to async function so that I can use await for registerServiceWorker
  //     check();
  //     const swRegistration = await registerServiceWorker();
  //     const permission = await requestNotificationPermission();

  //     console.log(swRegistration);
  //     console.log(permission);

  //     // if (permission !== "granted") return;

  //     showLocalNotification(
  //       "This is title",
  //       "this is the message",
  //       swRegistration
  //     );
  //   };
  //   main();

  //   // This will output: granted, default or denied
  // }, []);

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("✅ Service Worker зарегистрирован:", registration);
          return registration;
        } catch (error) {
          console.error("❌ Ошибка регистрации Service Worker:", error);
        }
      }
    };

    const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.error("⛔ Разрешение на уведомления не получено");
      }
      return permission;
    };

    const sendNotification = async () => {
      const permission = await requestNotificationPermission();
      if (permission !== "granted") return;

      const registration = await registerServiceWorker();
      if (!registration) return;

      if (navigator.serviceWorker.controller) {
        console.log("📩 Отправляем сообщение в Service Worker...");
        navigator.serviceWorker.controller.postMessage({
          type: "SHOW_NOTIFICATION",
        });
      } else {
        console.error("⚠️ Service Worker не контролирует страницу.");
      }
    };

    sendNotification();
  }, []);

  return (
    <div>
      <h1>Push Notifications Test</h1>
      <button onClick={() => new Notification("Тест!", { body: "Работает?" })}>
        🔔 Тест уведомления
      </button>
    </div>
  );
}

export default App;
