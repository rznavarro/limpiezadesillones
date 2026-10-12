declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...params,
      });
    }
  } catch (e) {
    // Silent fail-safe
  }
}

export function formatCLP(amount: number): string {
  return '$' + amount.toLocaleString('es-CL');
}
