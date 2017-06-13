import { log } from './log.js';

export default go;

let id = 0;

function go() {
	id = id + 1;
	log(`id is: ${id}`);
}

go();
