import { usePostHog } from "@posthog/react"
import type { EventName } from "./events"

export function useAnalytics() {
  const posthog = usePostHog()

  const track = (event: EventName, props?: Record<string, unknown>) => {
    posthog?.capture(event, props)
  }

  return { track }
}