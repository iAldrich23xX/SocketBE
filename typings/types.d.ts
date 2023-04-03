import World from './structures/World';
import WebSocket from 'ws';

declare global {
  interface ServerPacket {
    header: {
      requestId: string,
      messagePurpose: string,
      version: number,
      messageType: string,
      eventName?: string
    },
    body: {
      eventName?: string
    } | any
  }
  
  interface PlayerList {
    current: number,
    max: number,
    players: string[]
  }
  
  interface PlayerDetail extends PlayerList {
    details: PlayerInfo[]
  }
  
  interface PlayerInfo {
    activeSessionId: string,
    clientId: string,
    color: string,
    deviceSessionId: string,
    globalMultiplayerCorrelationId: string,
    id: number,
    name: string,
    randomId: number,
    uuid: string
  }
  
  interface ServerOption extends WebSocket.ServerOptions {
    debug?: boolean,
    timezone?: string,
    packetTimeout?: number,
    listUpdateInterval?: number
  }
  
  interface ServerEvents {
    playerJoin:  { players: string[], world: World },
    playerLeave: { players: string[], world: World }
    serverOpen: void,
    serverClose: void,
    worldAdd: { world: World },
    worldRemove: { world: World },
    packetReceive: { packet: any, world: World },
    error: Error,
    playerChat: {
      'type': 'chat' | 'say' | 'me' | 'tell',
      message: string,
      sender: string,
      receiver: string,
      world: World
    },
    playerTitle: {
      'type': 'title',
      message: string,
      sender: string,
      receiver: string,
      world: World
    },
    tick: void
  }
}

declare module 'ws' {
  interface WebSocket {
    id: string;
  }
}