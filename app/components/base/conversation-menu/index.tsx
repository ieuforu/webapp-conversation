import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Props {
  onRename: () => void
  onDelete: () => void
}

export default function ConversationMenu({ onRename, onDelete }: Props) {
  return (
    <Menu>
      <MenuButton
        className="p-1.5 rounded-md hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={e => e.stopPropagation()}
      >
        <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="w-40 mt-1 rounded-lg bg-white shadow-lg ring-1 ring-black/5 p-1 z-50"
      >
        <MenuItem>
          <button
            onClick={(e) => { e.stopPropagation(); onRename() }}
            className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <PencilIcon className="mr-2 h-4 w-4" />
            重命名
          </button>
        </MenuItem>

        <MenuItem>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete() }}
            className="flex w-full items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            删除
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
