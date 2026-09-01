import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";

let rehydrateStarted = false;

export function useStoreReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const persist = useAppStore.persist;
    if (!persist) {
      setReady(true);
      return;
    }
    const finish = () => setReady(true);
    const unsub = persist.onFinishHydration(finish);
    if (!rehydrateStarted) {
      rehydrateStarted = true;
      void persist.rehydrate();
    }
    if (persist.hasHydrated()) finish();
    return unsub;
  }, []);

  return ready;
}
