import { Tabs } from "expo-router"

import { Icon } from "@/shared/components/Icon"

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Icon icon="view" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Icon icon="settings" color={color} />,
        }}
      />
    </Tabs>
  )
}
