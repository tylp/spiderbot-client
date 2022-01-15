import useSocket from '../hooks/useSocket'

export default function Home() {

	const socket = useSocket();

	function stand() {
		socket.emit('bot-commands', 'stand');
	}

	function crouch() {
		socket.emit('bot-commands', 'crouch');
	}

	function forward() {
		socket.emit('bot-commands', 'forward');
	}

	function backward() {
		socket.emit('bot-commands', 'backward');
	}

	function left() {
		socket.emit('bot-commands', 'left');
	}

	function right() {
		socket.emit('bot-commands', 'right');
	}

    return (
    	<div>
        	<p>Bot Controls</p>
			<button onClick={stand}>Stand</button>
			<button onClick={crouch}>Crouch</button>
			<hr></hr>

			<button onClick={forward}>Forward</button>
			<button onClick={backward}>Backward</button>
			<button onClick={left}>Left</button>
			<button onClick={right}>Right</button>
    	</div>
  	)
}