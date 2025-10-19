import { Tabs } from "expo-router"
import { useTranslation } from "react-i18next"

import { Icon } from "@/shared/components/Icon"

export default function TabsLayout() {
  const { t } = useTranslation()

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: t("tabs:home"),
          tabBarIcon: ({ color }) => <Icon icon="view" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabs:settings"),
          tabBarIcon: ({ color }) => <Icon icon="settings" color={color} />,
        }}
      />
    </Tabs>
  )
}
