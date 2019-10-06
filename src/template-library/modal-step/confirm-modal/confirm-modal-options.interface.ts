export interface ConfirmModalOptions {
    cancelLabel?: string;
    confirmLabel?: string;
    icon?: string;
    message?: string;
    title: string;
    width?: string;
    type?:string;
    info?:any;
    fields?: Field[];
    data?:any;
    id?:any;
}

export interface Field {
    label: string;
    nodeName:string;
    value:string;
    exprType: string;
    expression: string;
}
