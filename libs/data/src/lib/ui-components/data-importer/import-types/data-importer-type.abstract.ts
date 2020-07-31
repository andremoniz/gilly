export abstract class AbstractDataImporterType {
    dataInput: any;
    
    constructor() {}
    
    abstract setDataInput(data: any);
    
    abstract isImportDataValid(): boolean;
    
    fileSelected(event) {
        const reader: FileReader = new FileReader();
        reader.onload = () => {
            this.setDataInput(reader.result);
        };
        reader.readAsText(event.target.files[0]);
    }
}