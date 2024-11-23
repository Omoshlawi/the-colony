import { useSession } from "@colony/core-global";
import { Href, Redirect } from "expo-router";
import React, { FC, PropsWithChildren } from "react";
import { RoutePaths } from "../utils";

interface SecureRouteProps extends PropsWithChildren {
  redirectTo?: Href;
}

const SecureRoute: FC<SecureRouteProps> = ({
  children,
  redirectTo = { pathname: RoutePaths.LOGIN_SCREEN },
}) => {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) return <Redirect href={redirectTo} />;

  return children;
};

export default SecureRoute;
