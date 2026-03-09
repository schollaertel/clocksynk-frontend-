import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

type EventHandlers = {
  [event: string]: (payload: any) => void;
};

const useSocket = (
  gameId: string | null,
  handlers: EventHandlers = {}
) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const prevGameId = useRef<string | null>(null);

  // Establish and manage socket connection
  useEffect(() => {
    if (!gameId) {
      console.log("🛑 No gameId provided, disconnecting socket...");
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setIsConnected(false);
      return;
    }

    // Avoid reconnect if already connected with same game
    if (prevGameId.current === gameId && socketRef.current) {
      console.log("✅ Socket already connected for this game.");
      return;
    }

    prevGameId.current = gameId;
    const serverUrl = import.meta.env.VITE_SOCKET_URL;
    console.log("🌍 Connecting to socket server:", serverUrl);

    const socket = io(serverUrl, {
      autoConnect: true,
      reconnection: true,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      setIsConnected(true);

      // 👉 Join the game room
      socket.emit("joinRoom", { gameId });
    });

    socket.on("disconnect", (reason) => {
      console.log("⚠️ Disconnected:", reason);
      setIsConnected(false);
    });

    socket.on("reconnect", (attempt) => {
      console.log(`🔄 Reconnected after ${attempt} attempts`);
      setIsConnected(true);

      // 👉 Re-join the game room
      socket.emit("joinRoom", { gameId });
    });

    socket.on("error", (error) => {
      console.error("❌ Socket error:", error);
    });

    return () => {
      console.log("🧹 Cleaning up socket connection...");
      if (socketRef.current) {
        // 👉 Leave game room before disconnect
        socketRef.current.emit("leaveRoom", { gameId });
        socketRef.current.disconnect();
      }
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [gameId]);

  // Bind handlers separately so they don't re-trigger the connection effect
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    for (const [event, callback] of Object.entries(handlers)) {
      socket.on(event, callback);
    }

    return () => {
      for (const event of Object.keys(handlers)) {
        socket.off(event);
      }
    };
  }, [handlers]);

  const emit = (event: string, payload: any) => {
    if (!socketRef.current) {
      console.error("🚨 Cannot emit: Socket not initialized.");
      return;
    }
    socketRef.current.emit(event, payload);
  };

  return { isConnected, emit };
};

export default useSocket;
