import { FC } from "react"

import { ListItem, ListItemProps } from "@/shared/components/ListItem"
import type { TxKeyPath } from "@/shared/i18n"

interface SettingsListItem {
  readonly labelTx: TxKeyPath
  readonly leftIcon?: ListItemProps["leftIcon"]
  readonly rightIcon?: ListItemProps["rightIcon"]
  readonly onPress: () => void
}

interface SettingsListProps {
  items: readonly SettingsListItem[]
}

export const SettingsList: FC<SettingsListProps> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <ListItem
          key={index}
          tx={item.labelTx}
          leftIcon={item.leftIcon}
          rightIcon={item.rightIcon}
          onPress={item.onPress}
        />
      ))}
    </>
  )
}
