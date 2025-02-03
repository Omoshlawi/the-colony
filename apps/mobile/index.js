import { MicroAppRoot } from "@colony/core-navigation";
import { registerRootComponent } from "expo";

const contexts = [
  {
    context: require.context("./app", true, /.*/),
    prefix: ".",
  },
  {
    context: require.context("../payments/app/(payments)", true, /.*/),
    prefix: "(payments)",
  },
  {
    context: require.context("../support/app/(support)", true, /.*/),
    prefix: "(support)",
  },
  {
    context: require.context("../authentication/app/(authentication)", true, /.*/),
    prefix: "(authentication)",
  },
  {
    context: require.context("../settings/app/(settings)", true, /.*/),
    prefix: "(settings)",
  },
  {
    context: require.context("../dashboard/app/(dashboard)", true, /.*/),
    prefix: "(dashboard)",
  },
  {
    context: require.context("../properties/app/(properties)", true, /.*/),
    prefix: "(properties)",
  },
];

// Must be exported or Fast Refresh won't update the context
export function App() {
  return <MicroAppRoot contexts={contexts} />;
}

registerRootComponent(App);
