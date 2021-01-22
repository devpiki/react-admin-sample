
import ListStore from './ListStore';
/*
import PlantStore from "./PlantStore";
import PeriodStore from "./PeriodStore";
import CommentStore from "./CommentStore";
import LocationStore from "./LocationStore";
import AssetTypeStore from "./AssetTypeStore";
import CodeStore from "./CodeStore";
import CompanyStore from "./CompanyStore";
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";
*/

class RootStore {
    constructor() {
        this.liststore = new ListStore();
        /*this.commonstore = new CommonStore();
        this.plantstore = new PlantStore();
        this.periodstore = new PeriodStore();
        this.commentstore = new CommentStore();
        this.locationstore = new LocationStore();
        this.assettypestore = new AssetTypeStore();
        this.codestore = new CodeStore();
        this.companystore = new CompanyStore();
        this.userstore = new UserStore();*/
    }
}

export default RootStore;