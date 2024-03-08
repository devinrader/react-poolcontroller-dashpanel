import { useSystem } from "./systemstate/useSystemState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSnowflake } from '@fortawesome/free-solid-svg-icons'

export const MessagesHeader = () => {

  const [systemState] = useSystem()

  return (
    <div className="mb-2">
      <div className="flex flex-row gap-x-1">
        <div><FontAwesomeIcon icon={faBars} /></div>
        <div>{systemState.model}</div>
        <div className="grow items-center flex justify-center">{new Date(systemState.time).toLocaleString()}</div>
        <div className="flex flex-row gap-x-1 items-center">
          <span>{systemState.status.desc}</span>
          <div className="indicator" data-status={systemState.status.name}></div>
        </div>
        <hr />
      </div>
      <hr />
      {systemState.freeze &&
        <div className="text-center">
          <FontAwesomeIcon icon={faSnowflake} />
          <span>Freeze Protection</span>
          <FontAwesomeIcon icon={faSnowflake} />
        </div>
      }
    </div>
  )
}
