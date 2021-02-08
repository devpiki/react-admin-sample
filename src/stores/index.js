
import ListStore from './ListStore';
import ListSubStore from './ListSubStore';

class RootStore {
    constructor() {
        this.liststore = new ListStore();
        this.listsubstore = new ListSubStore();
    }
}

export default RootStore;