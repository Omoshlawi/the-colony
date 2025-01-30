import {
  ExpoIconComponent,
  FilePicker,
  InputSkeleton,
  ListTileSkeleton,
  showDialog,
  showModal,
  showModalBottomSheet,
  Button,
  StyledPageLayout,
  InputDecoration,
} from "@colony/core-components";
import { IconButton } from "@colony/core-components";
import { useSession } from "@colony/core-global";
import { Box, Text } from "@colony/core-theme";
import { Redirect } from "expo-router";
import React from "react";
import { LogBox, StyleSheet, TextInput, TouchableOpacity } from "react-native";

LogBox.ignoreAllLogs();

export default function HomeScreen() {
  const { currentOrganization } = useSession();

  if (currentOrganization) return <Redirect href={"/(tabs)/dashboard"} />;

  const handleShowBottomsheet = (number: number) => {
    showModalBottomSheet(
      <React.Fragment>
        <Text>Bottomsheet - {number}</Text>
        <TouchableOpacity onPress={() => handleShowBottomsheet(number + 1)}>
          <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
            <Text>Bottomsheet</Text>
          </Box>
        </TouchableOpacity>
      </React.Fragment>,
      {}
    );
  };

  return (
    <StyledPageLayout>
      <Box gap={"m"} p={"m"}>
        <TextInput
          label="Hae"
          helperText="some helpers"
          prefixIcon={
            <ExpoIconComponent family="FontAwesome" name="star" size={10} />
          }
          suffixIcon={
            <ExpoIconComponent family="FontAwesome" name="star" size={10} />
          }
        />
        <Button
          title="primary"
          variant="primary"
          onPress={() => {}}
          renderIcon={({ size, color }) => (
            <ExpoIconComponent
              family="AntDesign"
              name="star"
              size={size}
              color={color}
            />
          )}
        />
        <Button title="tertiary" variant="tertiary" onPress={() => {}} />
        <Button title="secondary" variant="secondary" onPress={() => {}} />
        <Button title="ghost" variant="ghost" onPress={() => {}} />
        <IconButton
          onPress={() => {}}
          variant="filled"
          icon={{ family: "FontAwesome", name: "star" }}
          color="red"
        />
        <IconButton
          onPress={() => {}}
          variant="outline"
          icon={{ family: "FontAwesome", name: "star" }}
          color="red"
        />
        <IconButton
          onPress={() => {}}
          variant="tonal"
          icon={{ family: "FontAwesome", name: "star" }}
          color="red"
        />
        <InputSkeleton />
        <ListTileSkeleton />
        <TouchableOpacity onPress={() => showDialog(<Text>Dialog</Text>)}>
          <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
            <Text>Dialog</Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showModal(<Text>Modal</Text>)}>
          <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
            <Text>Modal</Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShowBottomsheet(1)}>
          <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
            <Text>Bottomsheet</Text>
          </Box>
        </TouchableOpacity>
        <FilePicker.ImageField
          successCallback={(assets) => alert(JSON.stringify(assets, null, 2))}
          multiple
          maxSelection={2}
          renderTrigger={(handleClick) => (
            <TouchableOpacity onPress={handleClick}>
              <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
                <Text>Pick image</Text>
              </Box>
            </TouchableOpacity>
          )}
        />
        <FilePicker.DocumentField
          successCallback={(assets) => alert(JSON.stringify(assets, null, 2))}
          renderTrigger={(handleClick) => (
            <TouchableOpacity onPress={handleClick}>
              <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
                <Text>Pick Document</Text>
              </Box>
            </TouchableOpacity>
          )}
        />
        <FilePicker.VideoField
          successCallback={(assets) => alert(JSON.stringify(assets, null, 2))}
          renderTrigger={(handleClick) => (
            <TouchableOpacity onPress={handleClick}>
              <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
                <Text>Pick Video</Text>
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>
    </StyledPageLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
