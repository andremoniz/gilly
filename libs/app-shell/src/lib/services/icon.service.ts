import { Injectable } from '@angular/core';
import {
    faArrowCircleLeft,
    faBars,
    faCaretSquareDown,
    faChalkboardTeacher,
    faChartBar,
    faChevronDown,
    faChevronRight,
    faCogs,
    faCompress,
    faDiagnoses,
    faDigitalTachograph,
    faEdit,
    faEraser,
    faExpand,
    faFileImport,
    faParachuteBox,
    faPeopleCarry,
    faPersonBooth,
    faPlusSquare,
    faSave,
    faSearch,
    faSitemap,
    faTasks,
    faTrash,
    faUsers
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
    providedIn: 'root'
})
export class IconService {
    icons = {
        collapse: faCompress,
        expand: faExpand,
        create: faPlusSquare,
        backArrow: faArrowCircleLeft,
        delete: faTrash,
        save: faSave,
        hamburger: faBars,
        sitemap: faSitemap,
        parachuteBox: faParachuteBox,
        chalkboardTeacher: faChalkboardTeacher,
        peopleCarry: faPeopleCarry,
        search: faSearch,
        eraser: faEraser,
        cogs: faCogs,
        edit: faEdit,
        tasks: faTasks,
        expandChevron: faChevronRight,
        collapseChevron: faChevronDown,
        users: faUsers,
        diagnoses: faDiagnoses,
        personBooth: faPersonBooth,
        tachograph: faDigitalTachograph,
        caretSquareDown: faCaretSquareDown,
        chartBar: faChartBar,
        fileImport: faFileImport
    };

    constructor() {}
}
