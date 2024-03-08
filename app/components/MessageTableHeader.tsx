import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ConnectionManager } from "./ConnectionManager"
import { MouseEventHandler } from "react"
import { faPaperPlane, faUpload, faFilter, faBroom, faNotEqual, faThumbTack } from "@fortawesome/free-solid-svg-icons"
import { useLogMessagesDisplayStore } from "./logMessageDisplay/useLogMessagesDisplayStore"

export const MessageTableHeader = () => {

  const [store, setStore] = useLogMessagesDisplayStore()

  const onShowChangesOnly = () => { 
    setStore({ changedOnly: !store.changedOnly}); 
  }
  const onTogglePinned = () => { 
    setStore({ pinned: !store.pinned});
  }

  const onClear = () => {
    setStore({ messages: [] })
  }

  return (
    <div className="flex flex-row">
      <div>Messages</div>
      <div className="grow flex justify-items-end items-center justify-end gap-x-2">
        <FontAwesomeIcon className="cursor-pointer hover:text-orange-500" icon={faPaperPlane} /> {/* replay */}
        <FontAwesomeIcon className="cursor-pointer hover:text-orange-500" icon={faUpload} /> {/* upload */}
        <FontAwesomeIcon className="cursor-pointer hover:text-orange-500" icon={faFilter} /> {/* filter */}
        <FontAwesomeIcon className="cursor-pointer hover:text-orange-500" icon={faBroom} onClick={onClear} /> {/* clear */}
        <FontAwesomeIcon className={`cursor-pointer hover:text-orange-500 ${store.changedOnly ? 'text-pink-500' : ''}`} icon={faNotEqual} onClick={onShowChangesOnly} />
        <FontAwesomeIcon className={`cursor-pointer hover:text-orange-500 ${store.pinned ? 'text-pink-500' : ''}`} icon={faThumbTack} onClick={onTogglePinned} />
        <ConnectionManager />
      </div>
    </div>

  )
}