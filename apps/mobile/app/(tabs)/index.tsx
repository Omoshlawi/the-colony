import {
  Button,
  DropDown,
  ExpoIconComponent,
  FilePicker,
  IconButton,
  InputSkeleton,
  ListTileSkeleton,
  SelectionInput,
  showDialog,
  showModal,
  showModalBottomSheet,
  StyledPageLayout,
  TextInput,
} from "@colony/core-components";
import { useSession } from "@colony/core-global";
import { Box, Text } from "@colony/core-theme";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { LogBox, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
LogBox.ignoreAllLogs();

export default function HomeScreen() {
  const { currentOrganization } = useSession();
  const [search, setSearch] = useState("");
  const [item, setItem] = useState<any>();
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
      <ScrollView>
        <Box gap={"m"} p={"m"}>
          <SelectionInput
            data={Array.from({ length: 20 }).map((_, index) => `${index}`)}
            searchText={search}
            onSearchTextChange={setSearch}
            multiple
            item={item}
            onItemChange={(items) => setItem(Array.from(items))}
            // onValueChange={setItem}
            mode="search"
            valueExtractor={(v) => v}
          />
          <TextInput
            prefixIcon={<ExpoIconComponent family="AntDesign" name="Safety" />}
          />
          <DropDown
            data={[
              {
                label: { l: "Hi" },
                value: { key: "HI", lol: { "1": { kaka: 12 } } },
              },
              {
                label: { l: "their" },
                value: { key: "their", lol: { "1": { kaka: 13 } } },
              },
            ]}
            labelAccessorKey="label.l"
            valueAccessorKey="value.lol.1.kaka"
            searchAccessorKey="label.l"
            label="Label"
            helperText="Hello their"
            searchable
            onSelectedItemChange={setItem}
            selectedItem={item}
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
      </ScrollView>
    </StyledPageLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
