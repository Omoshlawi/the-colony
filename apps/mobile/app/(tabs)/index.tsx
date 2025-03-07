import {
  Button,
  Dropdown,
  ExpoIconComponent,
  FilePicker,
  IconButton,
  InputSkeleton,
  ListTileSkeleton,
  showDialog,
  showModal,
  showModalBottomSheet,
  ThemedPageLayout,
} from "@colony/core-components";
import { useSession } from "@colony/core-global";
import { Box, Text } from "@colony/core-theme";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { LogBox, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
LogBox.ignoreAllLogs();

type User = {
  id: number;
  name: string;
  email: string;
  address: {
    id: number;
    chief: {
      name: {
        firstname: string;
        lastname: string;
      };
    };
  };
};

export default function HomeScreen() {
  const { currentOrganization } = useSession();
  const [search, setSearch] = useState("");
  const [item, setItem] = useState<any>();
  const [items, setItems] = useState<Array<any>>([]);
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
    <ThemedPageLayout>
      <ScrollView>
        <Box gap={"m"} p={"m"}>
          <Dropdown.Select<User>
            data={[
              {
                id: 1234,
                name: "omosh lawi",
                email: "omosh@gmail.com",
                address: {
                  id: 321,
                  chief: {
                    name: {
                      firstname: "Laurent",
                      lastname: "ouma",
                    },
                  },
                },
              },
            ]}
            searchAccessorKey="name"
            valueAccessorKey={"id"}
            labelAccessorKey="name"
            searchable
            onAsyncSearch={async (txt) => {
              console.log(txt);
            }}
            label="DropdownSelect"
            // helperText="Hello their"
            onSelectedItemChange={setItem}
            selectedItem={item}
            // testPath={""}
          />
          <Dropdown.MultiSelect<User>
            data={[
              {
                id: 1234,
                name: "omosh lawi",
                email: "omosh@gmail.com",
                address: {
                  id: 321,
                  chief: {
                    name: {
                      firstname: "Laurent",
                      lastname: "ouma",
                    },
                  },
                },
              },
            ]}
            // valueAccessorKey="value.lol.1.kaka"
            searchAccessorKey="name"
            valueAccessorKey={"id"}
            labelAccessorKey="name"
            searchable
            onAsyncSearch={async (txt) => {
              console.log(txt);
            }}
            label="DropdownMultiselect"
            // helperText="Hello their"
            onSelectedItemChange={setItems}
            selectedItem={items}
            // testPath={""}
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
    </ThemedPageLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
