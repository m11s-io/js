interface Options {
    upload_url?: string;
}
interface InitArgs {
    options?: Options;
    handleInsert: (url: string) => void;
}
interface Instance {
    show: (args?: {
        imagesOnly?: boolean;
    }) => void;
    hide: () => void;
    onClearControl: () => void;
    onRemoveControl: () => void;
    enableStandalone: () => boolean;
}
declare const S3MediaLibrary: {
    name: string;
    init({ options, handleInsert }: InitArgs): Instance;
};

export { S3MediaLibrary as default };
