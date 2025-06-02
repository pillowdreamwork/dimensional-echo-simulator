import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "./button"

export function ToastDemo() {
  const { toast } = useToast({
    maxToasts: 5,
    defaultDuration: 5000,
    pauseOnHover: true
  })

  // Example usage (could be triggered by events or effects)
  useEffect(() => {
    const showExampleToasts = () => {
      // Simple toast
      const toast1Id = toast({
        title: "Success",
        description: "Operation completed",
        variant: "default"
      })

      // Persistent toast with custom action
      setTimeout(() => {
        const toast2Id = toast({
          title: "Processing",
          description: "Long running operation...",
          persist: true,
          action: (
            <Button variant="outline" size="sm" onClick={() => {
              console.log("Cancelling operation...")
            }}>
              Cancel
            </Button>
          )
        })
      }, 1000)

      // Custom duration toast
      setTimeout(() => {
        const toast3Id = toast({
          title: "Quick Message",
          duration: 2000,
          dismissible: false
        })
      }, 2000)

      // Toast with dismiss callback
      setTimeout(() => {
        const toast4Id = toast({
          title: "Action Required",
          description: "Please take action",
          onDismiss: () => console.log("Toast was dismissed")
        })
      }, 3000)
    }

    // Start the demo sequence
    showExampleToasts()
  }, [toast])

  return null
}
