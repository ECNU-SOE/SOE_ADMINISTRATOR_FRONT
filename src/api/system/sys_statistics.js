import {jwtServerInstance} from "../index";
import {getJwtToken} from "@/lib/utils";

export const completionStatistics = function (opt){
    return jwtServerInstance.request({
        url:`/api/v1/statistics/completionStatistics`,
        method:'post',
        headers:{
            token:getJwtToken()
        },
        data: opt,
        params:{}
    })
}
