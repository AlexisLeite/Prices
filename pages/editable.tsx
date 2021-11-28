import { Button, Modal, useDisclosure } from '@chakra-ui/react';
import * as React from 'react';
import { useMergedState } from './../src/mergedStatus';

{
  /* Label
        
        <div
        style={{
        }}
      >
        {props.label}
      </div>; */
}

interface IEditableProps {}

interface WorkspaceProps {
  pannels: ResizablePannelConf[];
  children: any;
}

function Workspace(props: WorkspaceProps) {
  const [{ width, height }, setDimmensions] = React.useState({ width: 0, height: 0 });
  const [positionStyles, setSize] = useMergedState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const [pannels, setPannels] = React.useState(props.pannels);
  React.useEffect(() => {
    const handleWindowResize = () => {
      const width = window.innerWidth,
        height = window.innerHeight;

      const top = pannels.reduce((prev, current) => {
        prev += current.position === 'top' ? (current.size * height) / 100 : 0;
        return prev;
      }, 0);

      const bottom = pannels.reduce((prev, current) => {
        prev += current.position === 'bottom' ? (current.size * height) / 100 : 0;
        return prev;
      }, 0);

      const left = pannels.reduce((prev, current) => {
        prev += current.position === 'left' ? (current.size * width) / 100 : 0;
        return prev;
      }, 0);

      const right = pannels.reduce((prev, current) => {
        prev += current.position === 'right' ? (current.size * width) / 100 : 0;
        return prev;
      }, 0);

      setDimmensions({ width, height });
      setSize({ top, left, right, bottom });
    };
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    return () => void window.removeEventListener('resize', handleWindowResize);
  }, [pannels]);

  return (
    <div id="Workspace" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      {pannels.map((pannel) => (
        <ResizablePannel
          offset={0}
          key={pannel.id}
          onClose={pannel.onClose}
          onResize={(newSize) => {
            setPannels(
              pannels.map((searchPannel) => {
                if (searchPannel.id === pannel.id) {
                  searchPannel.size =
                    (newSize * 100) /
                    (['top', 'bottom'].includes(pannel.position) ? height : width);
                }
                return searchPannel;
              })
            );
          }}
          position={pannel.position}
          size={
            (pannel.size * (['top', 'bottom'].includes(pannel.position) ? height : width)) / 100
          }
        >
          {pannel.children}
        </ResizablePannel>
      ))}
      <div id="Canvas" style={{ ...positionStyles, position: 'absolute', overflow: 'auto' }}>
        {props.children}
      </div>
    </div>
  );
}

type PannelPosition = 'top' | 'bottom' | 'right' | 'left';

interface ResizablePannelConf {
  children: React.ReactElement[];
  id: string;
  onClose: () => void;
  position: PannelPosition;
  size: number;
}

interface ResizablePannelProps {
  children: React.ReactElement[];
  onClose: () => void;
  onResize: (newSize: number) => void;
  position: PannelPosition;
  size: number;
  offset: number;
}

type ResizablePannel = (props: ResizablePannelProps) => React.ReactElement;

const ResizablePannel: ResizablePannel = (props: ResizablePannelProps) => {
  const borderSize = '6px';
  const [{ resizing, initialSize, initialPosition }, setResizing] = useMergedState({
    resizing: false,
    initialSize: 0,
    initialPosition: [0, 0],
  });
  let pannelStyles: React.CSSProperties = {},
    borderStyles: React.CSSProperties = {},
    contentStyles: React.CSSProperties = {};

  React.useEffect(() => {
    const handleMouseUp = () => {
      setResizing({ resizing: false });
    };
    const handleMouseMove = (ev: MouseEvent) => {
      if (resizing) {
        let newSize = 0;
        switch (props.position) {
          case 'top':
            break;
          case 'bottom':
            break;
          case 'right':
            newSize =
              (['top', 'bottom'].includes(props.position)
                ? -ev.clientY + initialPosition[1]
                : -ev.clientX + initialPosition[0]) + initialSize;
            break;
          case 'left':
            newSize =
              (['top', 'bottom'].includes(props.position)
                ? ev.clientY - initialPosition[1]
                : ev.clientX - initialPosition[0]) + initialSize;
            break;
        }
        props.onResize(newSize);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () =>
      void window.removeEventListener('mousemove', handleMouseMove) ||
      void window.removeEventListener('mouseup', handleMouseUp);
  }, [resizing]);

  // Set position styles
  switch (props.position) {
    case 'top':
      borderStyles.cursor = 'ns-resize';
      borderStyles.height = borderSize;
      borderStyles.bottom = 0;
      borderStyles.left = 0;
      borderStyles.right = 0;

      contentStyles.bottom = borderSize;

      pannelStyles.height = props.size + 'px';
      pannelStyles.top = props.offset;
      pannelStyles.left = 0;
      pannelStyles.right = 0;
      break;
    case 'bottom':
      borderStyles.cursor = 'ns-resize';
      borderStyles.height = borderSize;
      borderStyles.top = 0;
      borderStyles.left = 0;
      borderStyles.right = 0;

      contentStyles.top = borderSize;

      pannelStyles.height = props.size + 'px';
      pannelStyles.bottom = props.offset;
      pannelStyles.left = 0;
      pannelStyles.right = 0;
      break;
    case 'right':
      borderStyles.cursor = 'ew-resize';
      borderStyles.width = borderSize;
      borderStyles.left = 0;
      borderStyles.top = 0;
      borderStyles.bottom = 0;

      contentStyles.left = borderSize;

      pannelStyles.width = props.size + 'px';
      pannelStyles.right = props.offset;
      pannelStyles.top = 0;
      pannelStyles.bottom = 0;
      break;
    case 'left':
      borderStyles.cursor = 'ew-resize';
      borderStyles.width = borderSize;
      borderStyles.right = 0;
      borderStyles.top = 0;
      borderStyles.bottom = 0;

      contentStyles.right = borderSize;

      pannelStyles.width = props.size + 'px';
      pannelStyles.left = props.offset;
      pannelStyles.top = 0;
      pannelStyles.bottom = 0;
      break;
  }

  pannelStyles = { ...pannelStyles, position: 'absolute', overflow: 'auto' };
  borderStyles = { ...borderStyles, position: 'absolute', background: 'black' };

  return (
    <div className="ResizablePannel" style={pannelStyles}>
      <div
        className="resizableBorder"
        onMouseDown={(ev) => {
          setResizing({
            resizing: true,
            initialSize: props.size,
            initialPosition: [ev.clientX, ev.clientY],
          });
        }}
        style={{ ...borderStyles, userSelect: 'none' }}
      ></div>
      <div
        style={{
          position: 'absolute',
          background: '#999',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          ...contentStyles,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

interface SubPannelProps {
  label: string;
  children: any;
}

function SubPannel(props: SubPannelProps) {
  const [collapseStyles, setCollapse] = useMergedState<React.CSSProperties>({
    height: 'auto',
    overflow: 'auto',
    transition: 'height 0.3s',
  });
  const [{ isResizing, startHeight, startPosition }, setResizing] = useMergedState({
    isResizing: false,
    startHeight: 0,
    startPosition: 0,
  });

  React.useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      if (isResizing) {
        setCollapse({
          transition: 'none',
          height: startHeight - startPosition + ev.clientY,
          overflow: 'auto',
        });
      }
    };
    const handleMouseUp = () => {
      setCollapse({ transition: 'height 0.3s' });
      setResizing({ isResizing: false });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () =>
      void window.removeEventListener('mousemove', handleMouseMove) ||
      void window.removeEventListener('mouseup', handleMouseUp);
  }, [isResizing]);

  const innerDivRef = React.useRef<HTMLDivElement>();
  const outterDivRef = React.useRef<HTMLDivElement>();
  return (
    <div>
      <div
        style={{
          height: '27px',
          fontSize: '14px',
          padding: '3px 8px',
          background: '#333',
          color: 'white',
          width: '100%',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => {
          const innerHeight = innerDivRef.current.getBoundingClientRect().height + 6;
          setCollapse(
            collapseStyles.height !== 0
              ? { height: 0, overflow: 'hidden' }
              : { height: innerHeight + 'px', overflow: 'auto' }
          );
        }}
      >
        {props.label}
      </div>{' '}
      <div
        ref={outterDivRef}
        style={{
          userSelect: 'none',
          flexWrap: 'wrap',
          padding: '3px',
          ...collapseStyles,
        }}
      >
        <div
          ref={innerDivRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {props.children}
        </div>
      </div>
      <div
        style={{
          height: '4px',
          background: '#333',
          cursor: 'ns-resize',
          userSelect: 'none',
        }}
        onMouseDown={(ev) => {
          setResizing({
            isResizing: true,
            startPosition: ev.clientY,
            startHeight: outterDivRef.current.getBoundingClientRect().height,
          });
        }}
      ></div>
    </div>
  );
}

type ButtonProps = Record<string, any> & {
  variant: 'outline' | 'solid';
  children: any;
};

const Editable: React.FunctionComponent<IEditableProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Pannels: ResizablePannelConf[] = [
    {
      id: 'PositionControls2',
      onClose: () => console.log('Close position controls'),
      position: 'right',
      size: 20,
      children: [
        <SubPannel label="Elements">
          <Button size="sm" variant="outline" border="none" px={4} justifyContent="start">
            Add text
          </Button>
          <Button size="sm" variant="outline" border="none" px={4} justifyContent="start">
            Add image
          </Button>
          <Button
            size="sm"
            variant="outline"
            border="none"
            px={4}
            justifyContent="start"
            onClick={() => {}}
          >
            Configure canvas
          </Button>
        </SubPannel>,
        <SubPannel label="Elements">Hello</SubPannel>,
      ],
    },
  ];
  return (
    <div id="Editable">
      <style jsx>
        {`
          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          ::-webkit-scrollbar-thumb {
            background: #888;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
      <Modal isOpen={isOpen} onClose={onClose}>
        Hola
      </Modal>
      <Workspace pannels={Pannels}>
        <div>Hola como estamos</div>
      </Workspace>
    </div>
  );
};

export default Editable;
