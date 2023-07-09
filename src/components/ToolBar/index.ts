import Component from "../../utils/createElement";

class ToolBar extends Component{

    constructor(container: HTMLElement) {
        super(container,'div',{className:'video-toolbar'});
    }
}

export default ToolBar;