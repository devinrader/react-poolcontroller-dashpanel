
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { MessageTableHeader } from './MessageTableHeader';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons/faDotCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Direction, MessageChange } from './DirectionEnum';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react'; // AG Grid Component
import { ColDef, ValueFormatterParams, ICellRendererParams, RowSelectedEvent, SizeColumnsToFitGridStrategy } from 'ag-grid-community'
import { useLogMessagesDisplayStore } from './logMessageDisplay/useLogMessagesDisplayStore';
import { LogMessage } from '../types';

export const MessageTable = () => {

  const gridRef = useRef<AgGridReact<LogMessage>>(null);
  const [store, setStore] = useLogMessagesDisplayStore()

  const changedBodyTemplate = (params: ICellRendererParams<LogMessage>) =>
  (
    <div>
      {params.data && params.data.changed && params.data.changed !== MessageChange.none &&
        <FontAwesomeIcon className="icon" icon={faDotCircle} data-message-change={params.data.changed.toString()} />
      }
    </div>
  )

  const directionBodyTemplate = (params: ICellRendererParams<LogMessage>) =>
  (
    <div>
      <FontAwesomeIcon className="icon" icon={((params.data) && (params.data.direction === Direction.in)) ? faArrowCircleRight : faArrowCircleLeft} />
    </div>
  )

  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const colDefs: ColDef<LogMessage>[] = [
    { field: "id", headerName: "Id", resizable: false, width: 50 },
    { field: "direction", headerName: "Dir", resizable: false, cellRenderer: directionBodyTemplate, width: 30 },
    { field: "changed", headerName: "Chg", resizable: false, cellRenderer: changedBodyTemplate, width: 35 },
    { field: "protocol.name", headerName: "Proto", resizable: false, width: 70 },
    { field: "source.name", headerName: "Source", resizable: false, width: 70 },
    { field: "destination.name", headerName: "Dest", resizable: false, width: 70 },
    { field: "actionByte", headerName: "Action", resizable: false, width: 50 },
    {
      field: "payload", headerName: "Payload", valueFormatter: (params: ValueFormatterParams<LogMessage, number[]>) => {
        return `[${params.value}]`
      }, flex: 1
    }
  ];

  const autoSizeStrategy = useMemo(() => {
    return {
      type: 'fitCellContents',
    };
  }, []);

  const onRowSelected = (event: RowSelectedEvent<LogMessage>) => {
    if (event.node.isSelected()) {
      if (!store.selectedMessage || event.data?.id != store.selectedMessage.id) {
        setStore({ selectedMessage: event.data })
      }
    }
  };

  useEffect(() => {
    if (store.selectedMessage && gridRef && gridRef.current && gridRef.current.api) {
      const rowNode = gridRef.current.api.getRowNode(store.selectedMessage.id);
      if (rowNode) {
        rowNode.setSelected(true)
        gridRef.current.api.ensureNodeVisible(rowNode);
      }
    }
  }, [store.selectedMessage])

  const getRowId = useMemo(() => {
    return (params) => params.data.id;
  }, []);

  return (
    <div className="basis-2/3 flex-none flex flex-col h-full">
      <MessageTableHeader />
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact<LogMessage>
          style={gridStyle}
          rowData={store.changedOnly ? store.messages.filter((m) => { return m.changed != MessageChange.none }) : store.messages}
          columnDefs={colDefs}
          autoSizeStrategy={autoSizeStrategy}
          rowSelection={'single'}
          onRowSelected={onRowSelected}
          getRowId={getRowId}
          ref={gridRef}
        />
      </div>
    </div>
  )
}