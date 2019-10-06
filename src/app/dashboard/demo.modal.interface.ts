export interface DemoModalInterface {
    cancelLabel?: string;
    confirmLabel?: string;
    icon?: string;
    message?: string;
    title: string;
    width?: string;
    type?:string;
    info?:any;
    fields?: Field[];
}

export interface Field {
    label: string;
    nodeName:string;
    value:string;
    exprType: string;
    expression: string;
}
