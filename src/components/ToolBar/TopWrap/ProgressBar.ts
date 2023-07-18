import Component from "@/utils/createElement";

class ProgressBar extends Component {
    constructor(container: HTMLElement) {
        super(container, 'div', { class: 'progress-bar'});
    }
}

export default ProgressBar;