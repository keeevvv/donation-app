import { getToken, onMessage } from "firebase/messaging"
import { getFirebaseMessaging } from "@/lib/firebase"

export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission()
  if (permission !== "granted") return null

  const messaging = await getFirebaseMessaging()
  if (!messaging) return null

  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  })

  console.log("FCM Token:", token)
  return token
}
