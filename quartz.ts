import {
  loadQuartzConfig,
  loadQuartzLayout,
} from "./quartz/plugins/loader/config-loader";
import * as ExternalPlugin from "./.quartz/plugins";

ExternalPlugin.Explorer({
  sortFn: (a, b) => {
    // 1. Keep folders before files
    if (a.isFolder && !b.isFolder) return -1;
    if (!a.isFolder && b.isFolder) return 1;

    // 2. Sort by custom 'noteorder' frontmatter property if available
    const orderA = a.data?.frontmatter?.noteorder;
    const orderB = b.data?.frontmatter?.noteorder;

    if (orderA !== undefined && orderB !== undefined) {
      return Number(orderA) - Number(orderB);
    }

    // 3. Fallback to alphabetical sorting
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  },
});

const config = await loadQuartzConfig();
export default config;
export const layout = await loadQuartzLayout();
