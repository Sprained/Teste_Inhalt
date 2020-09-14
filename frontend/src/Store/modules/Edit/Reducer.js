const INITIAL_STATE = false;

export default function modal(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'EDIT':
            return [ state = true, action.id ];
         case 'EDIT_CLOSE':
             return INITIAL_STATE;
         default:
             return state;
    }
 }