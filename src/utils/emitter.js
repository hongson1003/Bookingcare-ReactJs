import EventEmiiter from 'events';
const _emitter = new EventEmiiter();
_emitter.setMaxListeners(0); // unlimiited listener
export const emitter = _emitter;