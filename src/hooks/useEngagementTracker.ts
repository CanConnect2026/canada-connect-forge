import { useCallback, useEffect, useState } from "react";

type EngagementType = "service" | "food";

interface EngagementState {
  serviceViews: number;
  foodViews: number;
  intentDismissed: boolean;
  selectedIntent: "newcomer" | "explorer" | null;
  servicePromptDismissed: boolean;
  foodPromptDismissed: boolean;
}

const STORAGE_KEY = "canconnect_engagement";

function getState(): EngagementState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    serviceViews: 0,
    foodViews: 0,
    intentDismissed: false,
    selectedIntent: null,
    servicePromptDismissed: false,
    foodPromptDismissed: false,
  };
}

function saveState(state: EngagementState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function useEngagementTracker() {
  const [state, setState] = useState<EngagementState>(getState);

  const trackView = useCallback((type: EngagementType) => {
    setState((prev) => {
      const next = {
        ...prev,
        serviceViews: type === "service" ? prev.serviceViews + 1 : prev.serviceViews,
        foodViews: type === "food" ? prev.foodViews + 1 : prev.foodViews,
      };
      saveState(next);
      return next;
    });
  }, []);

  const setIntent = useCallback((intent: "newcomer" | "explorer") => {
    setState((prev) => {
      const next = { ...prev, selectedIntent: intent };
      saveState(next);
      return next;
    });
  }, []);

  const dismissIntent = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, intentDismissed: true };
      saveState(next);
      return next;
    });
  }, []);

  const dismissPrompt = useCallback((type: EngagementType) => {
    setState((prev) => {
      const next = {
        ...prev,
        ...(type === "service" ? { servicePromptDismissed: true } : { foodPromptDismissed: true }),
      };
      saveState(next);
      return next;
    });
  }, []);

  const shouldShowFoodPrompt = state.serviceViews >= 2 && !state.foodPromptDismissed;
  const shouldShowServicePrompt = state.foodViews >= 2 && !state.servicePromptDismissed;
  const shouldShowIntentPrompt = !state.intentDismissed && !state.selectedIntent;

  return {
    ...state,
    trackView,
    setIntent,
    dismissIntent,
    dismissPrompt,
    shouldShowFoodPrompt,
    shouldShowServicePrompt,
    shouldShowIntentPrompt,
  };
}
