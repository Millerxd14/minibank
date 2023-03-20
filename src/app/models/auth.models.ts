export interface Auth{
    access:string,
    refresh:string

}

export interface DataApi{
    n_cuenta:string
    user: string,
    saldo: number
}


export interface ResponseApi{
    status :string,
    message: string,
    data: DataApi
}