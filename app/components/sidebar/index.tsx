import React, { useState } from 'react'
import type { FC } from 'react'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisSolidIcon } from '@heroicons/react/24/solid'
import Button from '@/app/components/base/button'
import type { ConversationItem } from '@/types/app'
import ConversationMenu from '../base/conversation-menu'
import Toast from '../base/toast'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const MAX_CONVERSATION_LENTH = 20

export interface ISidebarProps {
  copyRight: string
  currentId: string
  onCurrentIdChange: (id: string) => void
  onRename: (id: string, newName: string) => void
  onDelete: (id: string) => void
  list: ConversationItem[]
}

const Sidebar: FC<ISidebarProps> = ({
  copyRight,
  currentId,
  onCurrentIdChange,
  onRename,
  onDelete,
  list,
}) => {
  // const { t } = useTranslation()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')

  const handleRename = (id: string, name: string) => {
    setEditingId(id)
    setEditingName(name)
  }

  const submitRename = (id: string) => {
    if (editingName.trim()) {
      onRename(id, editingName.trim())
    }
    setEditingId(null)
    setEditingName('')
  }
  return (
    <div
      className="h-full shrink-0 flex flex-col overflow-y-auto  xl:w-[244px] lg:w-[192px] sm:w-[240px]  border-r border-gray-200"
    >
      {/* title */}
      <div className='flex items-center justify-between px-4 py-5 border-b border-gray-100'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-sm'>
            <span className='text-xl'>💻</span>
          </div>
          <h1 className='font-semibold text-gray-900'>对话历史</h1>
        </div>
      </div>

      {/* start new chat button */}
      {list.length < MAX_CONVERSATION_LENTH && (
        <div className="flex flex-shrink-0 p-4 !pb-0 ">
          <Button
            onClick={() => { onCurrentIdChange('-1') }}
            className="group block w-full flex-shrink-0 justify-center h-9 text-primary-600 items-center text-sm bg-white"
          >
            <PencilSquareIcon className="mr-3 h-4 w-4" /><span>开始新对话</span>
          </Button>
        </div>
      )}
      {/* chat session list */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className='space-y-3'>
          {list.map((item) => {
            const isCurrent = item.id === currentId
            const isEditing = editingId === item.id
            const ItemIcon
              = isCurrent ? ChatBubbleOvalLeftEllipsisSolidIcon : ChatBubbleOvalLeftEllipsisIcon
            return (
              <div
                // onClick={() => onCurrentIdChange(item.id)}
                onClick={() => !isEditing && onCurrentIdChange(item.id)}
                key={item.id}
                className={classNames(
                  isCurrent
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700',
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer',
                )}
              >
                {
                  isEditing
                    ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={e => setEditingName(e.target.value)}
                        onBlur={() => submitRename(item.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') { submitRename(item.id) }
                          if (e.key === 'Escape') { setEditingId(null) }
                        }}
                        onClick={e => e.stopPropagation()}
                        className="flex-1 bg-white border border-primary-500 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        autoFocus
                      />
                    )
                    : (
                      <>
                        <span className="flex-1 truncate">{item.name}</span>
                        <ConversationMenu
                          onRename={() => handleRename(item.id, item.name)}
                          onDelete={() => {
                            Toast.notify({
                              type: 'warning',
                              message: `正在删除会话"${item.name}"...`,
                              duration: 2000,
                            })
                            onDelete(item.id)
                          }}
                        />
                      </>
                    )
                }
                {/* <ItemIcon
                className={classNames(
                  isCurrent
                    ? 'text-primary-600'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 h-5 w-5 flex-shrink-0',
                )}
                aria-hidden="true"
              /> */}
              </div>
            )
          })}
        </div>
      </nav>
      {/* copyright and card */}
      {/* <a className="flex flex-shrink-0 p-4" href="https://langgenius.ai/" target="_blank">
        <Card><div className="flex flex-row items-center"><ChatBubbleOvalLeftEllipsisSolidIcon className="text-primary-600 h-6 w-6 mr-2" /><span>LangGenius</span></div></Card>
      </a> */}
      {/* <div className="flex flex-shrink-0 pr-4 pb-4 pl-4">
        <div className="text-gray-400 font-normal text-xs">© {copyRight} {(new Date()).getFullYear()}</div>
      </div> */}
    </div>
  )
}

export default React.memo(Sidebar)
