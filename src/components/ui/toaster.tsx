import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts, dismiss, pause, resume } = useToast();
  const [visibleToasts, setVisibleToasts] = useState<string[]>([]);

  // Handle incremental toast updates
  useEffect(() => {
    const newToastIds = toasts.map((t) => t.id);
    setVisibleToasts((prev) => {
      // Remove toasts that no longer exist
      const existing = prev.filter((id) => newToastIds.includes(id));
      // Add new toasts incrementally with a small delay
      const newIds = newToastIds.filter((id) => !prev.includes(id));

      if (newIds.length === 0) return existing;

      // Add first new toast immediately, queue others with delay
      const [firstNew, ...remainingNew] = newIds;
      remainingNew.forEach((id, index) => {
        setTimeout(() => {
          setVisibleToasts((current) => [...current, id]);
        }, (index + 1) * 100); // 100ms delay between toasts
      });

      return [...existing, firstNew];
    });
  }, [toasts]);

  return (
    <ToastProvider>
      {toasts
        .filter((toast) => visibleToasts.includes(toast.id))
        .map(
          ({
            id,
            title,
            description,
            action,
            dismissible = true,
            variant = "default",
            ...props
          }) => (
            <Toast
              key={id}
              variant={variant}
              onMouseEnter={() => pause(id)}
              onMouseLeave={() => resume(id)}
              {...props}
            >
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              {dismissible && <ToastClose onClick={() => dismiss(id)} />}
            </Toast>
          )
        )}
      <ToastViewport />
    </ToastProvider>
  );
}