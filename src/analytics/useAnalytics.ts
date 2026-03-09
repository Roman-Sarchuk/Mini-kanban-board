import { usePostHog } from "@posthog/react"
import type { EventName } from "./events"

export function useAnalytics() {
  const posthog = usePostHog()

  const track = (event: EventName, props?: Record<string, unknown>) => {
    posthog?.capture(event, props)
    console.log('Tracking event', event, props, posthog);
  }

  return { track }
}