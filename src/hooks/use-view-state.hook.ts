import { useNavigationStore } from "../stores/navigation.store";
import { VIEW_STATE_LABELS } from "../utils/view-state-labels.util";

/** Return value of {@link useViewState}. */
export interface UseViewStateReturn {
  /** Whether the active view's header toggle is in "view-state-a". */
  isStateA: boolean;
  /** Whether the active view's header toggle is in "view-state-b". */
  isStateB: boolean;
  /** Label for the active view's "view-state-a" option. */
  labelA: string;
  /** Label for the active view's "view-state-b" option. */
  labelB: string;
  /** Selects "view-state-a" for the active view. */
  selectStateA: () => void;
  /** Selects "view-state-b" for the active view. */
  selectStateB: () => void;
}

/**
 * Determines which of the active console view's two header-toggle states
 * ("view-state-a"/"view-state-b") is currently selected, and exposes the
 * labels configured for that view in {@link VIEW_STATE_LABELS}.
 */
export function useViewState(): UseViewStateReturn {
  const activeView = useNavigationStore((state) => state.activeView);
  const viewState = useNavigationStore((state) => state.viewState);
  const setViewState = useNavigationStore((state) => state.setViewState);
  const { stateA, stateB } = VIEW_STATE_LABELS[activeView];

  return {
    isStateA: viewState === "view-state-a",
    isStateB: viewState === "view-state-b",
    labelA: stateA,
    labelB: stateB,
    selectStateA: () => setViewState("view-state-a"),
    selectStateB: () => setViewState("view-state-b"),
  };
}
