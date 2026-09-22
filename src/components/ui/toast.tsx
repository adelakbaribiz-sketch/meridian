"use client";

import * as React from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

type ToastTone = "success" | "error" | "info";
interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastContextValue {
  push: (t: Omit<ToastItem, "id">) => void;
}
const ToastContext = React.createContext<ToastContextValue | null>(null);

const toneIcon: Record<ToastTone, React.ReactNode> = {
  success: <CheckCircle2 className="h-4 w-4 text-success" />,
  error: <AlertTriangle className="h-4 w-4 text-danger" />,
  info: <Info className="h-4 w-4 text-info" />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(0);

  const push = React.useCallback((t: Omit<ToastItem, "id">) => {
    const id = ++idRef.current;
    setItems((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
        {items.map((item) => (
          <div
            key={item.id}
            className="animate-fade-in flex items-start gap-2.5 rounded-lg border border-border bg-surface p-3.5 shadow-lg"
          >
            <div className="mt-0.5">{toneIcon[item.tone]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-tight">{item.title}</p>
              {item.description && <p className="text-xs text-muted mt-0.5">{item.description}</p>}
            </div>
            <button
              onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
              className="text-muted hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
