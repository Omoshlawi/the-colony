import {
  ExpoIconComponent,
  ListTile,
  SectionCard,
} from "@colony/core-components";
import React from "react";
import { useAuthAPi } from "../hooks";

export const LogoutSection = () => {
  const { logoutUser } = useAuthAPi();
  return (
    <SectionCard>
      <ListTile
        leading={<ExpoIconComponent family="AntDesign" name="logout" />}
        title="logout"
        subtitle="End current session"
        onPress={logoutUser}
        trailing={
          <ExpoIconComponent
            family="MaterialCommunityIcons"
            name="chevron-right"
          />
        }
      />
    </SectionCard>
  );
};
