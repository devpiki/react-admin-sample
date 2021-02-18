
import ListStore from './ListStore';
import ListSubStore from './ListSubStore';
import ListEditStore from './ListEditStore';

class RootStore {
    constructor() {
        this.liststore = new ListStore();
        this.listsubstore = new ListSubStore();
        this.listeditstore = new ListEditStore();
    }
}

export default RootStore;