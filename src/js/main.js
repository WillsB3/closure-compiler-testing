import uniqueId from 'lodash/uniqueId';

import { log } from './log.js';

export default go;

function go() {
	const id = uniqueId();
	log(`id is: ${id}`);
}
