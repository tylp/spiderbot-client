import { useEffect, useState } from "react";
import io from "socket.io-client";
import useLocalStorage from "./useLocalStorage";
import { DEFAULT_SOCKET_ENDPONT } from '../constants/network';

export default function useSocket(cb) {

	const [socketEndpoint] = useLocalStorage('socket-endpoint', DEFAULT_SOCKET_ENDPONT);
	const socket = io(socketEndpoint);
	const [activeSocket, setActiveSocket] = useState(null);

	useEffect(() => {

		if (activeSocket || !socket) return;
		cb && cb(socket);
		setActiveSocket(socket);

		return function cleanup() {
			socket.off("hello-room", cb);
		};
	}, [activeSocket, cb, socket, socketEndpoint]);

	return activeSocket;
}