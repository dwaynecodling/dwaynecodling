
interface IScratchPadMessage{
    channelId: string;
    data?: any;
    command: string;
    sender?: string;
    responseId?:string;
    requestId?:string;
}

interface IFileInfo{
    fileName:string;
    fileSize:number;
    content:string;
    filePath:string;
    isReadOnly:boolean;
    mime:string;
    needSaving:boolean;
    language?:string;
}

interface ISmartTreeNodeStructure {
    name:string,
    isDirectory?:boolean,
    children?:ISmartTreeNodeStructure[]
}

interface ICookieStoreSetOptions{
    /**
     * a number representing the milliseconds from Date.now() for expiry
     */
    maxAge?: number;
    /**
     * a Date object indicating the cookie's expiration
     * date (expires at the end of session by default).
     */
    expires?: Date;
    /**
     * a string indicating the path of the cookie (/ by default).
     */
    path?: string;
    /**
     * a string indicating the domain of the cookie (no default).
     */
    domain?: string;
    /**
     * a boolean indicating whether the cookie is only to be sent
     * over HTTPS (false by default for HTTP, true by default for HTTPS).
     */
    secure?: boolean;
    /**
     * a boolean indicating whether the cookie is only to be sent over HTTP(S),
     * and not made available to client JavaScript (true by default).
     */
    httpOnly?: boolean;
    /**
     * a boolean indicating whether to overwrite previously set
     * cookies of the same name (false by default). If this is true,
     * all cookies set during the same request with the same
     * name (regardless of path or domain) are filtered out of
     * the Set-Cookie header when setting this cookie.
     */
    overwrite?: boolean;
}

type IOHandler = (options:{direction:"download"|"upload", filePath:string, content?:string}, done:(hasError:boolean, value?:any)=>void)=>void;

declare const ProjectOptions: { structure?:ISmartTreeNodeStructure[], projectIdentifier?:string, isReadOnly:boolean };

interface JobOptions{
    // whether to allow the same jobs to run multiple times (at the same time)
    singleInstance:boolean;

    // how long to wait before job starts (ms)
    delay:number;

    // defines behaviour of similar instance if current job is already running
    similarInstanceCreated:"queue"|"ignore"|"replacePrevious"

    // a string that identifies the job
    identifier:string;

    // task to run
    task:ITask<ICallback<any,void>, void>
}

type Optional<T> = { [P in keyof Partial<T>]: Pick<T, P> extends Partial<Pick<T, P>> ? T[P] : (T[P] | undefined); }

interface IGroup<T> extends Array<T>{
    readonly [n: number]: T;
}

interface ITask<T, O> { (...params:T[]):O; }

interface ICallback<V,R>{
    (...values:V[]):R;
    (value:V):R;
}

interface IRequiredInputValidator{
    validation: ITask<void, boolean>;
    failTitle: string;
    failMessage: string;
    errorStatusCode?: number;
}

type ErrorCallback<E = Error> = (err:E)=>void;

type ObjectProperties<O> = { [K in keyof O]?: O[K] };

type JSONObject = { [keyName:string]:any };
type StrictJSONObject = { [keyName:string]:string|boolean|number };

interface IResponseJSON extends IActionResult{
    title?: string;
    message?: string;
    payload?: JSONObject
}

interface IRequestResult{
    value: JSONObject | string,
    isJSON: boolean,
    status: number
}

interface IActionResult{
    isSuccessful: boolean;
    [key:string]:any;
}