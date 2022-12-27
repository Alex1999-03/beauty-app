import { useState, useCallback } from "react";

export function useToggle() {
    const [state, setState] = useState(false);

    const toggle = useCallback(() => setState(state => !state), [])

    return [state, toggle]
}