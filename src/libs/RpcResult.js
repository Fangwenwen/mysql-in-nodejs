export const RpcCode = {
    NO_ERROR: 200,

    UNKNOW_ERROR: 500
}

export const RpcMsg = {
    UNKNOW_ERROR: '服务器忙'
}

export default class RpcResult {
    constructor(data, errMsg, errCode) {
        this.data = data == null ? null : data
        this.errMsg = errMsg == null ? null : errMsg
        this.errCode = errCode == null ? RpcCode.NO_ERROR : errCode
    }
}